import React, { useState } from "react";
import axios from "axios";
import "./OrdersList.css";

const OrderItem = ({ order, setOrders, orders }) => {
  const [currentOrder, setCurrentOrder] = useState({
    id: order ? order.id : '',
    product_id: order ? order.product_id : '',
    quantity: order ? order.quantity : '',
    order_date: order ? order.order_date : '',
    status: order ? order.status : ''
  });

  const [editMode, setEditMode] = useState(false);

  const updateOrder = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5678/api/order/update-status/${currentOrder.id}`,
        currentOrder
      );
      if (response.data.success) {
        console.log("Update happened successfully", response.data);
        setOrders(orders.map(item => item.id === currentOrder.id ? currentOrder : item));
        setEditMode(false);
      } else {
        console.error("Update failed", response.data.message);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleSubmit = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      updateOrder();
    }
  };

  const deleteOrder = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5678/api/order/delete/${currentOrder.id}`
      );
      if (response.data.success) {
        setOrders(orders.filter(item => item.id !== currentOrder.id));
        alert("Order canceled successfully");
      } else {
        console.error("Deletion failed", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleDelete = () => {
    deleteOrder();
  };

  const handleChange = e => {
    e.preventDefault();
    setCurrentOrder({ ...currentOrder, [e.target.name]: e.target.value });
  };

  return (
    <div className="order-item">
      <h2>Order Item</h2>
      {editMode ? (
        <>
          <h3>Edit Mode is On</h3>
          <form>
            <div className="order-item-key">
              <label htmlFor="id">ID</label>
              <input
                type="number"
                value={currentOrder.id}
                name="id"
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="order-item-key">
              <label htmlFor="product_id">Product ID</label>
              <input
                type="number"
                value={currentOrder.product_id}
                name="product_id"
                onChange={handleChange}
              />
            </div>
            <div className="order-item-key">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                value={currentOrder.quantity}
                name="quantity"
                onChange={handleChange}
              />
            </div>
            <div className="order-item-key">
              <label htmlFor="order_date">Order Date</label>
              <input
                type="date"
                value={currentOrder.order_date}
                name="order_date"
                onChange={handleChange}
              />
            </div>
            <div className="order-item-key">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                value={currentOrder.status}
                name="status"
                onChange={handleChange}
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <h3>{order.id}</h3>
          <p>
            <span className="order-item-key" style={{ backgroundColor: "red" }}>
              Product ID:
            </span>{" "}
            {order.product_id}
          </p>
          <p>
            <span className="order-item-key" style={{ backgroundColor: "plum" }}>
              Quantity:
            </span>{" "}
            {order.quantity}
          </p>
          <p>
            <span className="order-item-key">
              Order Date:
            </span>{" "}
            {new Date(order.order_date).toLocaleDateString()}
          </p>
          <p>
            <span className="order-item-key">
              Status:
            </span>{" "}
            {order.status}
          </p>
        </>
      )}
      <button onClick={handleSubmit}>{editMode ? "Submit" : "Edit"}</button>
      <button
        style={{ color: "white", backgroundColor: "red" }}
        onClick={handleDelete}
      >
        Cancel
      </button>
    </div>
  );
};

export default OrderItem;
