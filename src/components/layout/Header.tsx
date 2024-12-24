"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="flex justify-between items-center py-4 px-4 md:px-7 lg:px-16 bg-gray-100 dark:bg-[#090909] shadow-md ">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
        MyLogo
      </div>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-300 dark:bg-gray-800"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
        <FaSun className="h-6 w-6 text-yellow-400" />
      ) : (
        <FaMoon className="h-6 w-6 text-gray-600" />
      )}
      </button>
    </header>
  );
};

export default Header;
