import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const darkTheme = {
    bg: "#0B1120",
    surface: "#111827",
    card: "#1F2937",

    text: "#F8FAFC",
    subtext: "#94A3B8",
    muted: "#64748B",

    border: "#1E293B",
    borderHover: "#334155",

    primary: "#6366F1",
    primaryHover: "#4F46E5",

    success: "#22C55E",
    danger: "#EF4444",
    warning: "#F59E0B",

    sidebarBg: "#0F172A",
    sidebarText: "#CBD5E1",

    shadow: "0 8px 24px rgba(0,0,0,0.25)",
};

const lightTheme = {
    bg: "#F8FAFC",
    surface: "#FFFFFF",
    card: "#FFFFFF",

    text: "#0F172A",
    subtext: "#64748B",
    muted: "#94A3B8",

    border: "#E2E8F0",
    borderHover: "#CBD5E1",

    primary: "#6366F1",
    primaryHover: "#4F46E5",

    success: "#16A34A",
    danger: "#DC2626",
    warning: "#D97706",

    sidebarBg: "#FFFFFF",
    sidebarText: "#334155",

    shadow: "0 4px 20px rgba(15,23,42,0.08)",
};

export function ThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("theme") || "dark";
    });

    const theme =
        mode === "dark" ? darkTheme : lightTheme;

    const toggleTheme = () => {
        const next =
            mode === "dark" ? "light" : "dark";

        setMode(next);
        localStorage.setItem("theme", next);
    };

    useEffect(() => {
        document.body.style.background = theme.bg;
        document.body.style.color = theme.text;
        document.body.style.transition =
            "background 0.25s ease, color 0.25s ease";
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                mode,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}