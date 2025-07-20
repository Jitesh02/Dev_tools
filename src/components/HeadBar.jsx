import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Sun, Moon, ChevronDown } from "lucide-react";

const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark");
    };

    // Shared class generator
    const getNavClass = ({ isActive }) =>
        `transition font-medium text-sm ${isActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-700 dark:text-gray-100 hover:text-blue-500"
        }`;

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/70 dark:bg-gray-900/80 backdrop-blur shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    🧰 DevTools
                </NavLink>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    <NavLink to="/" className={getNavClass}>
                        🎨 Color Picker
                    </NavLink>
                    <NavLink to="/picker" className={getNavClass}>
                        🖼️ Image Picker
                    </NavLink>

                    {/* Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className={`flex items-center gap-1 transition font-medium text-sm ${location.pathname.startsWith("/json") ||
                                    location.pathname.startsWith("/xml") ||
                                    location.pathname.startsWith("/code") ||
                                    location.pathname.startsWith("/text")
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-700 dark:text-gray-100 hover:text-blue-500"
                                }`}
                        >
                            🧩 Formatters <ChevronDown className="w-4 h-4" />
                        </button>
{showDropdown && (
  <div
    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg"
    onMouseLeave={() => setShowDropdown(false)}
  >
    <NavLink to="/json" className={getNavClass} onClick={() => setShowDropdown(false)}>
      <div className="block px-4 py-2">JSON Formatter</div>
    </NavLink>
    <NavLink to="/xml" className={getNavClass} onClick={() => setShowDropdown(false)}>
      <div className="block px-4 py-2">XML Formatter</div>
    </NavLink>
    <NavLink to="/code" className={getNavClass} onClick={() => setShowDropdown(false)}>
      <div className="block px-4 py-2">Code Formatter</div>
    </NavLink>
    <NavLink to="/text" className={getNavClass} onClick={() => setShowDropdown(false)}>
      <div className="block px-4 py-2">Text Formatter</div>
    </NavLink>
  </div>
)}
                    </div>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
                        title="Toggle theme"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
