// RSVPForm.js
import React, { useState } from 'react';

function RSVPForm({ onSubmit }) {
  const [form, setForm] = useState({
    userName: '',
    rsvpStatus: 'attending',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client-side check
    if (!form.userName || form.userName.trim() === '') {
      setError('Please enter your name.');
      return;
    }
    setError('');
    try {
      await onSubmit(form);
      setForm({ userName: '', rsvpStatus: 'attending' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rsvp-form">
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label htmlFor="userName">Your Name:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="rsvpStatus">RSVP Status:</label>
        <select
          id="rsvpStatus"
          name="rsvpStatus"
          value={form.rsvpStatus}
          onChange={handleChange}
        >
          <option value="attending">Attending</option>
          <option value="not attending">Not Attending</option>
          <option value="maybe">Maybe</option>
        </select>
      </div>
      <button type="submit" className="submit-rsvp-btn">Submit RSVP</button>
    </form>
  );
}

export default RSVPForm;
