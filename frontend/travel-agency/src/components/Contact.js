import { useState } from 'react';
import { submitContactForm } from './api';
import Header from './Header';
import '../styles/Contact.css';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    description: '', // Changed from 'message' to 'description'
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactForm(contactForm);
      setMessage('Message sent successfully!');
      setContactForm({ name: '', email: '', description: '' }); // Clear form
    } catch (err) {
      setMessage('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="contact-page">
      <Header />
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <p>123 Travel Street, Adventure City, AC 12345</p>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <p>+1 234 567 8900</p>
          </div>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <p>info@hamatravel.com</p>
          </div>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
        </div>
        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          {message && <p className="message">{message}</p>}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                placeholder="Your Description"
                value={contactForm.description}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="send-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;