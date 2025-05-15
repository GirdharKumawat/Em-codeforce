import React, { useEffect, useState } from "react";
import { API_URL } from "../config/api";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch(API_URL+`/userinfo/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const profile = await res.json();
      if (profile.extracted_text) {
        setData(profile.extracted_text);
        
      } else {
        throw new Error("Invalid API response structure");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data) return <p className="text-gray-300">No profile data found.</p>;

  return (
    <div className="bg-gray-700 text-white min-h-screen p-6 flex justify-center">
      <div className="bg-gray-600 p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-white border-b pb-2 mb-4">{data.name}</h1>
        <p className="text-gray-300 mb-4">{data.summary}</p>

        {/* Education Section */}
        <h2 className="text-xl font-semibold text-gray-200 border-b pb-1">Education</h2>
        {data.education && data.education.length > 0 ? (
          data.education.map((edu, index) => (
            <div key={index} className="mt-2 text-gray-400">
              <p className="font-semibold text-gray-300">{edu.degree} - {edu.institution}</p>
              <p>{edu.year} | CGPA: {edu.cgpa}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No education details available.</p>
        )}

        {/* Projects Section */}
        <h2 className="text-xl font-semibold text-gray-200 border-b pb-1 mt-4">Projects</h2>
        {data.projects && data.projects.length > 0 ? (
          data.projects.map((project, index) => (
            <div key={index} className="mt-2 text-gray-400">
              <p className="font-semibold text-gray-300">{project.name}</p>
              <p>{project.description}</p>
              <p className="text-gray-400 text-sm">
                Technologies: {project.technologies ? project.technologies.join(", ") : "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No projects available.</p>
        )}

        {/* Skills Section */}
        <h2 className="text-xl font-semibold text-gray-200 border-b pb-1 mt-4">Skills</h2>
        {data.skills ? (
          <div className="text-gray-400 mt-2">
            <p><span className="font-semibold text-gray-300">Languages:</span> {data.skills.programming_languages?.join(", ") || "N/A"}</p>
            <p><span className="font-semibold text-gray-300">Frameworks:</span> {data.skills.frameworks_libraries?.join(", ") || "N/A"}</p>
            <p><span className="font-semibold text-gray-300">Tools:</span> {data.skills.tools_technologies?.join(", ") || "N/A"}</p>
            <p><span className="font-semibold text-gray-300">Concepts:</span> {data.skills.concepts?.join(", ") || "N/A"}</p>
            <p><span className="font-semibold text-gray-300">Database:</span> {data.skills.database || "N/A"}</p>
          </div>
        ) : (
          <p className="text-gray-400">No skills information available.</p>
        )}

        {/* Contact Section */}
        <h2 className="text-xl font-semibold text-gray-200 border-b pb-1 mt-4">Contact</h2>
        {data.contact ? (
          <div className="text-gray-400 mt-2">
            <p><span className="font-semibold text-gray-300">Email:</span> {data.contact.email || "N/A"}</p>
            <p><span className="font-semibold text-gray-300">Phone:</span> {data.contact.phone || "N/A"}</p>
            <p><span className="font-semibold text-gray-300">GitHub:</span> {data.contact.github || "N/A"}</p>
            <p><span className="font-semibold text-gray-300">Location:</span> {data.contact.location || "N/A"}</p>
          </div>
        ) : (
          <p className="text-gray-400">No contact details available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
