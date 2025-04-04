import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles.css'; // Ensure you import the updated styles

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await api.getEvents();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="main-container">
      <header className="header">
        <h1>Event Management Application</h1>
      </header>

      <div className="sub-header">
        <h2>Upcoming Events</h2>
        <Link to="/create" className="create-button">Create New Event</Link>
      </div>

      <div className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>
                <Link to={`/events/${event._id}`}>{event.name}</Link>
              </h3>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              {event.description && (
                <p><strong>Description:</strong> {event.description}</p>
              )}
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
