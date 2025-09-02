import { useContext } from "react";
import "./styles/menu.css";
import { PageContext } from "./PageProvider";


function Menu({switchMode}) {
    const { editMode, setEditMode } = useContext(PageContext)
    const menuStyle = {
        width: "20vw"
    }

    function switchMode() {
        if(editMode) {
            setEditMode(false)
            return
        }
        setEditMode(true)
        return
    }

    return(
        <div className="menu">
            <div className="menuItem" style={menuStyle}>Item 1</div>
            <div className="menuItem" style={menuStyle}>Item 2</div>
            <div className="menuItem" style={menuStyle}>Item 3</div>
            <div className="menuItem" style={menuStyle}>Item 4</div>
            <div onClick={switchMode} className="menuItem" style={menuStyle}>Switch Mode</div>
        </div>
    )
}

export default Menu