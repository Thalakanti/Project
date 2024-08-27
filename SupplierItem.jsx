import React, { useState } from "react";
import axios from "axios";
import "./suppliersList.css";

const SupplierItem = ({ supplier, setsuppliers, suppliers }) => {
  const [currentsupplier, setCurrentsupplier] = useState({
    id: supplier ? supplier.id : "",
    product_id: supplier ? supplier.product_id : "",
    supplier_name: supplier ? supplier.supplier_name : "",
    supplier_contact_email: supplier ? supplier.supplier_contact_email : "",
    supplier_phone: supplier ? supplier.supplier_phone : "",
    supplier_address: supplier ? supplier.supplier_address : "",
  });

  const [editMode, setEditMode] = useState(false);

  const updatesupplier = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5678/api/supplier/update/${currentsupplier.id}`,
        currentsupplier
      );
      if (response.data.success) {
        setsuppliers(
          suppliers.map((item) =>
            item.id === currentsupplier.id ? currentsupplier : item
          )
        );
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  const handleSubmit = async () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      await updatesupplier();
    }
  };

  const deletesupplier = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5678/api/supplier/delete/${currentsupplier.id}`
      );
      if (response.data.success) {
        setsuppliers(suppliers.filter((item) => item.id !== currentsupplier.id));
        alert("Supplier deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      await deletesupplier();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setCurrentsupplier({ ...currentsupplier, [e.target.name]: e.target.value });
  };

  return (
    <div className="supplier-item">
      <h2>Supplier Item</h2>

      {editMode ? (
        <>
          <h3>Edit Mode is On</h3>
          <form>
            <div className="supplier-item-key">
              <label htmlFor="id">Supplier ID</label>
              <input
                type="number"
                value={currentsupplier.id}
                name="id"
                onChange={handleChange}
              />
            </div>
            <div className="supplier-item-key">
              <label htmlFor="product_id">Product ID</label>
              <input
                type="number"
                value={currentsupplier.product_id}
                name="product_id"
                onChange={handleChange}
              />
            </div>
            <div className="supplier-item-key">
              <label htmlFor="supplier_name">Supplier Name</label>
              <input
                type="text"
                value={currentsupplier.supplier_name}
                name="supplier_name"
                onChange={handleChange}
              />
            </div>
            <div className="supplier-item-key">
              <label htmlFor="supplier_contact_email">Supplier Email</label>
              <input
                type="email"
                value={currentsupplier.supplier_contact_email}
                name="supplier_contact_email"
                onChange={handleChange}
              />
            </div>
            <div className="supplier-item-key">
              <label htmlFor="supplier_phone">Supplier Phone</label>
              <input
                type="tel"
                value={currentsupplier.supplier_phone}
                name="supplier_phone"
                onChange={handleChange}
              />
            </div>
            <div className="supplier-item-key">
              <label htmlFor="supplier_address">Supplier Address</label>
              <input
                type="text"
                value={currentsupplier.supplier_address}
                name="supplier_address"
                onChange={handleChange}
              />
            </div>
          </form>
        </>
      ) : (
        <>
          <p>
            <span className="supplier-item-key">Supplier ID:</span> {supplier.id}
          </p>
          <p>
            <span className="supplier-item-key">Product ID:</span> {supplier.product_id}
          </p>
          <p>
            <span className="supplier-item-key">Supplier Name:</span> {supplier.supplier_name}
          </p>
          <p>
            <span className="supplier-item-key">Supplier Email:</span> {supplier.supplier_contact_email}
          </p>
          <p>
            <span className="supplier-item-key">Supplier Phone:</span> {supplier.supplier_phone}
          </p>
          <p>
            <span className="supplier-item-key">Supplier Address:</span> {supplier.supplier_address}
          </p>
        </>
      )}

      <button onClick={handleSubmit}>{editMode ? "Submit" : "Edit"}</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default SupplierItem;
