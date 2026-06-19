export default function Topbar({ user, onLogout }) {
    const initials =
        user?.name
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    return (
        <header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                height: 60,
                borderBottom: "0.5px solid #1e2130",
                background: "#0f1117",
                flexShrink: 0,
            }}
        >
            {/* Logo */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
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
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <path d="M3 3v18h18" />
                        <path d="M7 16l4-4 4 4 4-7" />
                    </svg>
                </div>

                <span
                    style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#e2e8f0",
                    }}
                >
                    AnalyticsPro
                </span>
            </div>

            {/* Right Side */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                }}
            >
                {/* User Info */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "#6366f1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontSize: 12,
                            fontWeight: 700,
                        }}
                    >
                        {initials}
                    </div>

                    <div>
                        <div
                            style={{
                                color: "#e2e8f0",
                                fontSize: 13,
                                fontWeight: 500,
                                lineHeight: 1.2,
                            }}
                        >
                            {user?.name || "User"}
                        </div>

                        <div
                            style={{
                                color: "#64748b",
                                fontSize: 11,
                                lineHeight: 1.2,
                            }}
                        >
                            {user?.email || ""}
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={onLogout}
                    style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "8px 14px",
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}