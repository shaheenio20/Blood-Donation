import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { Link } from "react-router-dom";
import { 
  FaTint, 
  FaCalendarCheck, 
  FaHandsHelping, 
  FaHourglassHalf, 
  FaCheckCircle,
  FaArrowRight,
  FaHeartbeat
} from "react-icons/fa";
import Swal from "sweetalert2";

const DashboardOverview = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [totalDonations, setTotalDonations] = useState(3);
  const [requestsSent, setRequestsSent] = useState(1);
  const [eligibilityDays, setEligibilityDays] = useState(0); // 0 means eligible now!

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Simulate reading donor availability and profile data from database
        fetch(`http://localhost:5000/bloodDonors?email=${currentUser.email}`)
          .then((res) => {
            if (res.ok) return res.json();
            return [];
          })
          .then((data) => {
            if (data && data.length > 0) {
              const donor = data[0];
              setIsAvailable(donor.availability !== "Unavailable");
              if (donor.bloodGroup) setBloodGroup(donor.bloodGroup);
            }
          })
          .catch((err) => console.log("Failed to load live availability stats:", err));
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAvailabilityToggle = async () => {
    if (!user) return;
    const newStatus = !isAvailable;
    
    // Optimistic toggle UI
    setIsAvailable(newStatus);

    try {
      // Simulate/perform patch update to db
      const response = await fetch(`http://localhost:5000/users`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          availability: newStatus ? "Available" : "Unavailable"
        })
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `You are now marked as ${newStatus ? "Available" : "Unavailable"}`,
        showConfirmButton: false,
        timer: 2000
      });
    } catch (error) {
      console.error("Availability toggle failed:", error);
      setIsAvailable(!newStatus); // Revert on failure
      Swal.fire({
        icon: "error",
        title: "Failed to update availability",
        text: "Could not connect to database server."
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="loading loading-spinner loading-md text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome Panel */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full blur-2xl transform translate-x-12"></div>
        <div className="relative z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-4 tracking-wide uppercase">
            <FaHeartbeat className="animate-pulse" /> Active Life Saver
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Hello, {user?.displayName || "Lifesaver"}!
          </h2>
          <p className="text-red-100 text-sm sm:text-base font-medium leading-relaxed">
            Your generous contributions have powered hope and saved up to <strong className="text-white underline underline-offset-4 decoration-2">{totalDonations * 3} lives</strong> in your local district. Keep up the phenomenal work!
          </p>
        </div>
      </div>

      {/* Grid Stats Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Blood Group */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Blood Type</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{bloodGroup}</h3>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 shadow-sm border border-red-100/50">
            <FaTint className="text-2xl" />
          </div>
        </div>

        {/* Total Donations */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Donations Made</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{totalDonations}</h3>
          </div>
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 shadow-sm border border-rose-100/50">
            <FaCalendarCheck className="text-2xl" />
          </div>
        </div>

        {/* Requests Open */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Blood Requests</p>
            <h3 className="text-3xl font-extrabold text-gray-900">{requestsSent}</h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shadow-sm border border-orange-100/50">
            <FaHandsHelping className="text-2xl" />
          </div>
        </div>

        {/* Eligibility Status */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Eligibility</p>
            <h3 className="text-lg font-extrabold text-green-600 flex items-center gap-1.5 mt-1">
              <FaCheckCircle className="text-xl" /> Eligible Now
            </h3>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shadow-sm border border-green-100/50">
            <FaHourglassHalf className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Availability Toggle Box */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-extrabold text-gray-800 text-lg">Donation Availability</h3>
            <p className="text-xs text-gray-500 leading-relaxed mt-1">
              Toggle this switch to let patients and local hospitals find you instantly in real-time blood requests searches.
            </p>
          </div>

          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-150">
            <span className="text-sm font-bold text-gray-700">
              {isAvailable ? "🔴 Available to Donate" : "⚪ Offline / Resting"}
            </span>
            <input 
              type="checkbox" 
              className="toggle toggle-error"
              checked={isAvailable}
              onChange={handleAvailabilityToggle}
            />
          </div>
        </div>

        {/* Quick Operations Portal */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm md:col-span-2 space-y-4">
          <h3 className="font-extrabold text-gray-800 text-lg">Donor Quick Panel</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link 
              to="/findDonor" 
              className="p-4 bg-gray-50 hover:bg-red-50/50 border border-gray-200 hover:border-red-200 rounded-xl transition-all duration-200 group text-left"
            >
              <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">Find a Donor</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-1">Search the complete listing of available community donors.</p>
              <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-red-600">
                Search Donors <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/donateBlood" 
              className="p-4 bg-gray-50 hover:bg-red-50/50 border border-gray-200 hover:border-red-200 rounded-xl transition-all duration-200 group text-left"
            >
              <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">Register as Donor</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-1">Add your details to the live blood donor registry database.</p>
              <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-red-600">
                Register Details <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link 
              to="/dashboard/profile" 
              className="p-4 bg-gray-50 hover:bg-red-50/50 border border-gray-200 hover:border-red-200 rounded-xl transition-all duration-200 group text-left"
            >
              <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">Edit Profile</h4>
              <p className="text-[10px] text-gray-500 leading-relaxed mt-1">Maintain and update your profile details and security.</p>
              <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-red-600">
                Open Profile <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
