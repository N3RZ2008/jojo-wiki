import "./styles/menu.css";

function Menu() {
    const menuStyle = {
        width: "20vw"
    }
    return(
        <div className="menu">
            <div className="menuItem" style={menuStyle}>Item 1</div>
            <div className="menuItem" style={menuStyle}>Item 2</div>
            <div className="menuItem" style={menuStyle}>Item 3</div>
            <div className="menuItem" style={menuStyle}>Item 4</div>
            <div className="menuItem" style={menuStyle}>Item 5</div>
        </div>
    )
}

export default Menu