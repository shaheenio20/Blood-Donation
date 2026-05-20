import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
const DonateBlood = () => {
  const handleDonate = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const phone = form.phone.value;
    const bloodGroup = form.bloodGroup.value;
    const location = form.location.value;

    const bloodDonor = {
      name,
      phone,
      bloodGroup,
      location,
    };

    fetch("http://localhost:5000/bloodDonors", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bloodDonor),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Blood donor registered successfully!",
            icon: "success",
            draggable: true,
          });

          form.reset();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-tr from-rose-50 via-white to-red-50 py-12 px-4 overflow-hidden">
      {/* Background Blobs */}
      <div
        className="absolute bottom-10 left-1/4 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="absolute top-10 right-1/4 w-60 h-60 bg-red-200/30 rounded-full blur-3xl animate-float"></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 shadow-2xl rounded-2xl p-8 md:p-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Donate Blood
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Help save lives by donating blood
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleDonate}>
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm font-semibold text-gray-700">
                  Full Name
                </span>
              </label>

              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition-all duration-200 bg-white"
                required
              />
            </div>

            {/* Blood Group */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm font-semibold text-gray-700">
                  Blood Group
                </span>
              </label>

              <select
                name="bloodGroup"
                defaultValue=""
                required
                className="select select-secondary w-full"
              >
                <option value="" disabled>
                  Select your blood group
                </option>

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

            {/* Phone */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm font-semibold text-gray-700">
                  Phone Number
                </span>
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="123-456-7890"
                className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition-all duration-200 bg-white"
                required
              />
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="text-sm font-semibold text-gray-700">
                  Location
                </span>
              </label>

              <input
                type="text"
                name="location"
                placeholder="Enter your location"
                className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition-all duration-200 bg-white"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Register"
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200 ease-out animate-pulse-glow"
              />
            </div>
            <div className="py-2">
              <Link
                to="/home"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Back to Home <FaArrowRight className="inline ml-1" />
                <hr />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonateBlood;
