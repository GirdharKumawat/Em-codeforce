import { useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // Toggle for mobile view
  const navigate = useNavigate(); // For navigation
  return (
    <aside className={`h-screen bg-white shadow-md fixed md:relative transition-all duration-300 ${isOpen ? "w-64" : "w-20"} p-4`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-bold text-black">ExpertMatch</span>
        {/* Toggle Button (Visible in Mobile) */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "🔽" : "🔼"}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-2">
          <SidebarLink to="/dashboard" icon="📊" label="Dashboard" active={location.pathname === "/dashboard"} />
          <SidebarLink to="/dashboard/candidates" icon="👤" label="Candidates" active={location.pathname === "/dashboard/candidates"} />
          <SidebarLink to="/dashboard/experts" icon="🧠" label="Experts" active={location.pathname === "/dashboard/experts"} />
          {/* <SidebarLink to="/dashboard/profile" icon="⚙️" label="Profile" active={location.pathname === "/dashboard/profile"} /> */}
          <li>
            <button
              className="flex items-center w-full text-left p-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                navigate("/login");
                console.log("User logged out");
              }}
            >
              <span className="mr-3">🚪</span>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// SidebarLink Component for reusability
const SidebarLink = ({ to, icon, label, active }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center p-3 rounded-lg transition-colors ${active ? "bg-gray-200 text-black" : "text-gray-700 hover:bg-gray-100"}`}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </Link>
    </li>
  );
};

export default Sidebar;
