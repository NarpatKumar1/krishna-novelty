import { useState, useEffect } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const revealElements = document.querySelectorAll('#contact .reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
        
        return () => revealElements.forEach(el => revealObserver.unobserve(el));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id.replace('contact-', '')]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, phone, message } = formData;
        
        if (!name || !phone || !message) return;

        const whatsappMessage = encodeURIComponent(`Hi! I'm ${name}.\nPhone: ${phone}\n\nMessage: ${message}`);
        window.open(`https://wa.me/918438725221?text=${whatsappMessage}`, '_blank');
        
        setFormData({ name: '', phone: '', message: '' });
        setSubmitted(true);
        
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="contact-section">
            <div className="section-header reveal">
                <span className="section-badge">Get In Touch</span>
                <h2>Contact <span className="gradient-text">Us</span></h2>
                <p className="section-subtitle">Visit our shop or reach out — we'd love to hear from you!</p>
            </div>
            <div className="contact-grid">
                <div className="contact-info reveal">
                    <div className="info-card">
                        <div className="info-icon">📍</div>
                        <div>
                            <h4>Our Location</h4>
                            <p>Salem, Tamil Nadu, India</p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">📞</div>
                        <div>
                            <h4>Phone</h4>
                            <p><a href="tel:+918438725221">+91 84387 25221</a></p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">💬</div>
                        <div>
                            <h4>WhatsApp</h4>
                            <p><a href="https://wa.me/918438725221" target="_blank" rel="noopener noreferrer">Chat with us</a></p>
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">🕐</div>
                        <div>
                            <h4>Business Hours</h4>
                            <p>Mon–Sat: 9:00 AM – 9:00 PM<br/>Sunday: 10:00 AM – 6:00 PM</p>
                        </div>
                    </div>
                </div>
                <form className="contact-form reveal" id="contact-form" onSubmit={handleSubmit}>
                    <h3>Send us a message</h3>
                    <div className="form-group">
                        <input type="text" id="contact-name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <input type="tel" id="contact-phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <textarea id="contact-message" placeholder="Your Message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-full" id="contact-submit" style={submitted ? { background: 'linear-gradient(135deg, #00c853, #00bfa5)' } : {}}>
                        {submitted ? <span>✓ Sent to WhatsApp!</span> : (
                            <>
                                <span>Send Message</span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
