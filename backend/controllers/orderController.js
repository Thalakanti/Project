const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const PurchaseOrder = require("../models/purchaseOrderModel");
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log('Redis Client Error', err);
});
client.connect();


exports.createOrder = async (req, res) => {
  const { product_id, quantity, order_date, status } = req.body;

  try {
    // Check if the product is cached in Redis
    const cachedProduct = await client.get(`product_${product_id}`);

    let product;
    if (cachedProduct) {
      product = JSON.parse(cachedProduct);
    } else {
      // Fetch the product from the database if not cached
      product = await Product.readById(product_id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      // Cache the product data in Redis
      await client.set(`product_${product_id}`, JSON.stringify(product), 'EX', 3600); // Cache for 1 hour
    }

    // Check if there's enough stock
    if (product.current_stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    // Create the order
    const order = await Order.create({ product_id, quantity, order_date, status });
    if (!order) {
      return res.status(500).json({ error: "Failed to create order" });
    }

    // Update the product stock level
    product.current_stock -= quantity;
    await product.save();

    // Update the cached product in Redis with the new stock level
    await client.set(`product_${product_id}`, JSON.stringify(product), 'EX', 3600); // Refresh the cache

    // Check if the stock falls below the reorder level
    if (product.current_stock < product.reorder_level) {
      // Automatically create a purchase order
      await PurchaseOrder.create({
        product_id: product.id,
        quantity: product.reorder_level * 2, // Example: reorder enough to double the reorder level
        status: "ordered",
      });

      // Optionally, you can cache the purchase order if needed
    }

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (err) {
    console.error("An error occurred while creating the order:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the order",
    });
  }
};


// exports.createOrder = async (req, res) => {
//   const { product_id, quantity, order_date, status } = req.body;
//   try {
//     //  // Fetch the product to check stock levels

//     Product.readById(product_id, async (err, product) => {
//       if (err) {
//         res.status(500).json({ sucess: false, message: err.message });
//       }
//       // Check if there's enough stock
//       if (product.current_stock < quantity) {
//         return res.status(400).json({ error: "Insufficient stock" });
//       }
//       Order.create(
//         { product_id, quantity, order_date, status },
//         async (err, order) => {
//           if (err) {
//             return res
//               .status(500)
//               .json({ sucess: false, message: err.message });
//           }
//           res.status(201).json({
//             sucess: true,
//             message: "Order created successfully",
//             data: order,
//           });
//         }
//       );

//       product.current_stock -= quantity;
//     //   await product.save();

//       // Check if the stock falls below the reorder level
//       if (product.current_stock < product.reorder_level) {
//         // Automatically create a purchase order
//         await PurchaseOrder.create({
//           product_id: product.id,
//           quantity: product.reorder_level * 2, // Example: reorder enough to double the reorder level
//           status: "ordered",
//         });
//       }
//       res.status(201).json({
//         sucess: true,
//         message: "Read Product Success",
//         data: product,
//       });
//     });

//     // Create the order
//   } catch (err) {
//     res.status(500).json({
//       sucess: false,
//       message: "An error occurred while creating the order",
//     });
//   }
// };

exports.getAllOrders = async (req, res) => {
  try {
    // Check if orders are cached in Redis
    const cachedOrders = await client.get("all_orders");

    if (cachedOrders) {
      // If cached, return the orders from Redis
      return res.status(200).json({
        success: true,
        message: "All Orders retrieved successfully from cache",
        data: JSON.parse(cachedOrders),
      });
    }

    // If not cached, fetch from the database
    Order.readAll(async (err, orders) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      // Cache the orders in Redis for future requests
      await client.set("all_orders", JSON.stringify(orders), 'EX', 3600); // Cache for 1 hour

      res.status(200).json({
        success: true,
        message: "All Orders retrieved successfully",
        data: orders,
      });
    });
  } catch (err) {
    console.error("Error while retrieving all orders:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the order is cached in Redis
    const cachedOrder = await client.get(`order:${id}`);
    if (cachedOrder) {
      return res.status(200).json({
        success: true,
        message: "Order retrieved successfully from cache",
        data: JSON.parse(cachedOrder),
      });
    }

    // If not cached, fetch from the database
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Cache the order in Redis for future requests
    await client.set(`order:${id}`, JSON.stringify(order), 'EX', 3600); // Cache for 1 hour

    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (err) {
    console.error("Error while retrieving the order:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    // Update the order in the database
    Order.update(id, body, async (err, order) => {
      if (err) {
        console.error("Error while updating order:", err);
        return res.status(500).json({ success: false, message: "Error while updating: " + err.message });
      }

      // If the status is 'completed', update the product stock
      if (body.status === 'completed') {
        const product = await Product.readById(body.product_id);

        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        product.current_stock += order.quantity; // Adjust the stock
        await product.save(); // Save the product with updated stock

        // Optionally, you might want to invalidate the cached product data here if caching is implemented for products
      }

      // Invalidate or update the cached order in Redis
      await client.set(`order:${id}`, JSON.stringify(order), 'EX', 3600); // Update cache with the latest order data

      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
      });
    });
  } catch (err) {
    console.error("Error in catch block while updating order:", err);
    res.status(500).json({ success: false, message: "Error while updating: " + err.message });
  }
};

exports.deleteOrder = (req, res) => {
  const { id } = req.params;

  try {
    Order.delete(id, async (err, order) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      // Invalidate the Redis cache for the deleted order
      client.del(`order:${id}`, (cacheErr) => {
        if (cacheErr) {
          console.error('Failed to delete cache:', cacheErr);
        }
        // Respond to the client
        res.status(200).json({
          success: true,
          data: order,
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
