const express = require("express");
const Event = require("../models/Events");

const router = express.Router();

// All sessions
router.get("/", async (req, res) => {
    try {
        const sessions = await Event.aggregate([
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: "$sessionId",
                    eventCount: { $sum: 1 },
                    clickCount: {
                        $sum: {
                            $cond: [{ $eq: ["$eventType", "click"] }, 1, 0],
                        },
                    },
                    pageViewCount: {
                        $sum: {
                            $cond: [{ $eq: ["$eventType", "page_view"] }, 1, 0],
                        },
                    },
                    pageUrl: { $first: "$pageUrl" },
                    lastSeen: { $first: "$timestamp" },
                },
            },
            { $sort: { lastSeen: -1 } },
        ]);

        res.json(sessions);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

// Session Journey
router.get("/:sessionId", async (req, res) => {
    try {
        const events = await Event.find({
            sessionId: req.params.sessionId,
        }).sort({
            timestamp: 1,
        });

        res.json(events);
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;