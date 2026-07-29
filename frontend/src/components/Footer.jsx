const Footer = () => {
    return (
        <footer>
            <div className="footer-grid">
                <div className="footer-col">
                    <a href="#" className="footer-logo">
                        <span className="logo-icon">✦</span> Krishna Novelty
                    </a>
                    <p className="footer-desc">Your one-stop novelty shop in Salem for gifts, toys, decor, and accessories. Making celebrations special since 2020.</p>
                </div>
                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <a href="#">Home</a>
                    <a href="#products">Products</a>
                    <a href="#testimonials">Reviews</a>
                    <a href="#contact">Contact</a>
                </div>
                <div className="footer-col">
                    <h4>Categories</h4>
                    <a href="#products">Gift Boxes</a>
                    <a href="#products">Soft Toys</a>
                    <a href="#products">Home Decor</a>
                    <a href="#products">Hair Accessories</a>
                </div>
                <div className="footer-col">
                    <h4>Connect</h4>
                    <a href="tel:+918438725221">📞 +91 84387 25221</a>
                    <a href="https://wa.me/918438725221" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
                    <a href="#">📍 Salem, Tamil Nadu</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Krishna Novelty — Made with ❤️ in Salem</p>
            </div>
        </footer>
    );
};

export default Footer;
