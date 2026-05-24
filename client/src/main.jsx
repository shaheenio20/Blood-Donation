import "./index.css";
import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import MainLayout from "./components/Routes.jsx";
import Navbar from "./components/Shared/Navbar/Navbar.jsx";
import DonateBlood from "./components/DonateBlood/DonateBlood.jsx";
import FindDonor from "./components/AllDonors/AllDonor.jsx";
import UpdateDonor from "./components/UpdateDonor/UpdateDonor.jsx";
import SearchDonor from "./components/SearchDonor/SearchDonor.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Profile from "./components/Profile/Profile.jsx";
import DashboardLayout from "./components/Dashboard/DashboardLayout.jsx";
import DashboardOverview from "./components/Dashboard/DashboardOverview.jsx";
import DonationHistory from "./components/Dashboard/DonationHistory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
     
      {
        path: "/findDonor",
        element: <FindDonor></FindDonor>,
        loader: () =>
          fetch("http://localhost:5000/bloodDonors").then((res) => res.json()),
      },
      {
        path: "/searchDonor",
        element: <SearchDonor></SearchDonor>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "",
        element: <DashboardOverview></DashboardOverview>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "history",
        element: <DonationHistory></DonationHistory>,
      },
    ],
  },
  {
    path: "/donateBlood",
    element: <DonateBlood></DonateBlood>,
  },
  {
    path: "/updateDonor/:id",
    element: <UpdateDonor></UpdateDonor>,
    loader: ({ params }) =>
      fetch(`http://localhost:5000/bloodDonors/${params.id}`).then((res) =>
        res.json(),
      ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
