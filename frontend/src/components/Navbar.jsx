import { useState, useEffect } from 'react';
import { Sun, Moon, ShoppingCart } from 'lucide-react';

const Navbar = ({ cartCount = 0, onCartOpen }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);

            const sections = document.querySelectorAll('section[id]');
            let current = '';
            
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 120) {
                    current = section.getAttribute('id');
                }
            });
            
            if (window.scrollY < 200) current = 'hero';
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header id="navbar" className={isScrolled ? 'scrolled' : ''}>
            <a href="#" className="logo">
                <span className="logo-icon">✦</span>
                Krishna Novelty
            </a>
            
            <nav id="nav-menu" className={isMenuOpen ? 'open' : ''}>
                <a href="#" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`} onClick={closeMenu}>Home</a>
                <a href="#products" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`} onClick={closeMenu}>Products</a>
                <a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={closeMenu}>Reviews</a>
                <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={closeMenu}>Contact</a>
                <a href="#admin" className={`nav-link ${activeSection === 'admin' ? 'active' : ''}`} onClick={closeMenu}>Admin</a>
            </nav>

            <div className="cart-actions-wrap">
                <button 
                    className="theme-toggle-btn" 
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
                
                <button 
                    className="cart-toggle-btn" 
                    onClick={onCartOpen}
                    aria-label="View Shopping Cart"
                >
                    <ShoppingCart size={20} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>

                <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger" aria-label="Toggle navigation menu" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
