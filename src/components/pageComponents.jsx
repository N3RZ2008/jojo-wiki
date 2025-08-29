import Modal from "./Modal.jsx"
import "./styles/container.css"
import "./styles/image.css"

export function Title({children}) {

    function edit(key) {
        if (!key) {
            return
        }
        <Modal>
            Title
        </Modal>
    }

    return(
        <h1>{children}</h1>
    )
}

export function Paragraph({children}) {
    return(
        <p>{children}</p>
    )
}

export function Image({src, height}) {
    const imageStyle = {
        height: height
    }
    return(
        <img className="image" src={src} style={imageStyle}></img>
    )
}

export function Container({children, direction}) {
    const containerStyle = {
        flexDirection: direction
    }
    return(
        <div className="container" style={containerStyle}>
            {children}
        </div>
    )
}