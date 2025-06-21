import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const backendLink = "https://wof-backend-06a981c05bce.herokuapp.com"
    const developmentBackendLink = "http://localhost:4444"
    const [message, setMessage] = useState();
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()

        let username = event.target.credential.value
        let password = event.target.password.value

        let payload = {
            credential: username,
            password: password,
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
        fetch(`${backendLink}/admin-login`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    console.log("login incorrect:", data.error)
                    setMessage(data.error)
                    return
                }
                console.log(data)
                sessionStorage.removeItem("team")
                sessionStorage.setItem("admin_user", JSON.stringify(data.admin_user))
                setMessage(data.message)
                navigate("/admin")
            })
    }
    return (
        
        <div className='form-container' style={{"textAlign": "center", "marginTop": "2%", "color": "#fff", "paddingBottom": "90px"}}>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous"></link>
            <form onSubmit={handleSubmit} method="post" style={{"marginTop": "10%"}}>
                <div style={{"textAlign": "center", "marginBottom": "20px"}}>    
                    <h1 style={{fontSize: '60px',fontWeight: '900',background: 'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',display: 'inline-block',}}>Admin login </h1>
                </div>
                <div style={{display: 'flex', justifyContent: 'center',paddingTop: '10px'}}>
                    <input type="text" className="form-control" placeholder="Admin Username" name="credential" id="credential" style={{"width":"50%",}}/><br></br><br></br>
                </div><br /><br />
                <div style={{display: 'flex', justifyContent: 'center',paddingTop: '10px', height: "56px"}}> 
                    <input type="password" className="form-control" placeholder="Password" name="password" id="password" style={{"width":"50%",}} />
                </div>
                <br />
                <br />
                <button type="submit" className="btn" style={{ "marginBottom":"10px",borderRadius:"40px",background:'linear-gradient(90deg, #6366f1, #8b5cf6,rgb(205, 101, 189))',color:'white',fontWeight:'BOLD',paddingLeft:'30PX',paddingRight:'30px',paddingTop:'10PX',paddingBottom:'10px',}}>Login</button>
                <br />
                <br />
            </form>
        </div>
    );
}

export default AdminLogin