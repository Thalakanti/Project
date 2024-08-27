import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function ProductById() {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { id } = useParams(); // Extract product ID from the URL

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5678/api/product/product/${id}` // Use the ID from route params
      );
      if (response.status === 200) {
        setProduct(response.data.data);
        console.log("The product is ", response.data.data);
      } else {
        alert("Error while fetching product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Error while fetching product");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]); // Re-run when the ID changes

  return (
    <div>
      <h2>Product</h2>
      <br />
      <div className="flexbox">
        <p>
          <span className="item-key">Product ID:</span> {product.id}
        </p>
        <p>
          <span className="item-key">Product Name:</span> {product.name}
        </p>
        <p>
          <span className="item-key">Product SKU:</span> {product.sku}
        </p>
        <p>
          <span className="item-key">Product Description:</span> {product.description}
        </p>
        <p>
          <span className="item-key">Product Price:</span> ${product.price}
        </p>
        <p>
          <span className="item-key">Product Current Stock:</span> {product.current_stock}
        </p>
        <p>
          <span className="item-key">Product Reorder Level:</span> {product.reorder_level}
        </p>
      </div>
      <button onClick={() => navigate("/Dashboard")}>Dashboard</button>
    </div>
  );
}

export default ProductById;
