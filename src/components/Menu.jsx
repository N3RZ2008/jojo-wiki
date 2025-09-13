import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider.jsx"
import "./styles/menu.css";

function Menu() {
    const { user } = useContext(AuthContext)
    const menuStyle = {
        width: "20vw"
    }

    return (
        <div className="menu">
            <Link to={"/"}>
                <div className="menuItem" style={menuStyle}>Homepage</div>
            </Link>
            <Link to={"/page"}>
                <div className="menuItem" style={menuStyle}>Create Page</div>
            </Link>
            <div className="menuItem" style={menuStyle}>Item 3</div>
            <div className="menuItem" style={menuStyle}>Item 4</div>
            {user == undefined ?
                <Link to={"/login"}>
                    <div className="menuItem" style={menuStyle}>Login</div>
                </Link> :
                <Link to={"/logout"}>
                    <div className="menuItem" style={menuStyle}>Logout</div>
                </Link>}
        </div>
    )
}

export default Menu