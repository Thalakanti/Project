import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [status, setStatus] = useState("");

  const handleCreateOrder = async () => {
    const payload = {
      product_id: productId,
      quantity: quantity,
      order_date: orderDate,
      status: status,
    };

    try {
      const response = await axios.post(
        "http://localhost:5678/api/order/createOrder",
        payload
      );
      if (response.status === 200) {
        console.log("Order Created successfully: ", response.data.data);
        alert("Order Created Successfully");
        navigate("/OrdersList"); // Navigate to OrdersList after successful creation
      } else {
        console.log("Error in creating order");
        alert("Error in creating order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error in creating order");
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <br />
      <label>Enter Your Product ID:</label>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter Product ID here"
      />
      <br />
      <label>Enter Your Quantity:</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Enter Quantity here"
      />
      <br />
      <label>Enter Your Order Date:</label>
      <input
        type="date"
        value={orderDate}
        onChange={(e) => setOrderDate(e.target.value)}
      />
      <br />
      <label>Enter Your Order Status:</label>
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Enter Status here"
      />
      <br />
      <button onClick={handleCreateOrder}>Create Order</button>
      <button
        style={{ color: "white", backgroundColor: "violet" }}
        onClick={() => navigate("/OrdersList")}
      >
        Check Orders
      </button>
    </div>
  );
};

export default CreateOrder;

