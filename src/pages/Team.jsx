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
            {team !== null && (
                <div className="" style={{"color": "#fff",paddingBottom: "40px",paddingTop: "20px",boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",width:"fit-content",margin:"auto",borderRadius:"10px",marginBottom:"20px",padding:"40px"}}>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous"></link>
                    <h1 style={{textAlign: 'center',fontSize: '50px',background: 'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent'}}>Team Management</h1>
                    <div style={{textAlign:'center',fontWeight:"bold",fontSize:'30px',paddingTop:'20px',fontFamily:'monospace'}}>    
                        <p style={{paddingBottom:'10px'}}>Team Name | {team.team_name}</p>
                        
                        <p style={{paddingBottom:'10px'}}>Team Count | {team.team_count}</p>
                        
                        <p style={{paddingBottom:'10px'}}>Member Count | {team.member_names}</p>
               
                        <p style={{paddingBottom:'10px'}}>School Name | {team.school_name}</p>
                        
                        <a href="/Project" className="btn" style={{background: 'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',color:'white'}}>See your projects</a>
                    </div>
                </div>
            )}
            {message && <h2>{message}</h2>}
        </div>
    )
}

export default Team