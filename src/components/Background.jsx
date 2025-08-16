import "./background.css"

function Background({children}) {
    return <div>
        <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/03/Dark-Souls-Firelink-Shrine-Characters-Who-Betray-You.jpg" alt="" />
        {children}
    </div>
}

export default Background