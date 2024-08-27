import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const CreateSupplier = () => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierContactEmail, setSupplierContactEmail] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [productId, setProductId] = useState("");

  const navigate = useNavigate();

  const handleCreateSupplier = async () => {
    const payload = {
      product_id: productId,
      supplier_name: supplierName,
      supplier_contact_email: supplierContactEmail,
      supplier_phone: supplierPhone,
      supplier_address: supplierAddress,
    };
    try {
      const response = await axios.post(
        "http://localhost:5678/api/supplier/createsupplier",
        payload
      );
      if (response.status === 200) {
        console.log("Supplier Created successfully", response.data.data);
        alert("Supplier Created Successfully");
        // Optionally navigate to another page or refresh the list
        navigate('/SuppliersList');
      } else {
        console.log("Error in creating supplier");
        alert("Error in creating supplier");
      }
    } catch (error) {
      console.error("Error creating supplier:", error);
      alert("Error in creating supplier");
    }
  };

  return (
    <div>
      <h2>Create Supplier</h2>
      <br />
      <label>Enter Your Product ID</label>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter Product ID here"
      />
      <br />

      <label>Enter Your Supplier Name</label>
      <input
        type="text"
        value={supplierName}
        onChange={(e) => setSupplierName(e.target.value)}
        placeholder="Enter Supplier Name here"
      />
      <br />

      <label>Enter Your Supplier Email</label>
      <input
        type="email"
        value={supplierContactEmail}
        onChange={(e) => setSupplierContactEmail(e.target.value)}
        placeholder="Enter Email here"
      />
      <br />

      <label>Enter Your Phone Number</label>
      <input
        type="text"
        value={supplierPhone}
        onChange={(e) => setSupplierPhone(e.target.value)}
        placeholder="Enter Phone Number here"
      />
      <br />

      <label>Enter Your Address</label>
      <textarea
        value={supplierAddress}
        onChange={(e) => setSupplierAddress(e.target.value)}
        placeholder="Enter Your Address Here"
      />
      <br />

      <button onClick={handleCreateSupplier}>Create Supplier</button>
      <button style={{ color: "white", backgroundColor: "violet" }}>
        <Link
          to="/SuppliersList"
          style={{ color: "white", textDecoration: "none" }}
        >
          Check Suppliers
        </Link>
      </button>
    </div>
  );
};

export default CreateSupplier;
