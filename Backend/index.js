const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const sessionRoutes = require("./routes/sessions");
const heatmapRoutes = require("./routes/heatmap");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4001;

app.use(cors({ origin: "*" }));
app.use(express.json());


app.use((req, res, next) => {
    const hasBody = req.method !== "GET" && Object.keys(req.body || {}).length > 0;
    console.log(`[REQ] ${req.method} ${req.path}${hasBody ? " " + JSON.stringify(req.body) : ""}`);
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/heatmap", heatmapRoutes);

app.get("/", (req, res) => {
    res.send("AnalyticsPro API running");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});