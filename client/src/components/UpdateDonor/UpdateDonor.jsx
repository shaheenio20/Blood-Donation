import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateDonor = () => {
    const bloodDonor = useLoaderData();
    const {_id, name, phone, bloodGroup, location} = bloodDonor;
    const handleUpdate = (e) => {
        e.preventDefault();

        const form = e.target;  
        const name = form.name.value;
        const phone = form.phone.value;
        const bloodGroup = form.bloodGroup.value;
        const location = form.location.value;
        const updatedDonor = {
            name,
            phone,  
            bloodGroup,
            location
        }
        fetch(`https://blood-donation-silk-five.vercel.app/bloodDonors/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDonor)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: "Donor information updated successfully!",
                    icon: "success",    
                    draggable: true,
                });
                form.reset();
            }
        })
        .catch(error => {
            console.error("Error updating donor:", error);
            
        });
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
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
             Update Donor Information
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Help save lives by donating blood
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleUpdate}>
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
                defaultValue={name}
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
                defaultValue={phone}
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
                defaultValue={location}
                placeholder="Enter your location"
                className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition-all duration-200 bg-white"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Update Donor"
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200 ease-out animate-pulse-glow"
              />
            </div>
            <div className="py-4">
               <Link
                to="/searchDonor"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Search Donor <FaArrowRight className="inline ml-1" />
                <hr />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDonor;
