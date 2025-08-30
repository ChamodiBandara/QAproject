const Event = require("../models/Event");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { name, location, date } = req.body;

    if (!name || !location || !date) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, location, date",
      });
    }

    const event = new Event({
      name,
      location,
      date,
      
    });

    await event.save();
    res.status(201).json({ success: true, data: event });

  } catch (err) {
    console.error("Create Event Error:", err);
    res.status(500).json({ success: false, error: "Server error while creating event" });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    res.status(200).json({ success: true, data: updatedEvent });
  } catch (err) {
    console.error("Update Event Error:", err);
    res.status(500).json({ success: false, error: "Server error while updating event" });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }
    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
