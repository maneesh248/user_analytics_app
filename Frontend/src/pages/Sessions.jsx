import { useEffect, useState } from "react";

const API = "http://localhost:4001/api";

export default function Sessions() {
    const [sessions, setSessions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [eventsLoading, setEventsLoading] = useState(false);

    useEffect(() => {
        fetch(`${API}/sessions`)
            .then(r => r.json())
            .then(d => { setSessions(Array.isArray(d) ? d : []); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const loadEvents = async (id) => {
        setSelected(id);
        setEvents([]);
        setEventsLoading(true);
        try {
            const r = await fetch(`${API}/sessions/${id}`);
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const d = await r.json();
            setEvents(Array.isArray(d) ? d : []);
        } catch (err) {
            console.error("Failed to load events:", err);
        }
        setEventsLoading(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
                <h1 style={{ fontSize: 16, fontWeight: 500, color: "#e2e8f0" }}>Sessions</h1>
                <p style={{ fontSize: 12, color: "#3d4466", marginTop: 3 }}>
                    {sessions.length} total sessions
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16, alignItems: "start" }}>

                {/* Session list */}
                <div style={{ background: "#0f1117", border: "0.5px solid #1e2130", borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ padding: "10px 14px", borderBottom: "0.5px solid #1e2130" }}>
                        <p style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>All sessions</p>
                    </div>
                    {loading ? (
                        <p style={{ padding: "20px 14px", fontSize: 12, color: "#3d4466" }}>Loading…</p>
                    ) : sessions.length === 0 ? (
                        <p style={{ padding: "20px 14px", fontSize: 12, color: "#3d4466" }}>No sessions yet</p>
                    ) : sessions.map(s => (
                        <button
                            key={s._id}
                            onClick={() => loadEvents(s._id)}
                            style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                width: "100%", padding: "10px 14px", border: "none",
                                borderBottom: "0.5px solid #0b0d14", textAlign: "left", cursor: "pointer",
                                background: selected === s._id ? "#13152a" : "transparent",
                                borderLeft: selected === s._id ? "2px solid #6366f1" : "2px solid transparent",
                                transition: "all 0.1s"
                            }}
                        >
                            <div>
                                <p style={{ fontSize: 11, color: selected === s._id ? "#c7d2fe" : "#94a3b8", fontFamily: "monospace" }}>
                                    {String(s._id).slice(-10)}
                                </p>
                                <p style={{ fontSize: 10, color: "#3d4466", marginTop: 2 }}>
                                    {s.pageUrl ?? "/"}
                                </p>
                            </div>
                            <span style={{ fontSize: 10, color: "#3d4466" }}>
                                {s.eventCount ?? 0} events
                            </span>
                        </button>
                    ))}
                </div>

                {/* Event journey */}
                <div style={{ background: "#0f1117", border: "0.5px solid #1e2130", borderRadius: 8, overflow: "hidden" }}>
                    <div style={{ padding: "10px 14px", borderBottom: "0.5px solid #1e2130" }}>
                        <p style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>
                            {selected ? "Event journey" : "Select a session"}
                        </p>
                    </div>
                    {!selected ? (
                        <p style={{ padding: "24px 14px", fontSize: 12, color: "#3d4466", textAlign: "center" }}>
                            Click a session to see its events
                        </p>
                    ) : eventsLoading ? (
                        <p style={{ padding: "24px 14px", fontSize: 12, color: "#3d4466", textAlign: "center" }}>Loading…</p>
                    ) : events.length === 0 ? (
                        <p style={{ padding: "24px 14px", fontSize: 12, color: "#3d4466", textAlign: "center" }}>No events</p>
                    ) : events.map((e, i) => (
                        <div key={e._id} style={{
                            display: "flex", alignItems: "flex-start", gap: 12,
                            padding: "10px 14px", borderBottom: i < events.length - 1 ? "0.5px solid #0b0d14" : "none"
                        }}>
                            <div style={{
                                width: 20, height: 20, borderRadius: "50%",
                                background: e.eventType === "click" ? "#312e81" : "#1e2130",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0, marginTop: 1
                            }}>
                                <span style={{ fontSize: 9, color: e.eventType === "click" ? "#818cf8" : "#64748b" }}>
                                    {e.eventType === "click" ? "C" : "P"}
                                </span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: 11, color: "#94a3b8" }}>{e.pageUrl}</p>
                                <p style={{ fontSize: 10, color: "#3d4466", marginTop: 2 }}>
                                    {e.eventType}
                                    {e.x != null && ` · ${Math.round(e.x)}, ${Math.round(e.y)}`}
                                </p>
                            </div>
                            <p style={{ fontSize: 10, color: "#3d4466", whiteSpace: "nowrap" }}>
                                {new Date(e.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}