import React, { useState,useEffect} from "react";
 
import { useNavigate } from "react-router-dom";
const CandidateList = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
 
  const feachCandidate = async () => {
   try {
    let res = await fetch(API_URL+"/candidates/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    const candi = await res.json();
    setCandidates(candi);
  }
  catch (error) {
    console.error("Error:", error);
  }

  };

  useEffect(() => {
     feachCandidate();
  }
  , []);
  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold">Candidates</h1>
          <button
            className="bg-gray-800 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-gray-900"
            onClick={()=>(navigate("/dashboard/adduser"))}
          >
            Add Candidate
          </button>
        </div>

         
        {/* Candidate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <h3 className="text-xl font-semibold mt-4">{candidate.name}</h3>
              <p className="text-gray-500">{candidate.role}</p>
              <button
                onClick={() => navigate(`/dashboard/profile/${candidate.id}`)}
                className="mt-4 bg-gray-800 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-900"
              >
                View Profile
              </button>
              <button
                onClick={() => navigate("/dashboard/score/"+candidate.id)}
                className="mt-4 cursor-pointer bg-gray-200 text-gray px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white"
              >
                Find Match
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CandidateList;
