import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import { FaBars, FaTimes, FaHeartbeat } from "react-icons/fa";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  const links = [
    { name: "Home", path: "/home" },
    { name: "All Donors", path: "/findDonor" },
    { name: "Search Donor", path: "/searchDonor" },
    { name: "Contact", path: "/contact" },
  ];

  const navLinks = (
    <>
      {links.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <li key={link.path}>
            <Link
              to={link.path}
              onClick={handleLinkClick}
              className={`font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-red-50 text-red-600 shadow-sm border border-red-100"
                  : "text-gray-600 hover:text-red-600 hover:bg-rose-50/50"
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <>
      {/* Stable Horizontal Navbar for Large Screens */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100/80 z-40 shadow-sm transition-all duration-300">
        <div className="navbar w-full lg:w-10/12 px-4 lg:px-0 mx-auto py-3">
          <div className="navbar-start">
            {/* Mobile Menu Icon (Drawer Trigger) */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="btn btn-ghost lg:hidden text-gray-700 hover:bg-gray-100 rounded-xl p-2 mr-2"
              aria-label="Open Navigation Menu"
            >
              <FaBars className="text-xl" />
            </button>
            <Link to="/home" className="flex items-center gap-2 group">
              <img
                className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300 border border-red-100"
                src={logo}
                alt="Logo"
              />
              <span className="font-extrabold text-lg sm:text-xl text-gray-900 tracking-tight hidden xs:block">
                Blood<span className="text-red-600">Donation</span>
              </span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1.5">{navLinks}</ul>
          </div>
          <div className="navbar-end">
            <a href="/findDonor">
              <button className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl shadow-md shadow-red-500/10 hover:shadow-red-500/25 hover:from-red-700 hover:to-rose-700 hover:scale-[1.03] active:scale-95 transition-all duration-300 ease-out flex items-center gap-1.5">
                <FaHeartbeat /> Get Started
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Drawer Sidebar for Mobile (Small Screens) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isSidebarOpen ? "visible" : "invisible"}`}
      >
        {/* Dark Backdrop Overlay */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        ></div>

        {/* Sliding Panel */}
        <div
          className={`absolute top-0 left-0 bottom-0 w-72 max-w-[80vw] bg-white shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            {/* Sidebar Top / Header */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <Link
                to="/home"
                onClick={handleLinkClick}
                className="flex items-center gap-2"
              >
                <img
                  className="w-[36px] h-[36px] rounded-lg shadow-sm border border-red-500/20"
                  src={logo}
                  alt="Logo"
                />
                <span className="font-extrabold text-base text-gray-900 tracking-tight">
                  Blood<span className="text-red-600">Donation</span>
                </span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label="Close Navigation Menu"
              >
                <FaTimes />
              </button>
            </div>

            {/* Sidebar Navigation Links */}
            <div className="py-6">
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={handleLinkClick}
                        className={`flex items-center font-bold px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-red-600 text-white shadow-lg shadow-red-500/10"
                            : "text-gray-700 hover:text-red-600 hover:bg-rose-50/50"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
