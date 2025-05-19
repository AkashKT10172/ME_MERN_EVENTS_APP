const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getPendingOrganizerRequests,
  approveOrganizerRequest,
  rejectOrganizerRequest,
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

router.get('/organizer-requests', getPendingOrganizerRequests); // GET all users with pending organizer requests
router.put('/users/:id/approve-organizer', approveOrganizerRequest); // PUT approve organizer request
router.put('/users/:id/reject-organizer', rejectOrganizerRequest); // PUT reject organizer request

module.exports = router;
