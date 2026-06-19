const API = "http://localhost:4001/api";

const sessionId = sessionStorage.getItem("sessionId") || Math.random().toString(36).slice(2);
sessionStorage.setItem("sessionId", sessionId);

document.addEventListener("click", async (e) => {
    const data = {
        sessionId,
        eventType: "click",
        pageUrl: window.location.pathname,
        x: e.clientX,
        y: e.clientY,
    };

    try {
        await fetch(`${API}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.error("Tracker error:", err);
    }
});