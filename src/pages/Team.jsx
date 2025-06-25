import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Team() {
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const teamSession = sessionStorage.getItem("team");

    if (!teamSession) {
      setMessage("You need to login with your team's account to access this page");
      navigate("/login");
    } else {
      const parsedTeam = JSON.parse(teamSession);
      setTeam(parsedTeam);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-950 flex items-center justify-center px-4 py-10">
      {team ? (
        <div className="bg-white/5 backdrop-blur-md border border-indigo-500 rounded-2xl shadow-xl p-10 w-full max-w-2xl text-white font-mono text-center space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
            Team Management
          </h1>

          <div className="text-lg space-y-4">
            <p>
              <span className="font-semibold text-indigo-300">Team Name:</span> {team.team_name}
            </p>
            <p>
              <span className="font-semibold text-indigo-300">Team Count:</span> {team.team_count}
            </p>
            <p>
              <span className="font-semibold text-indigo-300">Member Names:</span> {team.member_names}
            </p>
            <p>
              <span className="font-semibold text-indigo-300">School Name:</span> {team.school_name}
            </p>
          </div>

          <a
            href="/project"
            className="inline-block mt-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white py-3 px-6 rounded-full hover:scale-105 transition-transform"
          >
            See Your Projects
          </a>
        </div>
      ) : (
        message && (
          <h2 className="text-white text-xl font-semibold">{message}</h2>
        )
      )}
    </div>
  );
}

export default Team;
