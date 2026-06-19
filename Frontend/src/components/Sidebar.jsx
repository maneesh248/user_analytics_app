const NAV = [
    {
        section: "Overview", items: [
            { id: "dashboard", label: "Dashboard", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
            { id: "sessions", label: "Sessions", icon: "M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" },
        ]
    },
    {
        section: "Analysis", items: [
            { id: "heatmap", label: "Heatmap", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" },
            { id: "funnels", label: "Funnels", icon: "M3 4h18l-7 9v5l-4 2v-7z" },
        ]
    },
];

function Icon({ d }) {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={d} />
        </svg>
    );
}

export default function Sidebar({ active, onChange }) {
    return (
        <aside style={{
            width: 176, borderRight: "0.5px solid #1e2130",
            background: "#0b0d14", display: "flex", flexDirection: "column",
            padding: "12px 0", flexShrink: 0
        }}>
            {NAV.map(({ section, items }) => (
                <div key={section}>
                    <p style={{
                        fontSize: 10, color: "#2d3148", letterSpacing: "0.07em",
                        textTransform: "uppercase", padding: "12px 16px 4px"
                    }}>
                        {section}
                    </p>
                    {items.map(({ id, label, icon }) => (
                        <button
                            key={id}
                            onClick={() => onChange(id)}
                            style={{
                                display: "flex", alignItems: "center", gap: 8,
                                width: "100%", padding: "7px 16px", border: "none",
                                background: active === id ? "#13152a" : "transparent",
                                color: active === id ? "#c7d2fe" : "#64748b",
                                fontSize: 12, cursor: "pointer", textAlign: "left",
                                borderLeft: active === id ? "2px solid #6366f1" : "2px solid transparent",
                                transition: "all 0.12s"
                            }}
                        >
                            <Icon d={icon} />
                            {label}
                        </button>
                    ))}
                </div>
            ))}
        </aside>
    );
}