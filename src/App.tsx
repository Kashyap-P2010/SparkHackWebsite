import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.tsx';
import Admin from './pages/Admin.jsx';
import Logout from "./pages/Logout.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminLogout from "./pages/AdminLogout.jsx";
import Team from "./pages/Team.jsx";
import ProjectSubmit from "./pages/ProjectSubmissions.jsx";
import Project from "./pages/Project.jsx"
// import { AuthProvider } from './context/AuthContext';

function App() {
  const [adminUser, setAdminUser] = useState({});
  const [team, setTeam] = useState({});

  useEffect(() => {
    let adminUser = sessionStorage.getItem("admin_user")
    let team = sessionStorage.getItem("team")

    if (adminUser !== null) {
      setAdminUser(adminUser)
    } else if (team !== null) {
      setTeam(team)
    }
  })

  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />              
              <Route path="/register" element={<Register />} />
              <Route path="/admin-login" element={<AdminLogin />} ></Route>
              <Route path="/admin" element={<Admin />}></Route>              
              <Route path="/admin-logout" element={<AdminLogout />} ></Route>
              <Route path="/team" element={<Team />}></Route>
              <Route path="/logout" element={<Logout />} />
              <Route path="/project-submit" element={<ProjectSubmit />}></Route>
              <Route path="/project" element={<Project />}></Route>
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </>
  );
}

export default App;