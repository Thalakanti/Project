import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductSupplier = () => {
  const [productSuppliers, setProductSuppliers] = useState([]);

  const fetchProductSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5678/api/products/suppliers"
      );
      setProductSuppliers(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error while fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchProductSuppliers();
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div>
      <h2>Product Supplier List</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>ProductId</th>
            <th>SupplierId</th>
          </tr>
        </thead>
        <tbody>
          {productSuppliers.map((productSupplier) => (
            <tr key={productSupplier.id}>
              <td>{productSupplier.id}</td>
              <td>{productSupplier.productid}</td>
              <td>{productSupplier.supplierid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSupplier;
