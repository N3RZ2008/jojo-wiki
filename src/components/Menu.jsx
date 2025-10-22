import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "./authComponents/AuthProvider.jsx"
import { useCheckAdmin } from "../database/handleApi.jsx";
import "./styles/menu.css";

function Menu() {
    const { user } = useContext(AuthContext)
    const { isAdmin } = useCheckAdmin(user?.id)

    return (
        <div className="menu">
            <Link className="menuItem" to={"/"}>Homepage</Link>
            <Link className="menuItem" to={"/page"}>Create Page</Link>

            {isAdmin &&
                <NavDropdown
                    title="Admin"
                >
                    <NavDropdown.ItemText>
                        <Link className="menuItem" to={"/admin/users"}>Users</Link>
                    </NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.ItemText>
                        <Link className="menuItem" to={"/admin/pages"}>Pages</Link>
                    </NavDropdown.ItemText>
                    </NavDropdown>}

            {user == undefined ?
                <NavDropdown
                    title="Login"
                >
                    <NavDropdown.ItemText>
                        <Link className="menuItem" to={`/login`}>Login</Link>
                    </NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.ItemText>
                        <Link className="menuItem" to={"/signup"}>Sign Up</Link>
                    </NavDropdown.ItemText>
                </NavDropdown> :
                <NavDropdown
                    title="Profile"
                >
                    <NavDropdown.ItemText>
                        <Link className="menuItem" to={`/myprofile`}>Profile</Link>
                    </NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.ItemText>
                        <Link className="menuItem" to={"/logout"}>Logout</Link>
                    </NavDropdown.ItemText>
                </NavDropdown>}



        </div>
    )
}

export default Menu