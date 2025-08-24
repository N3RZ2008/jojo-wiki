import "./background.css"

function Background({children}) {
    const backgroundStyle = {
        backgroundImage: "url(https://i.pinimg.com/originals/7a/0b/72/7a0b7282169da87315fe42bcf59d1fbb.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }

    return <div style={backgroundStyle}>
        {children}
    </div>
}

export default Background