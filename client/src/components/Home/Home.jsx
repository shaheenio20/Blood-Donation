import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const cards = [
    {
      title: "Real-Time Matching",
      description:
        "Instantly connect with matching blood donors or requestors in your immediate geographical area with zero delays.",
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
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
      ),
      delay: "animation-delay-75",
    },
    {
      title: "Secure & Encrypted",
      description:
        "Your health records, donor status, and contact information are fully secured with industry-leading encryption protocols.",
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      delay: "animation-delay-150",
    },
    {
      title: "Compassionate Support",
      description:
        "Our dedicated care team is available 24/7 to guide you through donation drives, booking slots, or handling emergencies.",
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      delay: "animation-delay-200",
    },
    {
      title: "Impact Analytics",
      description:
        "Track exactly where and when your life-saving blood is processed, and read feedback on how you helped save lives.",
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"
          />
        </svg>
      ),
      delay: "animation-delay-300",
    },
    {
      title: "Smart Notifications",
      description:
        "Receive instant push and SMS notifications the moment a high-urgency blood request matching your group arises near you.",
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
      delay: "animation-delay-450",
    },
    {
      title: "Community Networks",
      description:
        "Join local donor communities, coordinate public blood drives, and collaborate with hospitals seamlessly.",
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      delay: "animation-delay-450",
    },
  ];
  return (
    <div className="bg-gradient-to-b from-rose-50 via-white to-white min-h-[calc(100vh-80px)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden flex items-center justify-center py-16 md:py-24 px-4">
        {/* Premium background decorative blur circles */}
        <div
          className="absolute top-1/4 left-10 w-72 h-72 bg-red-200/40 rounded-full blur-3xl animate-float"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-float"
          style={{ animationDuration: "12s", animationDelay: "1s" }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Sparkle badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-semibold mb-6 animate-fade-in shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Be a Hero, Save Lives
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-none mb-6 animate-fade-in-up">
            Save Lives Through{" "}
            <span className="relative inline-block text-red-600">
              Blood Donation
              <span className="absolute bottom-1 left-0 w-full h-2 bg-red-100 -z-10 rounded-full"></span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-150">
            Connect blood donors with those in need. Our platform makes it easy
            to donate blood or find donors in your area with just a few clicks.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-300 w-full max-w-md mx-auto sm:max-w-none">
            <Link
              to="/donateBlood"
              className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 ease-out animate-pulse-glow text-center"
            >
              Donate Now
            </Link>
            <Link
              to="/findDonor"
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold text-lg rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:scale-105 active:scale-95 transition-all duration-300 ease-out shadow-sm text-center"
            >
              See More
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose BDonor? Section */}
      <section
        id="why-choose-us"
        className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100/50"
      >
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-rose-50/70 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              Why Choose{" "}
              <span className="relative inline-block text-red-600">
                BDonor?
                <span className="absolute bottom-1 left-0 w-full h-1 bg-red-100 -z-10 rounded-full"></span>
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Our platform combines cutting-edge technology with compassionate
              care to make blood donation more accessible, secure, and impactful
              than ever before.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={`group bg-white/70 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 sm:p-8 hover:bg-white hover:border-red-200 hover:shadow-2xl hover:shadow-red-500/5 hover:-translate-y-2 transition-all duration-300 ease-out animate-fade-in-up ${card.delay}`}
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300 ease-out">
                  <span className="group-hover:text-white transition-colors duration-300">
                    {card.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
