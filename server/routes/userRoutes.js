const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { requestForOrganizer } = require('../controllers/userController');

const router = express.Router();

router.put('/request-organizer', protect, requestForOrganizer);

module.exports = router;
