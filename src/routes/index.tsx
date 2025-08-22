import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";

import About from "@/pages/About";
import Analytics from "@/pages/Admin/Analytics";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Bookings from "@/pages/User/Bookings";
import Verify from "@/pages/Verify";

import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Homepage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      { Component: Features, 
        path: "features" 
      },
      { Component: Contact, 
        path: "contact" 
      },
      { Component: FAQ, 
        path: "faq" 
      },
    ],
  },
    {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      {
      Component: Analytics,
      path: "analytics",
      },


    ],
  },
  {
    Component: DashboardLayout,
    path: "/user",
    children: [
      { 
        Component: Bookings,
        path: "bookings",
       },
      
    ],
  },
   {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
]);
