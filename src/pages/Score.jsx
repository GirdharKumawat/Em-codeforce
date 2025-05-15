import React, { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";

const Score = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get candidate ID from URL params
  const [scores, setScores] = useState([]);
  const [candidateName, setCandidateName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(API_URL+`/score/${id}`);
        const data = await response.json();
        if (response.ok === true) {
          // Sorting in descending order based on total_score
          const sortedScores = data.scoreList.sort((a, b) => b.total_score - a.total_score);
  
          setScores(sortedScores);
          setCandidateName(sortedScores.length > 0 ? sortedScores[0].candidate_name : ""); 
        } else {
          setError(data.message || "Failed to fetch scores.");
        }
      } catch (err) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchScores();
  }, [id]);
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Match & Score</h1>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Candidate: {candidateName}
          </h2>
          <div className="w-full max-w-4xl space-y-4">
            {scores.length === 0 ? (
              <p className="text-gray-600">No matching experts found.</p>
            ) : (
              scores.map((expert, index) => (
                <div
                  key={index}
                  className="bg-gray-700 text-white shadow-lg rounded-2xl p-6 flex flex-col items-center border border-gray-700"
                >
                  <h2 className="text-xl font-semibold">{expert.expert_name}</h2>
                  <div className="flex flex-wrap justify-center items-center gap-6 mt-4">
                    {[
                      { label: "Education", score: expert.education_score },
                      { label: "Skills", score: expert.skills_score },
                      { label: "Experience", score: expert.experience_score },
                      { label: "Projects", score: expert.project_score },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="text-gray-300 text-sm">{item.label}</span>
                        <span className="bg-gray-300 text-black px-4 py-2 rounded-full text-lg font-semibold">
                          {item.score}
                        </span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center">
                      <span className="text-gray-300 text-sm">Total Score</span>
                      <span className="bg-gray-800 text-white px-6 py-2 rounded-full text-lg font-bold">
                        {expert.total_score}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default Score;
