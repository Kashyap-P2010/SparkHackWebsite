import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
    const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com";
    const developmentBackendLink = "http://localhost:4444";
    const [message, setMessage] = useState();
    const [admin, setAdmin] = useState();
    const [teams, setTeams] = useState([]);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let adminUser = sessionStorage.getItem("admin_user");
        if (adminUser === null) {
            navigate("/admin-login");
            setMessage("You need to login with admin account to access this page");
            return;
        }
        setAdmin(JSON.parse(adminUser));

        fetch(`${backendLink}/admin`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                }
                setTeams(data.teams);
                setProjects(data.projects);
            });
    }, []);

    console.log(teams)

    return (
        <div className="bg-slate-900 text-white min-h-screen px-8 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">Admin Page</h1>

            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-6">Teams</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-700">
                        <thead className="bg-slate-800 text-left">
                            <tr>
                                <th className="px-4 py-3 border-b border-gray-600">Team Name</th>
                                <th className="px-4 py-3 border-b border-gray-600">Member Names</th>
                                <th className="px-4 py-3 border-b border-gray-600">Team Count</th>
                                <th className="px-4 py-3 border-b border-gray-600">School Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => (
                                <tr key={team.id} className="hover:bg-slate-800 transition">
                                    <td className="px-4 py-2 border-b border-gray-700">{team.team_name}</td>
                                    <td className="px-4 py-2 border-b border-gray-700">{team.member_names}</td>
                                    <td className="px-4 py-2 border-b border-gray-700">{team.team_count}</td>
                                    <td className="px-4 py-2 border-b border-gray-700">{team.school_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-6">Projects</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-700">
                        <thead className="bg-slate-800 text-left">
                            <tr>
                                <th className="px-4 py-3 border-b border-gray-600">Team Name</th>
                                <th className="px-4 py-3 border-b border-gray-600">School Name Name</th>
                                <th className="px-4 py-3 border-b border-gray-600">Project Name</th>
                                <th className="px-4 py-3 border-b border-gray-600">Project Repository</th>
                                <th className="px-4 py-3 border-b border-gray-600">Image Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-slate-800 transition">
                                    <td className="px-4 py-2 border-b border-gray-700">{project.team_name}</td>
                                    <td className="px-4 py-2 border-b border-gray-700">{project.school_name}</td>
                                    <td className="px-4 py-2 border-b border-gray-700">{project.project_name}</td>
                                    <td className="px-4 py-2 border-b border-gray-700">
                                        <a href={project.project_repo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{project.project_repo}</a>
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-700">
                                        <a href={project.image_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{project.image_link}</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default Admin;