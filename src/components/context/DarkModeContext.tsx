"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const DarkModeContext = createContext<{
  darkMode: boolean;
  toggleDarkMode: () => void;
} | null>(null);

// Context provider component
export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize dark mode state as null initially (since we can't check document on the server)
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev; // Toggle the current state
      // Add or remove the 'dark' class on the <html> tag based on the new state
      document.documentElement.classList.toggle("dark", newMode);
      return newMode; // Update the state
    });
  };

  // Sync the 'dark' class with the current state whenever `darkMode` changes
  useEffect(() => {
    // Make sure we only access the document in the browser (client side)
    if (typeof document !== "undefined") {
      setDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []); // This will run only once after the component mounts (client-side)

  // Skip rendering the provider if the dark mode state hasn't been determined yet
  if (darkMode === null) return null;

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook to use the dark mode context
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
