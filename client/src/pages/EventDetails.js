import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import RSVPForm from '../components/RSVPForm';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await api.getEventById(id);
        setEvent(eventData);
      } catch (err) {
        setError('Event not found');
      }
    }
    async function fetchRSVPs() {
      try {
        const rsvpData = await api.getRSVPs(id);
        setRsvps(rsvpData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEvent();
    fetchRSVPs();
  }, [id]);

  const handleNewRSVP = async (rsvp) => {
    try {
      const newRSVP = await api.createRSVP(id, rsvp);
      setRsvps([...rsvps, newRSVP]);
    } catch (err) {
     
      console.error('Error submitting RSVP:', err);
      throw err;  
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!event) {
    return <div className="loading">Loading event details...</div>;
  }

  return (
    <div className="event-details-container">
      {/* Back to Home Link */}
      <div className="back-to-home">
        <Link to="/">← Back to Home</Link>
      </div>
      <header className="event-details-header">
        <h2>{event.name}</h2>
      </header>
      <div className="event-info">
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        {event.description && <p><strong>Description:</strong> {event.description}</p>}
        {event.organizer && <p><strong>Organizer:</strong> {event.organizer}</p>}
      </div>

      <section className="rsvp-section">
        <h3>RSVPs</h3>
        {rsvps.length > 0 ? (
          <ul className="rsvp-list">
            {rsvps.map((rsvp) => {
              let statusClass = '';
              if (rsvp.rsvpStatus.toLowerCase() === 'attending') {
                statusClass = 'rsvp-attending';
              } else if (rsvp.rsvpStatus.toLowerCase() === 'not attending') {
                statusClass = 'rsvp-not-attending';
              } else if (rsvp.rsvpStatus.toLowerCase() === 'maybe') {
                statusClass = 'rsvp-maybe';
              }
              return (
                <li key={rsvp._id} className={`rsvp-item ${statusClass}`}>
                  <span className="rsvp-name">{rsvp.userName}</span>: {rsvp.rsvpStatus}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No RSVPs yet.</p>
        )}
      </section>

      <section className="rsvp-form-section">
        <h3>Submit Your RSVP</h3>
        <div className="rsvp-form-container">
          <RSVPForm onSubmit={handleNewRSVP} />
        </div>
      </section>
    </div>
  );
}

export default EventDetails;
