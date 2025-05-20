const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsByOrganizer
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', getAllEvents);           // GET all events
router.get('/:id', getEventById);        // GET single event

router.post('/', protect, authorize('Organizer', 'Admin'), createEvent);             // Create event
router.put('/:id', protect, authorize('Organizer', 'Admin'), updateEvent);           // Update event
router.delete('/:id', protect, authorize('Organizer', 'Admin'), deleteEvent);        // Delete event
router.get('/organizer/:id', protect, authorize('Organizer', 'Admin'), getEventsByOrganizer); //get event by organizer

module.exports = router;
