import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Team() {
    const [message, setMessage] = useState()
    const [team, setTeam] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        let teamSession = sessionStorage.getItem("team")

        if (!teamSession) {  // Fix: Proper check
            setMessage("You need to login with your team's account to access this page")
            navigate("/login")
        } else {
            setTeam(teamSession)
            console.log(teamSession)
        }

        setTeam(JSON.parse(teamSession));
        console.log(team)
    }, [])
    

    return (
        <div style={{"marginTop": "20%"}}>
            {team && (
                <div style={{"color": "#fff"}}>
                    <h1>Team Name: {team.team_name}</h1>
                    <h1>Team Count: {team.team_count}</h1>
                    <h1>Member Count: {team.member_names}</h1>
                    <h1>School Name: {team.school_name}</h1>

                    <a href="/project" style={{"backgroundColor": "rgb(100, 100, 100)"}}>See your projects</a>
                </div>
            )}
            {message && <h2>{message}</h2>}
        </div>
    )
}

export default Team