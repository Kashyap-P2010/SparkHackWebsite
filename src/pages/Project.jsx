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
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team_name: teamSession.team_name,
            })
        }

        fetch(`${backendLink}/project`, requestOptions)
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
        <div>
            <h1>{project.team_name}</h1>
            <h1>{project.project_repo}</h1>
            <h1>{project.image_link}</h1>

            <a href="/project-submit">Submit or change a project</a>
        </div>
    )
}

export default Project