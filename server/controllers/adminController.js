const User = require('../models/User.js');

exports.getPendingOrganizerRequests = async (req, res) => {
  try {
    const pendingUsers = await User.find({ organizerApprovalStatus: 'pending' }).select('-password');
    res.json(pendingUsers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.approveOrganizerRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.organizerApprovalStatus !== 'pending') {
      return res.status(404).json({ message: 'Pending request not found' });
    }

    user.organizerApprovalStatus = 'approved';
    user.role = 'Organizer';
    await user.save();

    res.json({ message: 'User approved as Organizer', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.rejectOrganizerRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.organizerApprovalStatus !== 'pending') {
      return res.status(404).json({ message: 'Pending request not found' });
    }

    user.organizerApprovalStatus = 'rejected';
    user.role = 'Participant';
    await user.save();

    res.json({ message: 'Organizer request rejected', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
