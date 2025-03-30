import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import Home from "./Home";


function DashBord() {
  return (
    <div className="dashboard-container h-screen flex">
      {/* Sidebar with fixed width (w-64 = 16rem) */}
      <div className="w-64 bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main content (remaining space) */}
      <div className="flex-1  overflow-auto ">
        <Outlet />
      </div>
    </div>
  );
}

export default DashBord;
