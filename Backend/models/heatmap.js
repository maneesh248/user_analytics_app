const mongoose = require("mongoose");

const heatmapSchema = new mongoose.Schema(
    {
        sessionId: String,
        eventType: String,
        pageUrl: String,
        x: Number,
        y: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Heatmap", heatmapSchema);