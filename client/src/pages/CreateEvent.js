import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function CreateEvent() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    organizer: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createEvent(form);
      navigate('/');
    } catch (err) {
      // Set error to the detailed message from the API
      setError(err.message);
    }
  };

  return (
    <div className="create-container">
      <div className="back-to-home">
        <Link to="/">← Back to Home</Link>
      </div>
      <header className="create-header">
        <h2>Create New Event</h2>
        <p className="mandatory-note">
          Fields marked with <span className="asterisk">*</span> are mandatory
        </p>
      </header>
      {/* Display detailed error messages */}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="name">
            Name <span className="asterisk">*</span>:
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea 
            id="description" 
            name="description" 
            value={form.description} 
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">
            Date <span className="asterisk">*</span>:
          </label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">
            Location <span className="asterisk">*</span>:
          </label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={form.location} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="organizer">Organizer:</label>
          <input 
            type="text" 
            id="organizer" 
            name="organizer" 
            value={form.organizer} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="submit-button">Create Event</button>
      </form>
    </div>
  );
}

export default CreateEvent;
