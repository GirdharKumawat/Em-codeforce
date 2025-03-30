import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "candidate",
    file: null,
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFormData({ ...formData, file: selectedFile });
      setUploadMessage("");
    } else {
      setUploadMessage("Invalid file format. Only PDF and DOCX are allowed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setUploadMessage("Please select a file before submitting.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("role", formData.role);
    submissionData.append("password", "12345678"); // Default password
    submissionData.append("resume", formData.file);

    setUploading(true);
    setUploadMessage("Uploading...");

    try {
      const response = await fetch(API_URL+"/adduser/", {
        method: "POST",
        body: submissionData,
      });
       let res = await response.json();
      if (response.ok) {
        setUploadMessage("User registered successfully! ✅");
        setFormData({
          name: "",
          email: "",
          phone: "",
          role: "candidate",
          file: null,
        });
        console.log(res);
        // navigate("/dashboard");
       
      } else {
        setUploadMessage("Registration failed. ❌");
      }
    } catch (error) {
      setUploadMessage("Error submitting form.");
    } finally {
      setUploading(false);
    }
    // navigate("/dashboard");

  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={formData.role === "candidate"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-gray-600"
                />
                <span>Candidate</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="expert"
                  checked={formData.role === "expert"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-gray-600"
                />
                <span>Expert</span>
              </label>
            </div>
          </div>
          
          <div className="w-full">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
            {uploadMessage && <p className="text-gray-700 mt-2">{uploadMessage}</p>}
          </div>
          
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-900 transition"
          >
            {uploading ? "Uploading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
