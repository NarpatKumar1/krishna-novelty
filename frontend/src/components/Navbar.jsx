import { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

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
            <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger" aria-label="Toggle navigation menu" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
};

export default Navbar;
