// client/src/api.js or wherever this lives

const getBaseUrl = () => {
  const isLocalhost = window.location.hostname === "localhost";
  return isLocalhost ? "http://localhost:5000/api/v1" : "/api/v1";
};

const API_BASE = getBaseUrl();

async function getEvents() {
  const response = await fetch(`${API_BASE}/events`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return await response.json();
}

async function getEventById(id) {
  const response = await fetch(`${API_BASE}/events/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }
  return await response.json();
}

async function createEvent(eventData) {
  const response = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create event");
  }
  return response.json();
}

async function createRSVP(eventId, rsvpData) {
  const response = await fetch(`${API_BASE}/events/${eventId}/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rsvpData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit RSVP");
  }
  return response.json();
}

async function getRSVPs(eventId) {
  const response = await fetch(`${API_BASE}/events/${eventId}/rsvps`);
  if (!response.ok) {
    throw new Error("Failed to fetch RSVPs");
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
