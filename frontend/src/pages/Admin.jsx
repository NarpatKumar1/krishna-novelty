import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import './Admin.css';

const getImageUrl = (image) => {
    if (!image) return '';
    const trimmed = image.trim();
    if (trimmed.startsWith('http') || trimmed.startsWith('data:')) return trimmed;
    if (trimmed.startsWith('www.')) return `https://${trimmed}`;
    if (trimmed.startsWith('/uploads')) return `http://localhost:5000${trimmed}`;
    return `/${trimmed}`;
};

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    price: '',
    image: '',
    badge: '',
    whatsappMessage: ''
  });

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', desc: '', price: '', image: '', badge: '', whatsappMessage: '' });
    setImageFile(null);
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      desc: product.desc,
      price: product.price,
      image: product.image,
      badge: product.badge || '',
      whatsappMessage: product.whatsappMessage || ''
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let finalImageUrl = formData.image;
    
    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);
      try {
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: uploadData
        });
        if (uploadRes.ok) {
          const uploadJson = await uploadRes.json();
          finalImageUrl = uploadJson.imageUrl;
        }
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing 
      ? `http://localhost:5000/api/products/${currentProduct.id}` 
      : 'http://localhost:5000/api/products';
      
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image: finalImageUrl ? finalImageUrl.trim() : '',
          price: Number(formData.price)
        })
      });
      
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div id="admin" className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
      </div>

      <div className="admin-content">
        <div className="admin-form-section">
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea name="desc" value={formData.desc} onChange={handleInputChange} required rows="3"></textarea>
            </div>
            
            <div className="form-group">
              <label>Price (₹)</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
            </div>
            
            <div className="form-group">
              <label>Image</label>
              <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleFileChange} />
              <small className="help-text">Or enter an image URL below:</small>
              <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="https://..." />
            </div>
            
            <div className="form-group">
              <label>Badge (Optional)</label>
              <input type="text" name="badge" value={formData.badge} onChange={handleInputChange} placeholder="e.g. Bestseller" />
            </div>
            
            <div className="form-group">
              <label>WhatsApp Message</label>
              <textarea name="whatsappMessage" value={formData.whatsappMessage} onChange={handleInputChange} rows="2" placeholder="Hi! I'm interested in..."></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {isEditing ? 'Update Product' : 'Add Product'}
              </button>
              {isEditing && (
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-list-section">
          <h2>Products List ({products.length})</h2>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="admin-product-card">
                <img src={getImageUrl(product.image)} alt={product.title} />
                <div className="admin-product-info">
                  <h3>{product.title}</h3>
                  <p className="price">₹{product.price}</p>
                </div>
                <div className="admin-product-actions">
                  <button onClick={() => handleEdit(product)} className="btn-icon edit" title="Edit">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="btn-icon delete" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
