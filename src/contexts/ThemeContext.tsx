import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isVibeMode: boolean;
  toggleVibeMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVibeMode, setIsVibeMode] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem("vibe-mode");
    if (savedTheme !== null) {
      return savedTheme === "true";
    }
    // Default to false if not previously saved
    return false;
  });

  useEffect(() => {
    localStorage.setItem("vibe-mode", String(isVibeMode));
    
    // Toggle the class on the html element to apply CSS variables globally
    if (isVibeMode) {
      document.documentElement.classList.add("vibe-mode");
    } else {
      document.documentElement.classList.remove("vibe-mode");
    }
  }, [isVibeMode]);

  const toggleVibeMode = () => {
    setIsVibeMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isVibeMode, toggleVibeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
