import React, { useState, useEffect } from "react";
import { FaTint, FaPlus, FaCheckCircle, FaHospital, FaCalendarAlt, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const DonationHistory = () => {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newHospital, setNewHospital] = useState("");
  const [newBags, setNewBags] = useState(1);

  // 1. Fetch user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch logged donations matching user's email from MongoDB
  const fetchDonations = (email) => {
    setLoading(true);
    fetch(`https://blood-donation-silk-five.vercel.app/bloodDonors?email=${email}`)
      .then((res) => {
        if (res.ok) return res.json();
        return [];
      })
      .then((data) => {
        // Map backend bloodDonor records to history logs
        const logs = data.map((d, index) => ({
          id: d._id || index,
          date: d.date || "Unknown Date",
          hospital: d.location || "Community Blood Camp",
          bags: d.bags || 1,
          status: d.status || "Completed",
        }));
        setDonations(logs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load donation logs:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetchDonations(user.email);
    }
  }, [user]);

  const handleAddDonation = (e) => {
    e.preventDefault();
    if (!newDate || !newHospital) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please provide both the donation date and location.",
      });
      return;
    }

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "Please log in to register blood donations.",
      });
      return;
    }

    const bloodDonorRecord = {
      name: user.displayName || "Lifesaver",
      email: user.email,
      phone: "Logged Donation",
      bloodGroup: "O+", // Fallback or read from donor db if needed
      location: newHospital,
      date: newDate,
      bags: Number(newBags),
      status: "Completed",
    };

    fetch("https://blood-donation-silk-five.vercel.app/bloodDonors", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bloodDonorRecord),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Donation Logged!",
            text: "Thank you for logging your blood contribution.",
            timer: 2000,
            showConfirmButton: false,
          });

          // Refresh listing from MongoDB
          fetchDonations(user.email);
          setIsModalOpen(false);

          // Reset inputs
          setNewDate("");
          setNewHospital("");
          setNewBags(1);
        }
      })
      .catch((err) => {
        console.error("Failed to log blood donation:", err);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Could not write to server database. Please try again.",
        });
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <span className="loading loading-ring loading-lg text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Donation History
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Keep track of your historical blood contributions and logs.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl text-xs shadow-md shadow-red-500/10 hover:shadow-red-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-95 shrink-0"
        >
          <FaPlus /> Log New Donation
        </button>
      </div>

      {/* History Cards & Timelines */}
      <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm">
        {donations.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 border border-red-100/50">
              <FaTint className="text-2xl" />
            </div>
            <h3 className="font-extrabold text-gray-800 text-base">No donations logged yet</h3>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              Whenever you donate blood, log it here to keep your eligibility timer accurate!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100/55 flex items-center justify-center text-red-600 mt-0.5 shrink-0">
                    <FaTint />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base flex items-center gap-2">
                      <FaHospital className="text-gray-400 text-xs" /> {donation.hospital}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt /> {donation.date}
                      </span>
                      <span>•</span>
                      <span>Logged quantity: {donation.bags} bag{donation.bags > 1 ? "s" : ""}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-150">
                    <FaCheckCircle className="text-sm" /> {donation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Log Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          ></div>

          {/* Modal Container */}
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden animate-fade-in-up border border-gray-100">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-red-600 to-rose-600 text-white">
              <div>
                <h3 className="font-extrabold text-lg">Log New Blood Donation</h3>
                <p className="text-[10px] text-red-100">Help keep your eligibility dates updated</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddDonation} className="p-6 space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="text-xs font-bold text-gray-700">Donation Date</span>
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition bg-white text-gray-800"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="text-xs font-bold text-gray-700">Hospital / Blood Camp Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Red Cross Donation Center"
                  value={newHospital}
                  onChange={(e) => setNewHospital(e.target.value)}
                  className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition bg-white text-gray-800"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="text-xs font-bold text-gray-700">Bags Contributed</span>
                </label>
                <select
                  value={newBags}
                  onChange={(e) => setNewBags(e.target.value)}
                  className="select select-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition bg-white text-gray-800"
                >
                  <option value={1}>1 Bag (approx. 470ml)</option>
                  <option value={2}>2 Bags</option>
                  <option value={3}>3 Bags</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-xs font-bold bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-600 rounded-xl border border-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs font-bold bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl shadow-md shadow-red-500/10 transition hover:scale-[1.02] active:scale-95"
                >
                  Submit Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
