import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import logo from "../../assets/logo.jpg";
import { 
  FaHome, 
  FaUser, 
  FaHistory, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes, 
  FaChartPie, 
  FaTint,
  FaHeartbeat
} from "react-icons/fa";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Not authenticated, redirect to login
        navigate("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          title: "Logged out successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const menuItems = [
    { 
      name: "Overview", 
      path: "/dashboard", 
      icon: <FaChartPie className="text-lg" />,
      exact: true 
    },
    { 
      name: "My Profile", 
      path: "/dashboard/profile", 
      icon: <FaUser className="text-lg" />,
      exact: false 
    },
    { 
      name: "Donation History", 
      path: "/dashboard/history", 
      icon: <FaHistory className="text-lg" />,
      exact: false 
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-ring loading-lg text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200/80 shrink-0">
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-gray-150 flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg shadow-sm" />
          <span className="font-extrabold text-lg text-gray-900 tracking-tight">
            Donor<span className="text-red-600">Portal</span>
          </span>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.path 
              : location.pathname.startsWith(item.path) && location.pathname !== "/dashboard";
            
            // Adjust for exact root dashboard path check
            const highlight = item.exact 
              ? location.pathname === "/dashboard" 
              : location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  highlight
                    ? "bg-red-50 text-red-600 shadow-sm border border-red-100/50"
                    : "text-gray-600 hover:text-red-600 hover:bg-rose-50/40"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer User Card */}
        {user && (
          <div className="p-4 border-t border-gray-150/80 bg-gray-50/50">
            <div className="flex items-center gap-3 p-2 rounded-xl">
              <img
                src={user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-red-200"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-800 truncate">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-100"
            >
              <FaSignOutAlt />
              Logout Account
            </button>
          </div>
        )}
      </aside>

      {/* Sidebar - Mobile Drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isSidebarOpen ? "visible" : "invisible"}`}>
        {/* Backdrop overlay */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        ></div>

        {/* Drawer Sliding Body */}
        <aside
          className={`absolute top-0 left-0 bottom-0 w-72 max-w-[80vw] bg-white shadow-2xl flex flex-col p-6 transition-transform duration-300 ease-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg shadow-sm" />
              <span className="font-extrabold text-base text-gray-900 tracking-tight">
                Donor<span className="text-red-600">Portal</span>
              </span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 py-6 space-y-1.5">
            {menuItems.map((item) => {
              const highlight = item.exact 
                ? location.pathname === "/dashboard" 
                : location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    highlight
                      ? "bg-red-600 text-white shadow-lg shadow-red-500/10"
                      : "text-gray-700 hover:text-red-600 hover:bg-rose-50/50"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          {user && (
            <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email}`}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border border-red-200"
                />
                <div className="overflow-hidden">
                  <p className="font-bold text-gray-800 text-sm truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-gray-500 text-xs truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors border border-red-100 text-center"
              >
                Logout
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Workspace Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200/80 flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-red-600 p-2 rounded-xl hover:bg-gray-100"
            >
              <FaBars className="text-xl" />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-md font-bold text-gray-800">
                Dashboard Workspace
              </h1>
              <p className="text-[10px] text-gray-500 font-medium">
                Welcome back to your lifesaver hub!
              </p>
            </div>
          </div>

          {/* Quick navigation actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-red-600 border border-gray-200/80 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              <FaHome /> Public Website
            </Link>

            {user && (
              <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
                <img
                  src={user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.email}`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-red-100"
                />
                <span className="text-xs font-bold text-gray-700 hidden md:block">
                  {user.displayName || "User"}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Nested Content Page container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
