import { useEffect, useRef, useState } from 'react';

const Hero = () => {
    const [stats, setStats] = useState({ products: 0, customers: 0, years: 0 });
    const statsRef = useRef(null);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !animated) {
                    setAnimated(true);
                    animateValue('products', 500, 2000);
                    animateValue('customers', 1000, 2000);
                    animateValue('years', 5, 2000);
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) observer.unobserve(statsRef.current);
        };
    }, [animated]);

    const animateValue = (key, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setStats(prev => ({
                ...prev,
                [key]: Math.floor(progress * end)
            }));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    return (
        <section className="hero" id="hero">
            <div className="hero-bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
                <div className="shape shape-5"></div>
            </div>
            <div className="hero-content">
                <span className="hero-badge">🎁 Welcome to Krishna Novelty</span>
                <h1>Make Every <span className="gradient-text">Celebration</span> Special</h1>
                <p className="hero-subtitle">Discover our curated collection of beautiful gifts, toys, decor & accessories — all in one place, right here in Salem.</p>
                <div className="hero-buttons">
                    <a href="#products" className="btn btn-primary" id="hero-shop-btn">
                        <span>Shop Now</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                    <a href="https://wa.me/918438725221?text=Hi!%20I%20want%20to%20know%20about%20your%20products." className="btn btn-secondary" id="hero-whatsapp-btn" target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        <span>WhatsApp Us</span>
                    </a>
                </div>
                <div className="hero-stats" ref={statsRef}>
                    <div className="stat">
                        <span className="stat-number">{stats.products}</span><span className="stat-plus">+</span>
                        <span className="stat-label">Products</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number">{stats.customers}</span><span className="stat-plus">+</span>
                        <span className="stat-label">Happy Customers</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat">
                        <span className="stat-number">{stats.years}</span><span className="stat-plus">+</span>
                        <span className="stat-label">Years in Salem</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
