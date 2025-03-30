import React, { useEffect,useState } from "react";

const Home = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL)
  const UserInfo = JSON.parse(localStorage.getItem("user"))
  const User = UserInfo.name
  
  const [TotalCandidates, setTotalCandidates] = useState(0);
  const [TotalExperts, setTotalExperts] = useState(0);
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
     setTotalCandidates(candi.length);
   }
   catch (error) {
     console.error("Error:", error);
   }
 
   };
   const fetchExperts = async () => {
    try {
      const response = await fetch(API_URL+"/experts");
      if (response.ok) {
        const data = await response.json();
        setTotalExperts(data.length);
      }
    } catch (error) {
      console.error("Error fetching experts:", error);
    }
  }
  useEffect(() => {
    feachCandidate();
    fetchExperts();
  }
  , []);
  const stats = [
    { value: TotalCandidates, label: "Total Candidates" },
    { value:  TotalExperts, label: "Total Experts" },
    { value: 0, label: "Pending Matches" },
    { value: TotalCandidates, label: "Completed Matches" },
  ];

  return (
    <main className="p-6 bg-gray-200 min-h-screen text-white flex flex-col items-center">
      {/* Page Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 bg-gray-700 p-6 shadow-md rounded-xl">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          <span className="text-white text-lg">Welcome {User} !</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-700 p-10 shadow-md rounded-2xl text-center flex flex-col items-center justify-center w-full"
          >
            <div className="text-5xl font-bold text-white-400">{stat.value}</div>
            <div className="text-gray-300 mt-3 text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;