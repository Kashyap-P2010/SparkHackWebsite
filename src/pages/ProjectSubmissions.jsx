import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectSubmit() {
  const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com";
  const developmentBackendLink = "http://localhost:4444";
  const [message, setMessage] = useState("");
  const [team, setTeam] = useState(null);
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const project_name = event.target.project_name.value;
    const project_repo = event.target.project_repo.value;
    const image_link = event.target.image_link.value;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        team_name: team.team_name,
        project_name,
        project_repo,
        image_link,
      }),
    };

    fetch(`${backendLink}/project-submission`, requestOptions)
      .then((response) => {
        if (response.status === 400) return;
        return response.json();
      })
      .then((data) => {
        if (data?.error) {
          setMessage(data.error);
        } else {
          setMessage("Project Submitted");
          setProject(JSON.stringify(data.project));
          navigate("/project");
        }
      });
  };

  useEffect(() => {
    const teamSession = sessionStorage.getItem("team");
    if (!teamSession) {
      setMessage("You need to login with your team's account to access this page");
      navigate("/login");
    } else {
      setTeam(JSON.parse(teamSession));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md text-white rounded-2xl shadow-xl p-8 border border-indigo-600">
        <h1 className="text-center text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
          Project Submission
        </h1>
        <p className="text-sm text-gray-300 mb-6 text-center font-mono">
          Modify an existing project submitted with THIS account by submitting updated info.
        </p>

        <form onSubmit={handleSubmit} method="POST" className="space-y-6">
          <div>
            <label htmlFor="project_name" className="block mb-1 text-sm font-semibold">
              Project Name
            </label>
            <input
              type="text"
              name="project_name"
              id="project_name"
              className="w-full rounded-md p-3 bg-slate-800 border border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label htmlFor="project_repo" className="block mb-1 text-sm font-semibold">
              Project Repository Link
            </label>
            <input
              type="url"
              name="project_repo"
              id="project_repo"
              className="w-full rounded-md p-3 bg-slate-800 border border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="https://github.com/..."
              required
            />
          </div>

          <div>
            <label htmlFor="image_link" className="block mb-1 text-sm font-semibold">
              Image Link (URL)
            </label>
            <input
              type="url"
              name="image_link"
              id="image_link"
              className="w-full rounded-md p-3 bg-slate-800 border border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="https://i.postimg.cc/..."
              
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:scale-105 transform transition duration-300 text-white py-3 rounded-full font-semibold"
          >
            Submit Project
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-400">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ProjectSubmit;
