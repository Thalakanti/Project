import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import "./OrdersList.css";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5678/api/order/Allorders"
      );
      setOrders(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching orders:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched or error occurs
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading...</div>; // Display loading message or spinner
  }

  return (
    <div>
      <h2>Order List</h2>
      <button
        style={{ color: "white", backgroundColor: "green" }}
        onClick={() => navigate('/CreateOrder')}
      >
        Create Order
      </button>
      <div className="flexbox">
        {orders.map((order) => (
          <OrderItem
            key={order.id} // Added key prop
            order={order}
            setOrders={setOrders}
            orders={orders}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
