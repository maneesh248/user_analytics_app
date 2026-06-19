const express = require("express");
const Event = require("../models/Events");

const router = express.Router();

/*
POST /api/events
*/

router.post("/", async (req, res) => {
    try {
        const {
            sessionId,
            eventType,
            pageUrl,
            timestamp,
            x,
            y,
        } = req.body;

        const event = await Event.create({
            sessionId,
            eventType,
            pageUrl,
            timestamp,
            x,
            y,
        });

        res.status(201).json({
            success: true,
            event,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});

module.exports = router;