import { useState } from "react";

const field = {
    width: "100%", background: "#0f1117",
    border: "0.5px solid #1e2130", borderRadius: 7,
    padding: "10px 12px", fontSize: 13, color: "#e2e8f0",
    outline: "none", transition: "border .15s",
};

export default function Register({ onRegister, onBack }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) return setError("All fields are required.");
        if (password.length < 6) return setError("Password must be at least 6 characters.");
        setLoading(true);
        setError("");
        try {
            const res = await fetch("https://user-analytics-app1.onrender.com/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message ?? "Registration failed.");
            localStorage.setItem("token", data.token);
            onRegister(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh", background: "#0b0d14" }}>

            {/* Left panel */}
            <div style={{
                width: 260, flexShrink: 0, background: "#0f1117",
                borderRight: "0.5px solid #1e2130",
                display: "flex", flexDirection: "column", padding: "36px 28px",
            }}>
                {/* Brand */}
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 48 }}>
                    <div style={{
                        width: 26, height: 26, borderRadius: 7, background: "#6366f1",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#e2e8f0" }}>AnalyticsPro</span>
                </div>

                {/* Text */}
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.8 }}>
                    Create your account and start tracking user sessions, clicks, and journeys in minutes.
                </p>

                {/* Bullets */}
                <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                        "Real-time session tracking",
                        "Click heatmaps per page",
                        "Full user journey replay",
                        "KPI dashboard & trends",
                    ].map(t => (
                        <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                                width: 5, height: 5, borderRadius: "50%",
                                background: "#6366f1", flexShrink: 0,
                            }} />
                            <p style={{ fontSize: 12, color: "#64748b" }}>{t}</p>
                        </div>
                    ))}
                </div>

                <p style={{ marginTop: "auto", fontSize: 10, color: "#2d3148" }}>
                    © 2026 AnalyticsPro
                </p>
            </div>

            {/* Right: form */}
            <div style={{
                flex: 1, display: "flex", alignItems: "center",
                justifyContent: "center", background: "#0b0d14",
            }}>
                <div style={{ width: 340 }}>
                    <h1 style={{ fontSize: 20, fontWeight: 500, color: "#e2e8f0", marginBottom: 6 }}>
                        Create account
                    </h1>
                    <p style={{ fontSize: 12, color: "#3d4466", marginBottom: 32 }}>
                        Fill in the details below to get started
                    </p>

                    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                        {/* Name */}
                        <div>
                            <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 6 }}>
                                Full name
                            </label>
                            <input
                                type="text" value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Arjun Kapoor"
                                autoComplete="name" style={field}
                                onFocus={e => e.target.style.borderColor = "#6366f1"}
                                onBlur={e => e.target.style.borderColor = "#1e2130"}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 6 }}>
                                Email
                            </label>
                            <input
                                type="email" value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                autoComplete="email" style={field}
                                onFocus={e => e.target.style.borderColor = "#6366f1"}
                                onBlur={e => e.target.style.borderColor = "#1e2130"}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: "block", fontSize: 11, color: "#64748b", marginBottom: 6 }}>
                                Password
                            </label>
                            <input
                                type="password" value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Min. 6 characters"
                                autoComplete="new-password" style={field}
                                onFocus={e => e.target.style.borderColor = "#6366f1"}
                                onBlur={e => e.target.style.borderColor = "#1e2130"}
                            />
                        </div>

                        {error && (
                            <p style={{ fontSize: 12, color: "#f87171", marginTop: -6 }}>{error}</p>
                        )}

                        <button type="submit" disabled={loading} style={{
                            width: "100%", background: loading ? "#4338ca" : "#6366f1",
                            border: "none", borderRadius: 7, padding: "11px",
                            fontSize: 13, fontWeight: 500, color: "#fff",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "background .15s", marginTop: 4,
                        }}>
                            {loading ? "Creating account…" : "Create account"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px 0" }}>
                        <div style={{ flex: 1, height: "0.5px", background: "#1e2130" }} />
                        <span style={{ fontSize: 11, color: "#3d4466" }}>or</span>
                        <div style={{ flex: 1, height: "0.5px", background: "#1e2130" }} />
                    </div>

                    {/* Back to login */}
                    <p style={{ fontSize: 12, color: "#3d4466", textAlign: "center" }}>
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={onBack}
                            style={{
                                fontSize: 12, color: "#6366f1", background: "none",
                                border: "none", cursor: "pointer", padding: 0,
                            }}
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}