import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CandidateList from "./pages/CandidateList";
import Expertist from "./pages/Expertist";
import Score from "./pages/Score";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import {
  DashBord,
  Login,
  Signup,
  Landing,
  Thanks,
} from "./include";

import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/thanks" element={<Thanks />} />
 
        <Route path="/dashboard/*" element={<PrivateRoute Component={DashBord } />}>
        {/* Child Routes inside Dashboard */}
        <Route index element={<Home />} />
        <Route path="candidates" element={<CandidateList />} />
        <Route path="experts" element={<Expertist />} />
        <Route path="score/:id" element={<Score />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="adduser" element={<AddUser />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        
      </Route>
            </Routes>
    </Router>
  );
}

export default App;
