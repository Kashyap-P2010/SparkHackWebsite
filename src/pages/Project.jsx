import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Project() {
  const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com";
  const developmentBackendLink = "http://localhost:4444";
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState(null);
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const teamSession = JSON.parse(sessionStorage.getItem("team"));
    if (!teamSession) {
      setMessage("Login with your team's account to access this page");
      navigate("/login");
      return;
    }

    setTeam(teamSession);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team_name: teamSession.team_name,
      }),
    };

    fetch(`${backendLink}/project`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error_message);
        } else {
          setProject(data.project);
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg p-10 w-full max-w-2xl border border-indigo-500">
        {project ? (
          <div className="text-center text-white space-y-6 font-mono">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
                Team Name
              </h1>
              <p className="text-xl">{project.team_name}</p>
            </div>

            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
                Project Name
              </h1>
              <p className="text-xl">{project.project_name}</p>
            </div>

            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
                Project Repository
              </h1>
              <a
                href={project.project_repo}
                className="text-blue-400 hover:underline break-all"
              >
                {project.project_repo}
              </a>
            </div>

            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
                Image Link
              </h1>
              <a
                href={project.image_link}
                className="text-blue-400 hover:underline break-all"
              >
                {project.image_link}
              </a>
            </div>
          </div>
        ) : (
          <p className="text-white text-center">{message}</p>
        )}

        <div className="mt-10 text-center">
          <a
            href="/project-submit"
            className="inline-block bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-transform"
          >
            Submit or Change a Project
          </a>
        </div>
      </div>
    </div>
  );
}

export default Project;
