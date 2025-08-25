import "./styles/container.css"

export function Title({children}) {
    return(
        <h1>{children}</h1>
    )
}

export function Paragraph({children}) {
    return(
        <p>{children}</p>
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