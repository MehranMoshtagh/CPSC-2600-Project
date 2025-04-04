function validateEvent(req, res, next) {
  const { name, date, location } = req.body;

  // Validate event name: required, string, and matches criteria
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Event name is required.' });
  }
  const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name.trim())) {
    return res.status(400).json({
      error: 'Event name must contain at least one letter and may only include letters, spaces, apostrophes, or hyphens.'
    });
  }

  // Validate event date: required, valid date, and not in the past
  if (!date || isNaN(Date.parse(date))) {
    return res.status(400).json({ error: 'A valid event date is required.' });
  }
  const eventDate = new Date(date);
  const now = new Date();
  // Optionally, you could allow events starting today by comparing only the date part
  if (eventDate < now) {
    return res.status(400).json({ error: 'Event date cannot be in the past.' });
  }

  // Validate location: required, string, and matches criteria (similar to name)
  if (!location || typeof location !== 'string' || location.trim() === '') {
    return res.status(400).json({ error: 'Event location is required.' });
  }
  const locationRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s'-]+$/;
  if (!locationRegex.test(location.trim())) {
    return res.status(400).json({
      error: 'Event location must contain at least one letter and may only include letters, spaces, apostrophes, or hyphens.'
    });
  }

  next();
}
function validateRSVP(req, res, next) {
  const { userName, rsvpStatus } = req.body;

  // Ensure userName is provided, is a string, and is not empty after trimming
  if (!userName || typeof userName !== 'string' || userName.trim() === '') {
    return res.status(400).json({ error: 'A valid name is required for RSVP.' });
  }
  
  // Define a regex that allows letters, spaces, apostrophes, and hyphens,
  // and requires at least one letter (a-z or A-Z) in the name.
  const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(userName.trim())) {
    return res.status(400).json({
      error:
        'RSVP name must contain at least one letter and may only include letters, spaces, apostrophes, or hyphens.'
    });
  }
  
  // Validate that rsvpStatus exists and is a non-empty string
  if (!rsvpStatus || typeof rsvpStatus !== 'string' || rsvpStatus.trim() === '') {
    return res.status(400).json({ error: 'RSVP status is required.' });
  }
  
  next();
}

module.exports = {
  validateEvent,
  validateRSVP,
};
