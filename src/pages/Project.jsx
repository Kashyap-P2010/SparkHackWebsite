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
            <div style={{marginTop:'6%'}}>
                <div style={{paddingTop: '1%', paddingBottom: '2%',textAlign:'center',width:'50%',margin:'auto',fontFamily:'monospace',boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} className="container">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
                    {project &&
                        <div style={{color:'white'}}>
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous"></link>
                            <h1>Team Name </h1><h1>{project.team_name}</h1>
                            <h1>Project Repository </h1>
                            <a href={project.project_repo}>{project.project_repo}</a>
                            <h1>Image Link </h1>
                            <a href={project.image_link}>{project.image_link} </a>
                        </div>
                    }

                    <br />
                    <br />

                    <a href="/project-submit" className="btn" style={{textAlign:'center',background:'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',color:'white',marginBottom:'30px',borderRadius:'30px',padding:'10px'}}>Submit or change a project</a>
                </div>
            </div>
        )
    }

    export default Project