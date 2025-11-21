import React from "react"
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer">

      <div className="footer-content">

        <div className="footer-section brand">
          <h3>CryptoPlace</h3>
          <p>Your trusted source for real-time cryptocurrency data, market insights, and transparent pricing information.</p>
        </div>

        <div className="footer-section contact">
          <h4>Get in Touch</h4>
          <p>
            <svg className="contact-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            ahmedabdulelah247@gmail.com
          </p>
          <p>
            <svg className="contact-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            +62 852-1059-8287
          </p>
        </div>

        <div className="footer-section map-area">
          <h4>Our Location</h4>
          <iframe
            title="jakarta-map"
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.48628534207!2d106.816666!3d-6.207250999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e97f93bc4b%3A0xd1e3b2dd5f9a2b75!2sCentral%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000001"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 CryptoPlace. All Rights Reserved.</p>
      </div>

    </div>
  )
}

export default Footer