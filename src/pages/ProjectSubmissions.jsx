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
        let project_name = event.target.project_name.value
        let project_repo = event.target.project_repo.value
        let image_link = event.target.image_link.value

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                team_name: team.team_name,
                project_name: project_name,
                project_repo: project_repo,
                image_link: image_link,
            }),
        }

        fetch(`${backendLink}/project-submission`, requestOptions)
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
                setMessage("Project Submitted")
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
        
        <div className="container" style={{"marginTop": "100px",width: "50%", marginLeft: "auto",marginRight:'auto', padding: "20px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",marginBottom:'50px', borderRadius: "10px"}}>
            <h1 style={{textAlign: 'center',fontSize: '50px',background: 'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent'}}>Project Submission</h1>
            <i style={{"color": "#fff"}}>In case you want to modify an existing project submitted using THIS account, enter the new repository link/image of project and it will automatically
                update the previous existing project that has been submitted by THIS account
            </i>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
            <form onSubmit={handleSubmit} method="POST" style={{"marginTop": "5%"}}>
                <input type="url" className="form-control" placeholder="Project Name" name="project_name" id="project_name" />
                <br></br>
                <input type="url" className="form-control" placeholder="Project Repository Link" name="project_repo" id="project_repo" />
                <br></br>
                <input type="url" className="form-control" placeholder="Image of Project(send as link)" name="image_link" id="iamge_link" />
                <br></br>
                <button type="submit" className="btn" style={{background:'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',color:'white'}}>Enter Project</button>
            </form>
        </div>
    )
}

export default ProjectSubmit