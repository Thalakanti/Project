import React, { useState, useEffect } from "react";
import axios from "axios";
import SupplierItem from "./SupplierItem";
import "./suppliersList.css";
import { Link } from "react-router-dom";

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:5678/api/supplier/Allsuppliers");
      setSuppliers(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []); // Empty dependency array to fetch only once when the component mounts

  return (
    <div>
      <h2>Suppliers List</h2>
      <div className="button-container">
        <button style={{ color: "white", backgroundColor: "green" }}>
          <Link to="/Create_Supplier" style={{ color: "white", textDecoration: "none" }}>
            Create Supplier
          </Link>
        </button>
        <button style={{ color: "white", backgroundColor: "green" }}>
          <Link to="/Product_Supplier" style={{ color: "white", textDecoration: "none" }}>
            Product Supplier
          </Link>
        </button>
      </div>
      <div className="flexbox">
        {suppliers.map((supplier,_) => (
          <SupplierItem
            key={supplier.id} // Ensure each item has a unique key
            supplier={supplier}
            setSuppliers={setSuppliers}
            suppliers={suppliers}
          />
        ))}
      </div>
    </div>
  );
};

export default SuppliersList;
