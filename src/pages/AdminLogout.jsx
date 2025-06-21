import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogout() {
    const navigate = useNavigate();
    const [message, setMessage] = useState()

    useEffect(() => {
        let adminUser = sessionStorage.getItem("admin_user")
        if (adminUser === null) {
            navigate("/admin-login")
            setMessage("You need to login with admin account to logout of admin page!")
        }
        sessionStorage.removeItem("admin_user")
        sessionStorage.removeItem("team")
        navigate("/")
    })

    return (
        <div></div>
    )
}

export default AdminLogout