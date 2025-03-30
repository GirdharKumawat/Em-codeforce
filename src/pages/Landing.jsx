import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-100 shadow-md p-4">
        
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-semibold flex items-center">
            <img src="/assets/logo.webp" alt="ExpertMatch Logo" className="h-10 mr-2" />
            ExpertMatch
          </a>
          <div>
            <Link to="/login" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              Login
            </Link>
            <Link to="/signup" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center p-10 bg-gray-200">
        <h1 className="text-3xl font-bold">Find the Perfect Expert for Your Interview Board</h1>
        <p className="text-lg mt-2">Automating expert selection with AI-powered relevance scores</p>
        <Link to="/dashboard" className="btn bg-black text-white px-6 py-3 mt-4 inline-block rounded-md">
          Get Started
        </Link>
        <br />
        <img src="/assets/expert_match.png" alt="Expert Matching" className="mx-auto mt-4 max-w-lg rounded-md" />
      </header>

      {/* How It Works Section */}
      <div className="container mx-auto text-center mt-10 px-4">
        <h2 className="text-2xl font-bold">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Step 1 */}
          <div className="p-4">
            <img src="/assets/upload_resume.png" alt="Upload Resume" className="w-full rounded-lg" />
            <h4 className="text-lg font-semibold mt-3">Upload Resumes</h4>
            <p className="text-gray-600">Submit candidate and expert resumes for AI analysis.</p>
          </div>

          {/* Step 2 */}
          <div className="p-4">
            <img src="/assets/ai_processing.png" alt="AI Processing" className="w-full rounded-lg" />
            <h4 className="text-lg font-semibold mt-3">AI Processing</h4>
            <p className="text-gray-600">Our AI-powered system evaluates expertise and relevance.</p>
          </div>

          {/* Step 3 */}
          <div className="p-4">
            <img src="/assets/match_results.png" alt="Match Results" className="w-full rounded-lg" />
            <h4 className="text-lg font-semibold mt-3">View Matches</h4>
            <p className="text-gray-600">See the best expert recommendations for your interview.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
