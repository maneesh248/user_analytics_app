const express = require("express");
const router = express.Router();
const Event = require("../models/Events");

router.get("/", async (req, res) => {
    try {
        const { page } = req.query;
        if (!page) return res.status(400).json({ message: "page query param is required" });

        const data = await Event.find(
            { pageUrl: page, eventType: "click" },
            { x: 1, y: 1, _id: 0 }  // only return x and y
        );

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;