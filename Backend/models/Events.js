const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        enum: ["page_view", "click"],
        required: true,
    },
    pageUrl: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^https?:\/\/.+/.test(v) || /^\//.test(v),
            message: "pageUrl must be a valid URL or path",
        },
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    x: Number,
    y: Number,
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
});

eventSchema.index({ sessionId: 1, timestamp: -1 });

eventSchema.pre("validate", function () {
    if (this.eventType === "click" && (this.x == null || this.y == null)) {
        throw new Error("x and y are required for click events");
    }
});

module.exports = mongoose.model("Event", eventSchema);