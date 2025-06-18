import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const [message, setMessage] = useState()

    useEffect(() => {
        let team = sessionStorage.getItem("team")
        if (team === null) {
            setMessage("You need to login with your team's account to log out of it")
            navigate("/login")
        }
        sessionStorage.removeItem("team")
        sessionStorage.removeItem("admin_user")
    })

    return (
        <div></div>
    )
}

export default Logout