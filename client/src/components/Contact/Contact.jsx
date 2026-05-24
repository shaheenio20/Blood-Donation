import React from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaHouseLock } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import Swal from "sweetalert2";
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const district = form.district.value;
    const phone = form.phone.value;
    const message = form.message.value;
    const contact = { name, email, district, phone, message };
    fetch("https://blood-donation-silk-five.vercel.app/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Message inserted successfully!",
            icon: "success",
            draggable: true,
          });
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };
  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-gradient-to-tr from-rose-100 via-white to-red-100 py-12 overflow-hidden">
      <div className="w-9/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 justify-center items-center">
          <div className="w-72 lg:w-full text-center">
            <div className="text-start">
              <h1 className="text-3xl lg:text-6xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-gray-600">
                We are committed to processing the information in order to
                contact you and talk about your project.
              </p>
            </div>
            <div className="flex items-center justify-start mt-6">
              <MdOutlineMail className="text-orange-600" />
              <span className="ml-2 text-gray-700">contact@bloodbank.com</span>
            </div>
            <div className="flex items-center justify-start mt-6">
              <FaHouseLock className="text-orange-600" />
              <span className="ml-2 text-gray-700">
                26 Polashi, Zindabazar Sylhet
              </span>
            </div>
            <div className="flex items-center justify-start mt-6">
              <FaPhoneVolume className="text-orange-600" />
              <span className="ml-2 text-gray-700">(+880)1823673869</span>
            </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name:</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Message"
                  className="textarea textarea-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700 text-white font-bold"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
