import { useState } from "react"
import Modal from "./Modal.jsx"
import "./styles/container.css"
import "./styles/image.css"

export function Title({id, children, editMode, updater, deleter}) {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(children)

    function edit(editMode) {
        if (!editMode) {
            return
        }
        setIsOpen(true)
    }

    return(
        <>
            <h1 onClick={() => edit(editMode)}>{value}</h1>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <label>
                    <input 
                        name="Title" 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)}
                    />  
                    <button onClick={() => {
                        if (value == "") setValue("Insert text here")
                        updater(id, value);
                        setIsOpen(false)
                    }}>Submit</button>
                </label>
                <button onClick={() => {
                    deleter(id)
                    setIsOpen(false)
                }}>Delete</button>
            </Modal>
        </>
    )
}

export function Paragraph({id, children, editMode, updater, deleter}) {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(children)

    function edit(editMode) {
        if (!editMode) {
            return
        }
        setIsOpen(true)
    }

    return(
        <>
            <p onClick={() => edit(editMode)}>{value}</p>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <label>
                    <textarea 
                        name="Paragraph" 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)}
                    />  
                    <button onClick={() => {
                        if (value == "") setValue("Insert text here")
                        updater(id, value);
                        setIsOpen(false)
                    }}>Submit</button>
                </label>
                <button onClick={() => {
                    deleter(id)
                    setIsOpen(false)
                }}>Delete</button>
            </Modal>
        </>
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