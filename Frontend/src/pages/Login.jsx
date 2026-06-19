import { useState } from "react";

const field = {
    width: "100%",
    background: "#0f1117",
    border: "0.5px solid #1e2130",
    borderRadius: 7,
    padding: "10px 12px",
    fontSize: 13,
    color: "#e2e8f0",
    outline: "none",
    transition: "border .15s",
};

const FEATURES = [
    {
        title: "Session tracking",
        sub: "Monitor users in real time",
    },
    {
        title: "Click heatmaps",
        sub: "See where users click",
    },
    {
        title: "KPI dashboard",
        sub: "Sessions, clicks & events",
    },
    {
        title: "User journeys",
        sub: "Trace every page path",
    },
];

export default function Login({ onLogin, onCreateAccount }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return setError("Email and password are required.");
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                "https://user-analytics-app1.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token);

            onLogin(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                background: "#0b0d14",
            }}
        >
            {/* Left Panel */}
            <div
                style={{
                    width: 280,
                    background: "#0f1117",
                    borderRight: "0.5px solid #1e2130",
                    padding: "36px 28px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 50,
                    }}
                >
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: "#6366f1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2.2"
                        >
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                    </div>

                    <span
                        style={{
                            color: "#e2e8f0",
                            fontSize: 15,
                            fontWeight: 600,
                        }}
                    >
                        AnalyticsPro
                    </span>
                </div>

                {/* Features */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                    }}
                >
                    {FEATURES.map((item) => (
                        <div key={item.title}>
                            <p
                                style={{
                                    color: "#cbd5e1",
                                    fontSize: 13,
                                    marginBottom: 4,
                                }}
                            >
                                {item.title}
                            </p>

                            <p
                                style={{
                                    color: "#64748b",
                                    fontSize: 11,
                                }}
                            >
                                {item.sub}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: "auto" }}>
                    <p
                        style={{
                            color: "#334155",
                            fontSize: 10,
                        }}
                    >
                        © 2026 AnalyticsPro
                    </p>
                </div>
            </div>

            {/* Right Panel */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div style={{ width: 360 }}>
                    <h1
                        style={{
                            fontSize: 24,
                            color: "#e2e8f0",
                            marginBottom: 8,
                        }}
                    >
                        Sign in
                    </h1>

                    <p
                        style={{
                            color: "#64748b",
                            fontSize: 12,
                            marginBottom: 32,
                        }}
                    >
                        Enter your credentials to continue
                    </p>

                    <form
                        onSubmit={submit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        {/* Email */}
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: 6,
                                    fontSize: 11,
                                    color: "#64748b",
                                }}
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                style={field}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: 6,
                                    fontSize: 11,
                                    color: "#64748b",
                                }}
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={field}
                            />
                        </div>

                        {error && (
                            <p
                                style={{
                                    color: "#ef4444",
                                    fontSize: 12,
                                }}
                            >
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                border: "none",
                                borderRadius: 8,
                                background: "#6366f1",
                                color: "#fff",
                                padding: "12px",
                                cursor: "pointer",
                                fontSize: 13,
                                fontWeight: 500,
                            }}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            margin: "24px 0",
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                height: 1,
                                background: "#1e2130",
                            }}
                        />

                        <span
                            style={{
                                color: "#475569",
                                fontSize: 11,
                            }}
                        >
                            or
                        </span>

                        <div
                            style={{
                                flex: 1,
                                height: 1,
                                background: "#1e2130",
                            }}
                        />
                    </div>

                    {/* Register Link */}
                    <p
                        style={{
                            textAlign: "center",
                            fontSize: 12,
                            color: "#64748b",
                        }}
                    >
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={onCreateAccount}
                            style={{
                                border: "none",
                                background: "none",
                                color: "#6366f1",
                                cursor: "pointer",
                                padding: 0,
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        >
                            Create one
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}