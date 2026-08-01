import { useEffect, useState } from 'react';

const LOCAL_PRODUCTS = [
    {
        id: 1,
        title: 'Gift Box Set',
        desc: 'Premium wrapped gift boxes for every occasion',
        price: 299,
        image: '/images/gift-box.png',
        badge: 'Bestseller',
        whatsappMessage: "Hi! I'm interested in the Gift Box Set (₹299). Please share more details!"
    },
    {
        id: 2,
        title: 'Soft Toys',
        desc: 'Cuddly teddy bears and plush toys kids love',
        price: 499,
        image: '/images/soft-toy.png',
        badge: 'Popular',
        whatsappMessage: "Hi! I'm interested in the Soft Toys (₹499). Please share more details!"
    },
    {
        id: 3,
        title: 'Home Decor',
        desc: 'Elegant vases, showpieces & decorative items',
        price: 399,
        image: '/images/home-decor.png',
        badge: null,
        whatsappMessage: "Hi! I'm interested in Home Decor items (₹399). Please share more details!"
    },
    {
        id: 4,
        title: 'Hair Accessories',
        desc: 'Clips, bands, scrunchies & butterfly pins',
        price: 149,
        image: '/images/hair-accessories.png',
        badge: 'New',
        whatsappMessage: "Hi! I'm interested in Hair Accessories (₹149). Please share more details!"
    }
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getImageUrl = (image) => {
    if (!image) return '/images/gift-box.png';
    const trimmed = image.trim();
    if (trimmed.startsWith('http') || trimmed.startsWith('data:')) return trimmed;
    if (trimmed.startsWith('www.')) return `https://${trimmed}`;
    if (trimmed.startsWith('/uploads')) return `${API_URL}${trimmed}`;
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

const Products = () => {
    const [products, setProducts] = useState(LOCAL_PRODUCTS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
                // Fallback to local products on error
                setProducts(LOCAL_PRODUCTS);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Scroll reveal observer
    useEffect(() => {
        if (loading) return;
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
    }, [products, loading]); // Re-run when products are loaded or loading finishes

    return (
        <section id="products" className="products-section">
            <div className="section-header reveal">
                <span className="section-badge">Our Collection</span>
                <h2>Explore Our <span className="gradient-text">Products</span></h2>
                <p className="section-subtitle">Handpicked items to make your celebrations unforgettable</p>
            </div>

            {!loading && (
                <div className="product-container">
                    {products.map((product) => {
                        const whatsappMsg = product.whatsappMessage && product.whatsappMessage.trim() !== ''
                            ? product.whatsappMessage
                            : `Hi! I'm interested in the ${product.title} (₹${product.price}). Please share more details!`;
                        
                        return (
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
                                        <a href={`https://wa.me/918438725221?text=${encodeURIComponent(whatsappMsg)}`} className="btn-order" target="_blank" rel="noopener noreferrer" aria-label={`Order ${product.title} on WhatsApp`}>
                                            Order Now
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default Products;
