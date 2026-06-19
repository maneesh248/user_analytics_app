import { useRef, useEffect, useState, useCallback, useRef as useLatest } from "react";

const API = "https://user-analytics-app1.onrender.com/api";

export default function Heatmap() {
    const [url, setUrl] = useState("/");
    const [clicks, setClicks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const canvasRef = useRef(null);

    // Keep a ref to the latest url so the interval doesn't go stale
    const urlRef = useRef(url);
    useEffect(() => { urlRef.current = url; }, [url]);

    const load = useCallback(async (pageUrl) => {
        const target = pageUrl ?? urlRef.current;
        setLoading(true);
        setError(false);
        try {
            const r = await fetch(`${API}/heatmap?page=${encodeURIComponent(target)}`);
            if (!r.ok) throw new Error(r.status);
            const d = await r.json();
            setClicks(Array.isArray(d) ? d : []);
        } catch (err) {
            console.error("Heatmap load error:", err);
            setError(true);
            setClicks([]);
        } finally {
            setLoading(false);
        }
    }, []); // stable — reads url via ref

    // Load on mount
    useEffect(() => { load(); }, [load]);

    // Auto-refresh every 5s — stable interval, reads url via ref
    useEffect(() => {
        const id = setInterval(() => load(), 5000);
        return () => clearInterval(id);
    }, [load]);

    // Draw on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        clicks.forEach(({ x, y }) => {
            const gx = parseFloat(x);
            const gy = parseFloat(y);
            if (isNaN(gx) || isNaN(gy)) return;
            const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, 40);
            g.addColorStop(0, "rgba(99,102,241,0.6)");
            g.addColorStop(0.5, "rgba(99,102,241,0.15)");
            g.addColorStop(1, "rgba(99,102,241,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(gx, gy, 40, 0, Math.PI * 2);
            ctx.fill();
        });
    }, [clicks]);

    // Match canvas resolution to its actual rendered size
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            canvas.width = width;
            canvas.height = height;
        });
        ro.observe(canvas);
        return () => ro.disconnect();
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
                <h1 style={{ fontSize: 16, fontWeight: 500, color: "#e2e8f0" }}>Heatmap</h1>
                <p style={{ fontSize: 12, color: "#3d4466", marginTop: 3 }}>Click density by page</p>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
                <input
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && load(url)}
                    placeholder="Page path, e.g. /pricing"
                    style={{
                        flex: 1, background: "#0f1117", border: "0.5px solid #1e2130",
                        borderRadius: 6, padding: "8px 12px", fontSize: 12,
                        color: "#e2e8f0", outline: "none"
                    }}
                />
                <button
                    onClick={() => load(url)}
                    disabled={loading}
                    style={{
                        background: "#6366f1", border: "none", borderRadius: 6,
                        padding: "8px 18px", fontSize: 12, color: "#fff",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.6 : 1
                    }}
                >
                    {loading ? "Loading…" : "Load"}
                </button>
            </div>

            <div style={{ background: "#0f1117", border: "0.5px solid #1e2130", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: "10px 14px", borderBottom: "0.5px solid #1e2130", display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>{url}</p>
                    <p style={{ fontSize: 11, color: error ? "#f87171" : "#3d4466" }}>
                        {error ? "Failed to load" : `${clicks.length} clicks`}
                    </p>
                </div>

                <div style={{ position: "relative" }}>
                    <canvas
                        ref={canvasRef}
                        style={{ width: "100%", height: 400, display: "block" }}
                    />
                    {clicks.length === 0 && !loading && !error && (
                        <div style={{
                            position: "absolute", inset: 0, display: "flex",
                            alignItems: "center", justifyContent: "center",
                            color: "#3d4466", fontSize: 12, pointerEvents: "none"
                        }}>
                            No click data for this page
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}