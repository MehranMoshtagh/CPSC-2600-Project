const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api/v1';

async function getEvents() {
  const response = await fetch(`${API_BASE}/events`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return await response.json();
}

async function getEventById(id) {
  const response = await fetch(`${API_BASE}/events/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  return await response.json();
}

async function createEvent(eventData) {
  const response = await fetch(`${API_BASE}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create event');
  }
  return response.json();
}

async function createRSVP(eventId, rsvpData) {
  const response = await fetch(`${API_BASE}/events/${eventId}/rsvp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rsvpData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to submit RSVP');
  }
  return response.json();
}
async function getRSVPs(eventId) {
  const response = await fetch(`${API_BASE}/events/${eventId}/rsvps`);
  if (!response.ok) {
    throw new Error('Failed to fetch RSVPs');
  }
  return await response.json();
}

const api = {
  getEvents,
  getEventById,
  createEvent,
  createRSVP,
  getRSVPs,
};

export default api;
