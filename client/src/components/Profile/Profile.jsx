import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import auth from "../firebase/firebase.config";
import { onAuthStateChanged, updateProfile, updateEmail, updatePassword } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      // 1. Update Firebase Auth Profile (DisplayName)
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      }

      // 2. Update Firebase Auth Email if changed
      if (email !== user.email) {
        await updateEmail(user, email);
      }

      // 3. Update Firebase Auth Password if provided
      if (password) {
        await updatePassword(user, password);
      }

      // 4. Update profiles DB (backend)
      const profileUpdate = { name, email, password };
      const response = await fetch("https://blood-donation-silk-five.vercel.app/profiles", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(profileUpdate)
      });
      const data = await response.json();

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully!',
        timer: 1500,
        showConfirmButton: false
      });
      setPassword("");
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: 'error',
        title: 'Profile Update Failed',
        text: error.message || 'There was an error updating your profile. Please try again.',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
        <span className="loading loading-ring loading-lg text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-tr from-rose-50 via-white to-red-50 py-12 px-4 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div
        className="absolute bottom-10 left-1/4 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div className="absolute top-10 right-1/4 w-60 h-60 bg-red-200/30 rounded-full blur-3xl animate-float"></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Card wrapper with premium border-gradient and backdrop blur effect */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 shadow-2xl rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Your Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Manage and update your personal details
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleProfileUpdate}>
            <div className="form-control">
              <label className="label">
                <span className="text-sm font-semibold text-gray-700">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition-all duration-200 bg-white text-gray-800"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-sm font-semibold text-gray-700">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition-all duration-200 bg-white text-gray-800"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="text-sm font-semibold text-gray-700">
                  New Password (leave blank to keep current)
                </span>
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition-all duration-200 bg-white text-gray-800"
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200 ease-out animate-pulse-glow"
              >
                Save Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
