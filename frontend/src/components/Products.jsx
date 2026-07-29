import { useEffect, useState } from 'react';

const getImageUrl = (image) => {
    if (!image) return '';
    const trimmed = image.trim();
    if (trimmed.startsWith('http') || trimmed.startsWith('data:')) return trimmed;
    if (trimmed.startsWith('www.')) return `https://${trimmed}`;
    if (trimmed.startsWith('/uploads')) return `http://localhost:5000${trimmed}`;
    return `/${trimmed}`;
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Scroll reveal observer
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
        
        return () => {
            revealElements.forEach(el => revealObserver.unobserve(el));
        }
    }, [products]); // Re-run when products are loaded

    return (
        <section id="products" className="products-section">
            <div className="section-header reveal">
                <span className="section-badge">Our Collection</span>
                <h2>Explore Our <span className="gradient-text">Products</span></h2>
                <p className="section-subtitle">Handpicked items to make your celebrations unforgettable</p>
            </div>

            {loading && <p style={{textAlign: 'center'}}>Loading products...</p>}
            {error && <p style={{textAlign: 'center', color: 'red'}}>Error: {error}</p>}

            {!loading && !error && (
                <div className="product-container">
                    {products.map((product) => (
                        <div className="card reveal" key={product.id}>
                            <div className="card-image-wrap">
                                <img src={getImageUrl(product.image)} alt={product.title} />
                                {product.badge && <span className={`card-badge ${product.badge.toLowerCase()}`}>{product.badge}</span>}
                            </div>
                            <div className="card-body">
                                <h3>{product.title}</h3>
                                <p className="card-desc">{product.desc}</p>
                                <div className="card-footer">
                                    <span className="price">₹{product.price}</span>
                                    <a href={`https://wa.me/918438725221?text=${encodeURIComponent(product.whatsappMessage)}`} className="btn-order" target="_blank" rel="noopener noreferrer" aria-label={`Order ${product.title} on WhatsApp`}>
                                        Order Now
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Products;
