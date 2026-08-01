import { useEffect, useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';

const LOCAL_PRODUCTS = [
    {
        id: 1,
        title: 'Gift Box Set',
        desc: 'Premium wrapped gift boxes for every occasion',
        price: 299,
        image: '/images/gift-box.png',
        badge: 'Bestseller',
        category: 'Gift Boxes',
        whatsappMessage: "Hi! I'm interested in the Gift Box Set (₹299). Please share more details!"
    },
    {
        id: 2,
        title: 'Soft Toys',
        desc: 'Cuddly teddy bears and plush toys kids love',
        price: 499,
        image: '/images/soft-toy.png',
        badge: 'Popular',
        category: 'Soft Toys',
        whatsappMessage: "Hi! I'm interested in the Soft Toys (₹499). Please share more details!"
    },
    {
        id: 3,
        title: 'Home Decor',
        desc: 'Elegant vases, showpieces & decorative items',
        price: 399,
        image: '/images/home-decor.png',
        badge: null,
        category: 'Home Decor',
        whatsappMessage: "Hi! I'm interested in Home Decor items (₹399). Please share more details!"
    },
    {
        id: 4,
        title: 'Hair Accessories',
        desc: 'Clips, bands, scrunchies & butterfly pins',
        price: 149,
        image: '/images/hair-accessories.png',
        badge: 'New',
        category: 'Accessories',
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

const getCategoryForProduct = (product) => {
    if (product.category && product.category.trim() !== '') {
        return product.category.trim();
    }
    // Fallback heuristic based on title/desc
    const title = (product.title || '').toLowerCase();
    if (title.includes('box') || title.includes('gift')) return 'Gift Boxes';
    if (title.includes('toy') || title.includes('teddy') || title.includes('soft')) return 'Soft Toys';
    if (title.includes('decor') || title.includes('vase') || title.includes('candle') || title.includes('holder') || title.includes('showpiece')) return 'Home Decor';
    if (title.includes('clip') || title.includes('band') || title.includes('scrunchie') || title.includes('pin') || title.includes('accessory') || title.includes('hair')) return 'Accessories';
    if (title.includes('bag') || title.includes('purse') || title.includes('handbag')) return 'Bags';
    if (title.includes('earring') || title.includes('jewelry') || title.includes('jewel')) return 'Jewelry';
    if (title.includes('bangle')) return 'Bangles';
    if (title.includes('makeup') || title.includes('cosmetic')) return 'Cosmetics';
    return 'Accessories';
};

const Products = ({ onAddToCart }) => {
    const [products, setProducts] = useState(LOCAL_PRODUCTS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

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
                setProducts(LOCAL_PRODUCTS);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeCategory === 'All' || getCategoryForProduct(product) === activeCategory;
        const matchesSearch = 
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            product.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Get unique categories list dynamically
    const categories = ['All', ...new Set(products.map(getCategoryForProduct))];

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
    }, [filteredProducts, loading]); // Re-run when filtered results or loading status changes

    return (
        <section id="products" className="products-section">
            <div className="section-header reveal">
                <span className="section-badge">Our Collection</span>
                <h2>Explore Our <span className="gradient-text">Products</span></h2>
                <p className="section-subtitle">Handpicked items to make your celebrations unforgettable</p>
            </div>

            <div className="catalog-controls reveal">
                <div className="search-bar-wrap">
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="search-icon-svg" size={20} />
                </div>
                
                <div className="categories-container">
                    {categories.map((category) => (
                        <button 
                            key={category} 
                            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {!loading && (
                <div className="product-container">
                    {filteredProducts.map((product) => {
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
                                    
                                    <div className="price-tag-wrap">
                                        <span className="price">₹{product.price}</span>
                                    </div>
                                    
                                    <div className="card-footer-buttons">
                                        <button 
                                            className="btn-add-cart" 
                                            onClick={() => onAddToCart(product)}
                                            aria-label={`Add ${product.title} to cart`}
                                        >
                                            <ShoppingCart size={16} />
                                            Add Cart
                                        </button>
                                        
                                        <a 
                                            href={`https://wa.me/918438725221?text=${encodeURIComponent(whatsappMsg)}`} 
                                            className="btn-order-compact" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            aria-label={`Order ${product.title} directly on WhatsApp`}
                                        >
                                            Buy Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            
            {!loading && filteredProducts.length === 0 && (
                <p style={{textAlign: 'center', marginTop: '40px', fontSize: '1.1rem', color: 'var(--text-light)'}}>
                    No products found matching your criteria.
                </p>
            )}
        </section>
    );
};

export default Products;
