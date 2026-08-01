import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const WHATSAPP_NUMBER = '918438725221';

const getImageUrl = (image) => {
    if (!image) return '/images/gift-box.png';
    const trimmed = image.trim();
    if (trimmed.startsWith('http') || trimmed.startsWith('data:')) return trimmed;
    if (trimmed.startsWith('www.')) return `https://${trimmed}`;
    if (trimmed.startsWith('/uploads')) return `${API_URL}${trimmed}`;
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
};

export default function Cart({ isOpen, onClose, cart, onUpdateQty, onRemoveItem }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        let message = `🛒 *New Order from Krishna Novelty* 🛒\n`;
        message += `------------------------------------\n`;
        message += `📦 *Items:* \n`;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            message += `${index + 1}. *${item.title}* (Qty: ${item.quantity}) - ₹${itemTotal}\n`;
        });
        
        message += `\n💵 *Total Price:* ₹${total}\n`;
        message += `------------------------------------\n`;
        message += `Please confirm my order!`;

        const encodedUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(encodedUrl, '_blank');
    };

    return (
        <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-cart-btn" onClick={onClose} aria-label="Close cart">
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-body">
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <ShoppingBag size={48} className="text-light" />
                            <p className="cart-empty-text">Your cart is empty</p>
                            <p>Add some beautiful novelty items to start shopping!</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img 
                                    className="cart-item-img" 
                                    src={getImageUrl(item.image)} 
                                    alt={item.title} 
                                />
                                <div className="cart-item-details">
                                    <div className="cart-item-title">{item.title}</div>
                                    <div className="cart-item-price">₹{item.price}</div>
                                    <div className="cart-item-controls">
                                        <button 
                                            className="qty-btn" 
                                            onClick={() => onUpdateQty(item.id, -1)}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="qty-val">{item.quantity}</span>
                                        <button 
                                            className="qty-btn" 
                                            onClick={() => onUpdateQty(item.id, 1)}
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                                <button 
                                    className="remove-item-btn" 
                                    onClick={() => onRemoveItem(item.id)}
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total-row">
                            <span>Total Price:</span>
                            <span>₹{total}</span>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Order on WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
