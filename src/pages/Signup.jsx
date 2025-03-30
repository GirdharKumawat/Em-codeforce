import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for redirection

const Signup = () => {

  useEffect(()=>{
      const  isAuthenticated = localStorage.getItem("accessToken") === null ? false : true;
      if(isAuthenticated){
        navigate("/dashboard")
      }
  
    },[])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "candidate", // Default role
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Navigation hook
  API_URL = import.meta.env.VITE_API_URL; // API URL from environment variables
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL+"/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          password: formData.password,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        if (data) {
          const errorMessages = Object.values(data).flat().join(" ");
          setError(errorMessages);
        } else {
          throw new Error("Signup failed!");
        }
        return;
      }

      // Store user info & tokens in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("accessToken", data.access);

      setSuccess("Signup successful!");
      setFormData({ name: "", email: "", phone: "", role: "candidate", password: "", confirmPassword: "" });

      // Redirect to "Thank You" page after 2 seconds
      
        navigate("/thanks");
       
    } catch (err) {
      setError(err.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
      {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}

        <h3 className="text-center text-2xl font-bold mb-4">Sign Up</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
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
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-black underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
