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
        setTeam(teamSession);
        console.log(team)
    })

    return (
        <div>

        </div>
    )
}

export default Team