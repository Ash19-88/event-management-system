const getEventById = async (srv, eventId) => {
  return await srv.run(SELECT.from(Events).where({ ID: eventId }));
};

function validateEvent(name, startDate, endDate, location, description) {
  if (!name || !startDate || !endDate || !location || !description) {
    console.error("All fields are required.");
    return false;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error("Invalid date format.");
    return false;
  }

  if (start >= end) {
    console.error("Start date must be before end date.");
    return false;
  }

  if (name.length < 3 || name.length > 100) {
    console.error("Event name must be between 3 and 100 characters.");
    return false;
  }

  if (description.length < 10 || description.length > 500) {
    console.error("Description must be between 10 and 500 characters.");
    return false;
  }

  return true;
}

module.exports = {
  getEventById,
  validateEvent,
};
