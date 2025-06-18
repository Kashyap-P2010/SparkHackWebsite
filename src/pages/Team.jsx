import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Team() {
    const [message, setMessage] = useState()
    const [team, setTeam] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        let teamSession = JSON.parse(sessionStorage.getItem("team"))

        if (!teamSession) {  // Fix: Proper check
            setMessage("You need to login with your team's account to access this page")
            navigate("/login")
        } else {
            setTeam(teamSession)
            console.log(teamSession)
        }
<<<<<<< Updated upstream
        setTeam(JSON.parse(teamSession));
        console.log(team)
    })
=======
    }, []) // Fix: Dependency array added
>>>>>>> Stashed changes

    return (
        <div style={{"marginTop": "20%"}}>
            {team && (
                <>
                    <h1>{team.team_name}</h1>
                    <h1>{team.team_count}</h1>
                    <h1>{team.member_names}</h1>
                    <h1>{team.school_name}</h1>

                    <a href="/project">See your projects</a>
                </>
            )}
            {message && <h2>{message}</h2>}
        </div>
    )
}

export default Team