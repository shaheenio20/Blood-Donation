import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.config";
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    //console.log(email, password);
    const user = { email, password };
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
        
        // Show success alert and redirect to Home/Navbar page
        Swal.fire({
          title: "User logged in successfully!",
          icon: "success",
          draggable: true,
        }).then(() => {
          navigate("/home"); // Go to home route (containing the Navbar)
        });
        
        form.reset();

        // Perform backend update in the background (will not block the user if missing)
        fetch("https://blood-donation-silk-five.vercel.app/users", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        }).catch((err) => console.log("Backend patch ignored:", err));
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-tr from-rose-50 via-white to-red-50 py-12 px-4 overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-1/4 w-60 h-60 bg-red-200/30 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-10 right-1/4 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Card wrapper with premium border-gradient and backdrop blur effect */}
        <div className="bg-white/80 backdrop-blur-md border border-white/60 shadow-2xl rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to sign in
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="text-sm font-semibold text-gray-700">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition-all duration-200 bg-white"
                required
              />
            </div>

            <div className="form-control">
              <div className="flex justify-between items-center mb-1">
                <label className="label p-0">
                  <span className="text-sm font-semibold text-gray-700">
                    Password
                  </span>
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline transition"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                name="password"
                className="input input-bordered w-full px-4 py-3 rounded-xl border-gray-200 focus:border-red-500 focus:ring focus:ring-red-100 transition-all duration-200 bg-white"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-200 ease-out shadow-sm"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/60"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/90 px-3 text-gray-400 font-semibold tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200/80 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 ease-out shadow-sm bg-white"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          {/* Registration Redirect */}
          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-red-600 hover:text-red-700 hover:underline transition"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
