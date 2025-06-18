import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        let adminUser = sessionStorage.getItem("admin_user")
        if (adminUser === null) {
            navigate("/admin-login")
            setMessage("You need to login with admin account to logout of admin page")
        }
        sessionStorage.removeItem("admin_user")
        navigate("/")
    })

    return (
        <div></div>
    )
}

export default AdminLogout