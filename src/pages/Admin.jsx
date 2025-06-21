import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Admin() {    
    const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com"
    const developmentBackendLink = "http://localhost:4444"
    const [message, setMessage] = useState()
    const [admin, setAdmin] = useState()
    const [teams, setTeams] = useState([])
    const [projects, setProjects] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let adminUser = sessionStorage.getItem("admin_user")
        if (adminUser === null) {
            navigate("/admin-login")
            setMessage("You need to login with admin account to access this page")
            return            
        }
        setAdmin(JSON.parse(adminUser))

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }

        fetch(`${backendLink}/admin`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }

                setTeams(data.teams)
                setProjects(data.projects)
            })
    }, [])

    console.log("teams:", teams)
    console.log("projects:", projects)
    return (
        <div style={{"color": "#fff"}}>
            <h1 style={{"marginTop": "10%"}}>Admin Page</h1>
            <br />
            <h1>Teams</h1>
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Team Name</td><br />
                        <td>Member Names</td><br />
                        <td>Team Count</td><br />
                        <td>School Name</td><br />
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <>
                            <tr key={team.id}>
                                <td>{team.team_name}</td>
                                <td>{team.member_names}</td>
                                <td>{team.team_count}</td>
                                <td>{team.school_name}</td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>

            <br />

            <h1>Projects</h1>
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Team Name</td>
                        <td>Project Repository</td>
                        <td>Image Link</td>
                    </tr>
                    {projects.map((project) => (
                        <>
                            <tr key={project.id}>
                                <td>{project.team_name}</td>
                                <td><a href={project.project_repo}>{project.project_repo}</a></td>
                                <td><a href={project.image_link}>{project.image_link}</a></td>
                            </tr>
                        </>
                    ))}
                </thead>
            </table>
        </div>
    )
}

export default Admin