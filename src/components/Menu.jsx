import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider.jsx"
import "./styles/menu.css";

function Menu() {
    const { user } = useContext(AuthContext)

    return (
        <div className="menu">
            <Link className="menuA" to={"/"}>
                <div className="menuItem">Homepage</div>
            </Link>
            <Link className="menuA" to={"/page"}>
                <div className="menuItem">Create Page</div>
            </Link>
            {user == undefined ?
                <Link className="menuA" to={"/login"}>
                    <div className="menuItem">Login</div>
                </Link> :
                <>
                    <Link className="menuA" to={"/logout"}>
                        <div className="menuItem">Logout</div>
                    </Link>
                    <Link className="menuA" to={`/profile/${user?.id}`}>
                        <div className="menuItem">Profile</div>
                    </Link> 
                </>}
        </div>
    )
}

export default Menu