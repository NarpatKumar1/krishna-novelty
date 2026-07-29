import { useEffect } from 'react';

const Testimonials = () => {
    useEffect(() => {
        const revealElements = document.querySelectorAll('#testimonials .reveal');
        
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
    }, []);

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="section-header reveal">
                <span className="section-badge">Customer Love</span>
                <h2>What Our <span className="gradient-text">Customers</span> Say</h2>
            </div>
            <div className="testimonials-container">
                <div className="testimonial-card reveal">
                    <div className="stars">★★★★★</div>
                    <p className="testimonial-text">"Bought a gift box for my friend's birthday — she absolutely loved it! The quality is amazing and the packaging is so beautiful. Will definitely buy again."</p>
                    <div className="testimonial-author">
                        <div className="author-avatar">P</div>
                        <div>
                            <strong>Priya S.</strong>
                            <span>Salem</span>
                        </div>
                    </div>
                </div>
                <div className="testimonial-card reveal">
                    <div className="stars">★★★★★</div>
                    <p className="testimonial-text">"Best novelty shop in Salem! Great variety, affordable prices, and the owner is so helpful. My kids love the soft toys from here. Highly recommended!"</p>
                    <div className="testimonial-author">
                        <div className="author-avatar">R</div>
                        <div>
                            <strong>Ramesh K.</strong>
                            <span>Salem</span>
                        </div>
                    </div>
                </div>
                <div className="testimonial-card reveal">
                    <div className="stars">★★★★★</div>
                    <p className="testimonial-text">"I ordered hair accessories and home decor via WhatsApp — super convenient! Fast delivery and everything was exactly as shown. Love this shop! 💕"</p>
                    <div className="testimonial-author">
                        <div className="author-avatar">A</div>
                        <div>
                            <strong>Anitha M.</strong>
                            <span>Salem</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
