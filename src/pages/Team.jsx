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
        <div style={{"marginTop": "5%"}}>
            {team && (
                <div className="" style={{"color": "#fff",paddingBottom: "40px"}}>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous"></link>
                    <h1 style={{ textAlign:'center',fontSize: '50px',background: 'linear-gradient(90deg, #6366f1,rgb(153, 77, 235)',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',}}>Team Management</h1>
                    <div style={{textAlign:'center',fontSize:'30px',paddingTop:'20px'}}>    
                        <p style={{paddingBottom:'10px'}}>Team Name | {team.team_name}</p>
                        
                        <p style={{paddingBottom:'10px'}}>Team Count | {team.team_count}</p>
                        
                        <p style={{paddingBottom:'10px'}}>Member Count | {team.member_names}</p>
               
                        <p style={{paddingBottom:'10px'}}>School Name | {team.school_name}</p>
                        
                        <a href="/project" style={{}}>See your projects</a>
                    </div>
                </div>
            )}
            {message && <h2>{message}</h2>}
        </div>
    )
}

export default Team