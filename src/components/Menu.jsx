import { useContext } from "react";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "./AuthProvider.jsx"
import { useCheckAdmin } from "../database/handleApi.jsx";
import "./styles/menu.css";

function Menu() {
    const { user } = useContext(AuthContext)
    const { isAdmin } = useCheckAdmin(user?.id)

    return (
        <div className="menu">
            <Link className="menuItem" to={"/"}>Homepage</Link>
            <Link className="menuItem" to={"/page"}>Create Page</Link>
            {/* <Link className="menuA" to={"/"}>
                <div className="menuItem">Homepage</div>
            </Link>
            <Link className="menuA" to={"/page"}>
                <div className="menuItem">Create Page</div>
            </Link> */}

            {isAdmin &&
                <NavDropdown
                    title="Admin"
                >
                    <NavDropdown.Item>
                        <Link className="menuItem" to={"#"}>Users</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                        <Link className="menuItem" to={"#"}>Pages</Link>
                    </NavDropdown.Item>
                    </NavDropdown>}

            {user == undefined ?
                <NavDropdown
                    title="Login"
                >
                    <NavDropdown.Item>
                        <Link className="menuItem" to={`/login`}>Login</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                        <Link className="menuItem" to={"/signup"}>Sign Up</Link>
                    </NavDropdown.Item>
                </NavDropdown> :
                <NavDropdown
                    title="Profile"
                >
                    <NavDropdown.Item>
                        <Link className="menuItem" to={`/profile/${user?.id}`}>Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                        <Link className="menuItem" to={"/logout"}>Logout</Link>
                    </NavDropdown.Item>
                </NavDropdown>}



        </div>
    )
}

export default Menu