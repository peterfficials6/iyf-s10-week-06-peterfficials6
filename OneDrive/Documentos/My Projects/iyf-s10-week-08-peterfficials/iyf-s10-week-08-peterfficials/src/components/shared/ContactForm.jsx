import { useState } from 'react';

function ContactForm() {
    // Single state object for all form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    // Handle any input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault(); // Stop page reload
        console.log('Form submitted:', formData);
        alert(`Thanks ${formData.name}! Your message was sent.`);
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });
    };
    
    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Contact Us</h3>
            
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
            />
            
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
            />
            
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                rows="4"
                required
            />
            
            <button type="submit">Send Message</button>
        </form>
    );
}

export default ContactForm;