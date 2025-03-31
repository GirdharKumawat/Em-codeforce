import { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    const  isAuthenticated = localStorage.getItem("accessToken") === null ? false : true;
    if(isAuthenticated){
      navigate("/dashboard")
    }

  },[])
    


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log(API_URL+"/login/")
      const response = await fetch(API_URL+"/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.detail || "Invalid email or password");
        return;
      }

      // Store tokens & user data in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
      {error && <p className="text-red-500 text-center">{error}</p>}

        <h3 className="text-center text-2xl font-bold mb-4">Login</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md shadow-md hover:bg-gray-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-3 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-black underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
