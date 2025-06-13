import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const OwnerUploadProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: null,
    category: "",
    condition: "new",
    type: "rent",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.post("http://localhost:5000/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product uploaded successfully!");
      navigate("/my-products");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload product");
    }
  };

  return (
    <div className="upload-form-container">
      <h2 className="upload-title">Upload New Product</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (INR)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Saree, Kurti)"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <select name="condition" value={formData.condition} onChange={handleChange}>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
};

export default OwnerUploadProduct;