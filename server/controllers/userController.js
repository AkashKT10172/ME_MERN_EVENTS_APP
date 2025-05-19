const User = require("../models/User");

const requestForOrganizer = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.organizerApprovalStatus === "pending") {
            return res.status(400).json({ message: "Request already pending" });
        }
        user.organizerApprovalStatus = "pending";
        await user.save();
        res.json({ message: "Organizer request submitted successfully" });
    } catch (err) {
        console.error("Error requesting organizer:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { requestForOrganizer };
