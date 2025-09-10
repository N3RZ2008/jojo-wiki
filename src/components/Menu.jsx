import { useContext } from "react";
import "./styles/menu.css";
import { PageContext } from "./PageProvider";
import { Link } from "react-router-dom";

function Menu() {
    const { editMode, setEditMode } = useContext(PageContext)
    const menuStyle = {
        width: "20vw"
    }

    function switchMode() {
        if (editMode) {
            setEditMode(false)
            return
        }
        setEditMode(true)
        return
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
            <div onClick={switchMode} className="menuItem" style={menuStyle}>Switch Mode</div>
        </div>
    )
}

export default Menu