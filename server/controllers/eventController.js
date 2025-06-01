const Event = require("../models/Event");

const createEvent = async (req, res) => {
  try {
    const { title, description, startDate, startTime, endDate, endTime, location, eventType, image, category } = req.body;

    const event = await Event.create({
      title,
      description,
      startDate, 
      startTime, 
      endDate, 
      endTime,
      location,
      eventType, 
      image,
      category,
      organizer : req.user._id,
      status: "Upcoming",
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating event" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, eventType, location, status, date, sort } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (eventType) query.eventType = eventType;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (status) query.status = status;
    if (date) query.startDate = { $gte: new Date(date) };

    const sortOrder = sort === 'asc' ? 1 : -1;

    const [events, total] = await Promise.all([
      Event.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ startDate: sortOrder })
        .populate('organizer', 'name avatar'),
      Event.countDocuments(query)
    ]);

    res.status(200).json({
      events,
      page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching events' });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "organizer",
      "name avatar email"
    );
    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching event" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      req.user.role !== "Admin" &&
      event.organizer.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this event" });
    }

    const updates = req.body;
    Object.assign(event, updates);
    await event.save();

    res.json({ message: "Event updated", event });
  } catch (err) {
    res.status(500).json({ message: "Server error while updating event" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      req.user.role !== "Admin" &&
      event.organizer.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();
    res.json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while deleting event" });
  }
};

const getEventsByOrganizer = async (req, res) => {
  try {
    const organizerId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // console.log(req.query);
    const { search, eventType, location, status, date, sort } = req.query;

    let query = { organizer: organizerId };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (eventType) query.eventType = eventType;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (status) query.status = status;
    if (date) query.startDate = { $gte: new Date(date) };

    const sortOrder = sort === 'asc' ? 1 : -1;

    const [events, total] = await Promise.all([
      Event.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ startDate: sortOrder })
        .populate('organizer', 'name avatar'),
      Event.countDocuments(query)
    ]);

    res.status(200).json({
      events,
      page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching events by organizer" });
  }
};


module.exports = {createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, getEventsByOrganizer};
