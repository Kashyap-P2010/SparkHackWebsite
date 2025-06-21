    import { useEffect, useState } from "react"
    import { useNavigate } from "react-router-dom"
    import 'bootstrap/dist/css/bootstrap.min.css';


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
            <div style={{paddingTop: '5%', paddingBottom: '5%',textAlign:'center'}} className="container">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
                {project &&
                    <div>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
                        <h1>Team Name: {project.team_name}</h1>
                        <h1>Project Repository: <a href={project.project_repo}>{project.project_repo}</a></h1>
                        <h1>Image Link: <a href={project.image_link}>{project.image_link}</a></h1>
                    </div>
                }

                <br />
                <br />

                <a href="/project-submit" className="btn" style={{textAlign:'center',background:'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',color:'white',marginBottom:'30px'}}>Submit or change a project</a>
            </div>
        )
    }

    export default Project