import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExpertList = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [experts, setExperts] = useState([]);
  const navigate = useNavigate();
  

 

  const fetchExperts = async () => {
    try {
      const response = await fetch(API_URL+"/experts");
      if (response.ok) {
        const data = await response.json();
        setExperts(data);
      }
    } catch (error) {
      console.error("Error fetching experts:", error);
    }
  }

  useEffect(() => {
    fetchExperts();
  }, []);
  

 

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold">Experts</h1>
          <button 
            className="bg-gray-800 cursor-pointer  text-white px-4 py-2 rounded-md hover:bg-gray-900"
            onClick={()=>(navigate("/dashboard/adduser"))}
          >
             Add Expert
          </button>
        </div>

      
        {/* Expert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                🧠
              </div>
              <h3 className="text-xl font-semibold mt-4">{expert.name}</h3>
              <p className="text-gray-500">{expert.expertise}</p>
              <button
              onClick={() => navigate(`/dashboard/profile/${expert.id}`)}
              className="mt-4 cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">
             
                View Profile
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExpertList;
