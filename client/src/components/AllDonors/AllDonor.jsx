import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const FindDonor = () => {
  const bloodDonorsLoaderData = useLoaderData();
  const [bloodDonors, setBloodDonors] = useState(bloodDonorsLoaderData);
  const handleDelete = (_id) => {
    //console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed)
        fetch(`https://blood-donation-silk-five.vercel.app/bloodDonors/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Donor has been deleted.",
                icon: "success",
              });
              const remainingCards = bloodDonors.filter(
                (donor) => donor._id !== _id,
              );
              setBloodDonors(remainingCards);
            }
          });
    });
  };
  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-gradient-to-tr from-rose-100 via-white to-red-100 py-12 px-4 overflow-hidden">
      <div className="w-10/12 mx-auto">
        <div className="text-center pb-10">
          {/* Heading */}
          <h1 className="text-2xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-none mb-6 animate-fade-in-up ">
            Find
            <span className="relative inline-block text-red-600 ml-2">
              Blood Donation
              <span className="absolute bottom-1 left-0 w-full h-2 bg-red-100 -z-10 rounded-full"></span>
            </span>
            : {bloodDonors.length} Available
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-150">
            Connect blood donors with those in need. Our platform makes it easy
            to donate blood or find donors in your area with just a few clicks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {bloodDonors.map((donor, idx) => (
            <div
              className="card w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-md hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-200 hover:scale-[1.03] transition-all duration-300 ease-out animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
              key={donor._id}
            >
              <div className="card-body p-6 relative flex flex-col justify-between">
                {/* Blood Group Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center shadow-sm">
                  <span className="text-red-600 font-extrabold text-lg">
                    {donor.bloodGroup}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 pr-10">
                      {donor.name}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold">
                      Available Donor
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Details */}
                  <div className="space-y-2.5 text-sm text-gray-600">
                    <div className="flex items-center gap-2.5">
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="font-semibold">{donor.phone}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{donor.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="card-actions justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                  <Link to={`/updateDonor/${donor._id}`}>
                    <button className="btn btn-sm btn-primary text-white font-bold px-4 rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all duration-200">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(donor._id)}
                    className="btn btn-sm bg-red-600 hover:bg-red-800 text-white font-bold px-4 rounded-lg shadow-sm hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindDonor;
