import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Project() {
    const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com"
    const developmentBackendLink = "http://localhost:4444"
    const [message, setMessage] = useState()
    const [team, setTeam] = useState()
    const [project, setProject] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        let teamSession = JSON.parse(sessionStorage.getItem("team"))
        if (teamSession === null) {
            console.log("null")
            setMessage("Login with your team's account to access this page")
            navigate("/login")
            return
        }
        setTeam(teamSession)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team_name: teamSession.team_name,
            })
        }

        fetch(`${developmentBackendLink}/project`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log("error:", data.error_message)
                    setMessage(data.error_message)
                }
                setProject(data.project)
                console.log(data.project)
            })
    }, [])

    return (
        <div style={{"marginTop": "20%", "backgroundColor": "rgb(100, 100, 100)"}}>
            {project &&
                <div>
                    <h1>Team Name: {project.team_name}</h1>
                    <h1>Project Repository: <a href={project.project_repo}>{project.project_repo}</a></h1>
                    <h1>Image Link: <a href={project.image_link}>{project.image_link}</a></h1>
                </div>
            }

            <br />
            <br />

            <a href="/project-submit" style={{"backgroundColor": "#fff"}}>Submit or change a project</a>
        </div>
    )
}

export default Project