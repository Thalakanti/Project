import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductList.css";
import ProductItem from "./ProductItem";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5678/api/product/Allproducts"
      );
      if (response.status === 200) {
        setProducts(response.data.data);
        console.log("The products are ", response.data);
      } else {
        console.error("Error while fetching products, status code:", response.status);
        alert("Error while fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error while fetching products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products List</h2>
      <br />
      <div className="flexbox">
        {products.map((product) => (
          <ProductItem
            key={product.id} // Ensure a unique key prop is provided
            product={product}
            setProducts={setProducts}
            products={products}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
