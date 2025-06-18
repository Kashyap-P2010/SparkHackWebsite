import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Team() {
    const [message, setMessage] = useState()
    const [team, setTeam] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        let teamSession = sessionStorage.getItem("team")
        if (team === null) {
            setMessage("You need to login with your team's account to access this page")
            navigate("/login")
        }
        setTeam(JSON.parse(teamSession));
        console.log(team)
    })

    return (
        <div style={{"marginTop": "20%"}}>
            <h1>{team.team_name}</h1>
            <h1>{team.team_count}</h1>
            <h1>{team.member_names}</h1>
            <h1>{team.school_name}</h1>

            <a href="/project">See your projects</a>
        </div>
    )
}

export default Team