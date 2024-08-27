import React, { useState } from 'react';
import './ProductList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product, setProducts, products }) => {
    const [currentProduct, setCurrentProduct] = useState({
        _id: product ? product._id : '',
        name: product ? product.name : '',
        sku: product ? product.sku : '',
        description: product ? product.description : '',
        price: product ? product.price : '',
        current_stock: product ? product.current_stock : '',
        reorder_level: product ? product.reorder_level : ''
    });

    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const updateProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:5678/api/product/update/${currentProduct._id}`, currentProduct);
            console.log("Update happened successfully", response.data);
            if (response.data.success) {
                setProducts(products.map(item => item._id === currentProduct._id ? currentProduct : item));
                setEditMode(false);
            } else {
                console.error("Failed to update product:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleSubmit = () => {
        if (!editMode) {
            setEditMode(true);
        } else {
            updateProduct();
        }
    };

    const deleteProduct = async () => {
        try {
            const response = await axios.delete(`http://localhost:5678/api/product/delete/${currentProduct._id}`);
            if (response.data.success) {
                setProducts(products.filter(item => item._id !== currentProduct._id));
            } else {
                console.error("Failed to delete product:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct();
        }
    };

    const handleChange = e => {
        setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });
    };

    const handleOrder = () => {
        // Implement order placement logic here
        alert("Order Placed Successfully");
    };

    return (
        <div className="product-item">
            {editMode ? (
                <>
                    <div className="product-item-key">
                        <label>Name:</label>
                        <input type="text" name="name" value={currentProduct.name} onChange={handleChange} />
                    </div>
                    <div className="product-item-key">
                        <label>SKU:</label>
                        <input type="text" name="sku" value={currentProduct.sku} onChange={handleChange} />
                    </div>
                    <div className="product-item-key">
                        <label>Price:</label>
                        <input type="number" name="price" value={currentProduct.price} onChange={handleChange} />
                    </div>
                    <div className="product-item-key">
                        <label>Description:</label>
                        <input type="text" name="description" value={currentProduct.description} onChange={handleChange} />
                    </div>
                    <div className="product-item-key">
                        <label>Current Stock:</label>
                        <input type="number" name="current_stock" value={currentProduct.current_stock} onChange={handleChange} />
                    </div>
                    <div className="product-item-key">
                        <label>Reorder Level:</label>
                        <input type="number" name="reorder_level" value={currentProduct.reorder_level} onChange={handleChange} />
                    </div>
                </>
            ) : (
                <>
                    <h3>{product.name}</h3>
                    <p><span className="product-item-key">SKU:</span> {product.sku}</p>
                    <p><span className="product-item-key">Price:</span> {product.price}</p>
                    <p><span className="product-item-key">Description:</span> {product.description}</p>
                    <p><span className="product-item-key">Current Stock:</span> {product.current_stock}</p>
                    <p><span className="product-item-key">Reorder Level:</span> {product.reorder_level}</p>
                    <button onClick={handleOrder}>Order</button>
                    <button style={{ color: "white", backgroundColor: "violet" }} onClick={() => navigate('/PurchaseOrder')}>Payment</button>
                </>
            )}
            <button onClick={handleSubmit}>{editMode ? 'Submit' : 'Edit'}</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ProductItem;
