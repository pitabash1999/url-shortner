import React from "react";
import { Link } from "react-router-dom";
import { useContextApi } from "../../store/ContextProvider";

const Navbar = () => {
  const { token, handleLogout, toggleTheme, theme } = useContextApi();

  return (
    <nav className="w-full absolute top-0 p-4 flex justify-between items-center bg-none ">
      <Link to="/">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          Shortner
        </div>
      </Link>

      {!token ? (
        <div className="space-x-4 flex items-center">
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌚" : "🌞"}
          </button>
          <Link to="/login">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 text-sm sm:text-base dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition duration-300 text-sm sm:text-base dark:bg-purple-600 dark:hover:bg-purple-700">
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-x-4 flex items-center">
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌚" : "🌞"}
          </button>

          <Link to="/">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition duration-300 text-sm sm:text-base dark:bg-red-600 dark:hover:bg-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
