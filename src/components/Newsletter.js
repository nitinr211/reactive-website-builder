import React from 'react';
import './Newsletter.css';

function Newsletter() {
    return (
        <div className="newsletter-container">
            <h2>Subscribe to our newsletter</h2>
            <form className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button className="signup-btn">Sign Up</button>
            </form>
            <p className="disclaimer">
                By completing this form, you are signing up to receive our emails and can unsubscribe at any time.
            </p>
        </div>
    );
}

export default Newsletter;
