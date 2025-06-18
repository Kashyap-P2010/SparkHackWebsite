import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ProjectSubmit() {
    const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com"
    const developmentBackendLink = "http://localhost:4444"
    const [message, setMessage] = useState()
    const [team, setTeam] = useState()
    const [project, setProject] = useState()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        let project_repo = event.target.project_repo.value
        let image_link = event.target.image_link.value

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team_name: team.team_name,
                project_repo: project_repo,
                image_link: image_link,
            }),
        }

        fetch(`${developmentBackendLink}/project-submission`, requestOptions)
            .then((response) => {
                if (response.status === 400) {
                    return
                }
                return response.json()
            })
            .then((data) => {
                if (data.error) {
                    setMessage(data.error)
                    console.log(data.error)
                }
                setProject(JSON.stringify(data.project))
            })
    }

    useEffect(() => {
        let teamSession = sessionStorage.getItem("team")
        if (teamSession === null) {
            setMessage("You need to login with your team's account to access this page")
            navigate("/login")
        }
        setTeam(JSON.parse(teamSession))
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST" style={{"marginTop": "20%"}}>
                <input type="url" placeholder="Project Repository Link" name="project_repo" id="project_repo" />
                <input type="url" placeholder="Image of Project(send as link)" name="image_link" id="iamge_link" />
                <button type="submit" style={{"backgroundColor": "rgb(100, 100, 100)"}}>Enter Project</button>
            </form>
        </div>
    )
}

export default ProjectSubmit