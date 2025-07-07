import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
        alert("Failed to delete product.");
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedData({ ...product });
  };

  const handleCancel = () => {
    setEditingProductId(null);
    setEditedData({});
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/products/${editingProductId}`, editedData);
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProductId ? { ...p, ...editedData } : p))
      );
      setEditingProductId(null);
      setEditedData({});
    } catch (err) {
      console.error('Error saving product:', err);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="admin-main-content p-3 bg-light min-vh-100">
      <h3 className="mb-4">All Products ({products.length})</h3>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                {/* <th>Rent Price</th> */}
                <th>Category</th>
                <th>Image</th>
                <th>Condition</th>
                <th>Location</th>
                <th>Available</th>
                <th>Rentable</th>
                <th>Owner ID</th>
                <th>Verified</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>

                  <td>
                    {editingProductId === p.id ? (
                      <input className="form-control" value={editedData.title} onChange={(e) => handleChange('title', e.target.value)} />
                    ) : p.title}
                  </td>

                  <td>
                    {editingProductId === p.id ? (
                      <textarea className="form-control" value={editedData.description || ''} onChange={(e) => handleChange('description', e.target.value)} />
                    ) : p.description || 'N/A'}
                  </td>

                  <td>
                    {editingProductId === p.id ? (
                      <input type="number" className="form-control" value={editedData.price} onChange={(e) => handleChange('price', e.target.value)} />
                    ) : `₹${p.price}`}
                  </td>

                  {/* <td>
                    {editingProductId === p.id ? (
                      <input type="number" className="form-control" value={editedData.rent_price || ''} onChange={(e) => handleChange('rent_price', e.target.value)} />
                    ) : p.rent_price ? `₹${p.rent_price}` : '-'}
                  </td> */}

                  <td>
                    {editingProductId === p.id ? (
                      <select className="form-select" value={editedData.category} onChange={(e) => handleChange('category', e.target.value)}>
                        <option value="property">Property</option>
                        <option value="dress">Dress</option>
                        <option value="appliance">Appliance</option>
                      </select>
                    ) : p.category}
                  </td>

                  <td>
                    {editingProductId === p.id ? (
                      <input className="form-control" value={editedData.image || ''} onChange={(e) => handleChange('image', e.target.value)} />
                    ) : p.image ? <img src={p.image} alt="product" width="60" height="60" style={{ objectFit: 'cover' }} /> : 'No Image'}
                  </td>

                  <td>
                    {editingProductId === p.id ? (
                      <input className="form-control" value={editedData.condition || ''} onChange={(e) => handleChange('condition', e.target.value)} />
                    ) : p.condition || 'N/A'}
                  </td>

                  <td>
                    {editingProductId === p.id ? (
                      <input className="form-control" value={editedData.location || ''} onChange={(e) => handleChange('location', e.target.value)} />
                    ) : p.location || 'N/A'}
                  </td>

                  <td>
                    {editingProductId === p.id ? (
                      <select className="form-select" value={editedData.available} onChange={(e) => handleChange('available', e.target.value)}>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    ) : (
                      <span className={`status ${p.available ? 'bg-success' : 'bg-secondary'}`}>{p.available ? 'Yes' : 'No'}</span>
                    )}
                  </td>

                  <td>
                    {editingProductId === p.id ? (
                      <select className="form-select" value={editedData.is_rentable} onChange={(e) => handleChange('is_rentable', e.target.value)}>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    ) : (
                      <span className={`status ${p.is_rentable ? 'bg-info' : 'bg-warning text-dark'}`}>{p.is_rentable ? 'Yes' : 'No'}</span>
                    )}
                  </td>

                  <td>
                    {editingProductId === p.id ? (
                      <input type="number" className="form-control" value={editedData.owner_id || ''} onChange={(e) => handleChange('owner_id', e.target.value)} />
                    ) : p.owner_id || 'N/A'}
                  </td>

                  <td>
                    {editingProductId === p.id ? (
                      <select className="form-select" value={editedData.verified} onChange={(e) => handleChange('verified', e.target.value)}>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                      </select>
                    ) : (
                      <span className={`status ${p.verified ? 'bg-success' : 'bg-secondary'}`}>{p.verified ? 'Yes' : 'No'}</span>
                    )}
                  </td>

                  <td>{new Date(p.created_at).toLocaleDateString()}</td>

                  <td>
                    {editingProductId === p.id ? (
                      <>
                        <button className="btn btn-sm btn-success me-2" onClick={handleSave}>💾 Save</button>
                        <button className="btn btn-sm btn-secondary" onClick={handleCancel}>❌ Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(p)}>✏️ Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminManageProducts;
