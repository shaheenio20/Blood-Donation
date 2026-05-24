import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaSearch, FaMapMarkerAlt, FaPhoneAlt, FaTrashAlt, FaEdit, FaUndo, FaHeartbeat } from "react-icons/fa";

const SearchDonor = () => {
  const [bloodDonors, setBloodDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bloodGroup, setBloodGroup] = useState("All");
  const [location, setLocation] = useState("");

  const fetchDonors = (bg = "All", loc = "") => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (bg && bg !== "All") queryParams.append("bloodGroup", bg);
    if (loc && loc.trim() !== "") queryParams.append("location", loc.trim());

    fetch(`https://blood-donation-silk-five.vercel.app/bloodDonors?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setBloodDonors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donors:", err);
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch blood donors.",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      });
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDonors(bloodGroup, location);
  };

  const handleReset = () => {
    setBloodGroup("All");
    setLocation("");
    fetchDonors("All", "");
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://blood-donation-silk-five.vercel.app/bloodDonors/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Donor has been successfully removed.",
                icon: "success",
                confirmButtonColor: "#dc2626",
              });
              setBloodDonors(bloodDonors.filter((donor) => donor._id !== _id));
            }
          })
          .catch((err) => {
            console.error("Error deleting donor:", err);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the donor.",
              icon: "error",
              confirmButtonColor: "#dc2626",
            });
          });
      }
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-gradient-to-tr from-rose-100 via-white to-red-100 py-12 px-4 overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-200/40 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "2s" }}></div>

      <div className="w-full max-w-6xl mx-auto z-10 relative">
        {/* Title / Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-none mb-4">
            Search
            <span className="relative inline-block text-red-600 ml-2 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Blood Donor
              <span className="absolute bottom-1 left-0 w-full h-1 bg-red-200 rounded-full"></span>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Search our comprehensive database to locate blood donors in your community. Every second counts!
          </p>
        </div>

        {/* Premium Search Form Box */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 shadow-2xl rounded-2xl p-6 md:p-8 mb-10 transition-all duration-300 hover:shadow-red-500/5">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
            {/* Blood Group Select */}
            <div className="form-control md:col-span-4">
              <label className="label pb-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <FaHeartbeat className="text-red-500" /> Blood Group
                </span>
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="select select-bordered select-md w-full bg-white text-gray-700 border-gray-200 focus:border-red-500 rounded-xl font-medium shadow-sm transition-all duration-200 focus:ring focus:ring-red-100"
              >
                <option value="All">All Blood Groups</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Location Input */}
            <div className="form-control md:col-span-5">
              <label className="label pb-2">
                <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-red-500" /> Location
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter city, district, or area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input input-bordered w-full pl-10 pr-4 py-2.5 rounded-xl border-gray-200 bg-white text-gray-700 focus:border-red-500 transition-all duration-200 shadow-sm focus:ring focus:ring-red-100"
                />
                <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Actions (Search and Reset Buttons) */}
            <div className="md:col-span-3 flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaSearch /> Search
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200"
                title="Reset Filters"
              >
                <FaUndo /> Reset
              </button>
            </div>
          </form>
        </div>

        {/* Results Count Summary */}
        <div className="flex justify-between items-center mb-6 px-2">
          <h2 className="text-lg font-bold text-gray-800">
            {loading ? "Searching..." : `Found ${bloodDonors.length} Available Donors`}
          </h2>
          <span className="h-1 flex-1 bg-gradient-to-r from-red-200 to-transparent ml-4 rounded-full hidden sm:block"></span>
        </div>

        {/* Loader State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((skeletonIdx) => (
              <div key={skeletonIdx} className="bg-white/60 border border-gray-100 rounded-2xl p-6 h-56 animate-pulse flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </div>
                <div className="h-8 w-24 bg-gray-200 rounded self-end"></div>
              </div>
            ))}
          </div>
        ) : bloodDonors.length > 0 ? (
          /* Results Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {bloodDonors.map((donor, idx) => (
              <div
                className="card w-full bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-md hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-200 hover:scale-[1.02] transition-all duration-300 ease-out"
                key={donor._id}
              >
                <div className="card-body p-6 relative flex flex-col justify-between">
                  {/* Blood Group Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shadow-md animate-pulse">
                    <span className="text-red-600 font-extrabold text-lg">
                      {donor.bloodGroup}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Name & Availability */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 pr-12 truncate">
                        {donor.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold">
                        Available Now
                      </span>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Details Info */}
                    <div className="space-y-2.5 text-sm text-gray-600">
                      <div className="flex items-center gap-2.5">
                        <FaPhoneAlt className="text-red-500" />
                        <a href={`tel:${donor.phone}`} className="font-semibold hover:text-red-600 transition-colors">
                          {donor.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="truncate">{donor.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="card-actions justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                    <Link to={`/updateDonor/${donor._id}`}>
                      <button className="btn btn-sm bg-indigo-50 border-indigo-100 hover:bg-indigo-100 text-indigo-700 font-bold px-3.5 rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5">
                        <FaEdit size={12} /> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(donor._id)}
                      className="btn btn-sm bg-rose-50 border-rose-100 hover:bg-rose-100 text-rose-700 font-bold px-3.5 rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5"
                    >
                      <FaTrashAlt size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Polished Empty State */
          <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl p-10 text-center max-w-lg mx-auto mb-12">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 text-red-500">
              <FaHeartbeat size={32} className="animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching Donors Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any blood donors matching your exact criteria. Consider expanding your search or registering yourself to save a life!
            </p>
            <Link to="/donateBlood">
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/30 hover:scale-105 active:scale-95 transition-all duration-200">
                Become a Donor
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDonor;

