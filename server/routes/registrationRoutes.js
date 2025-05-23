const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  registerForEvent,
  cancelRegistration,
  getMyRegisteredEvents,
} = require('../controllers/registrationController');

const router = express.Router();

router.use(protect);

router.post('/:eventId', registerForEvent); // Register for an event
router.delete('/:eventId', cancelRegistration); // Cancel registration
router.get('/my-events', getMyRegisteredEvents); // Get my registered events

module.exports = router;
