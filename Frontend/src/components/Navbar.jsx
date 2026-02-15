
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (

    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left Side - Title */}
      <h1 className="text-4xl font-bold text-gray-800 ">
        QuickNote
      </h1>

      {/* Right Side - Button */}
      <Link  to={"/create"} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition">
        + New Note
      </Link>
    </nav>
  );
};

export default Navbar;
