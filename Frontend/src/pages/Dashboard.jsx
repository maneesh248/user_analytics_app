import { useEffect, useState } from "react";

const API = "https://user-analytics-app1.onrender.com/api";

const KPI = [
    { key: "sessions", label: "Sessions", delta: "+12%" },
    { key: "clicks", label: "Clicks", delta: "+8%" },
    { key: "pageViews", label: "Page views", delta: "−3%" },
    { key: "events", label: "Events", delta: "+21%" },
];

export default function Dashboard() {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`${API}/sessions`)
            .then(r => r.json())
            .then(setSessions)
            .catch(() => setError(true));
    }, []);

    const stats = {
        sessions: sessions.length,
        clicks: sessions.reduce((a, s) => a + (s.clickCount ?? 0), 0),
        pageViews: sessions.reduce((a, s) => a + (s.pageViewCount ?? 0), 0),
        events: sessions.reduce((a, s) => a + (s.eventCount ?? 0), 0),
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div>
                <h1 style={{ fontSize: 16, fontWeight: 500, color: "#e2e8f0" }}>Analytics dashboard</h1>
                <p style={{ fontSize: 12, color: "#3d4466", marginTop: 3 }}>Session tracking & heatmap analysis</p>
            </div>

            {error && (
                <p style={{ fontSize: 12, color: "#f87171" }}>
                    Could not reach the server. Start your backend on port 4001.
                </p>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {KPI.map(({ key, label, delta }) => (
                    <div key={key} style={{
                        background: "#0f1117", border: "0.5px solid #1e2130",
                        borderRadius: 8, padding: 16
                    }}>
                        <p style={{ fontSize: 11, color: "#3d4466", marginBottom: 8 }}>{label}</p>
                        <p style={{ fontSize: 22, fontWeight: 500, color: "#e2e8f0", letterSpacing: "-0.5px" }}>
                            {stats[key].toLocaleString()}
                        </p>
                        <p style={{ fontSize: 11, color: delta.startsWith("−") ? "#f87171" : "#22c55e", marginTop: 4 }}>
                            {delta} this week
                        </p>
                    </div>
                ))}
            </div>

            <div>
                <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>Recent sessions</p>
                <div style={{ background: "#0f1117", border: "0.5px solid #1e2130", borderRadius: 8, overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "0.5px solid #1e2130" }}>
                                {["Session ID", "Page", "Events", "Last Seen"].map(h => (
                                    <th key={h} style={{ fontSize: 10, color: "#3d4466", textAlign: "left", padding: "10px 14px", fontWeight: 400 }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ padding: "20px 14px", fontSize: 12, color: "#3d4466", textAlign: "center" }}>
                                        {error ? "No data — backend offline" : "No sessions yet"}
                                    </td>
                                </tr>
                            ) : sessions.slice(0, 8).map(s => (
                                <tr key={s._id} style={{ borderBottom: "0.5px solid #0b0d14" }}>
                                    <td style={{ padding: "9px 14px", fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>
                                        {String(s._id).slice(-7)}
                                    </td>
                                    <td style={{ padding: "9px 14px", fontSize: 11, color: "#94a3b8" }}>
                                        {s.pageUrl ?? "/"}
                                    </td>
                                    <td style={{ padding: "9px 14px", fontSize: 11, color: "#94a3b8" }}>
                                        {s.eventCount ?? 0}
                                    </td>
                                    <td style={{ padding: "9px 14px", fontSize: 11, color: "#94a3b8" }}>
                                        {s.lastSeen ? new Date(s.lastSeen).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}