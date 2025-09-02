import { useEffect, useState } from "react"
import Modal from "./Modal.jsx"
import "./styles/pageComponents.css"

export function Title({ id, children, editMode, updater, deleter }) {
    const [value, setValue] = useState(children)

    useEffect(() => {
        updater(id, value)
    }, [value])

    if (editMode) {
        return (
            <div className="title">
                <input
                    className="titleInput"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={() => {
                    deleter(id)
                    setIsOpen(false)
                }}>Delete</button>
            </div>
        )
    }
    
    if (value == "") setValue("Insert text here")
    return <h1>{value}</h1>
}

export function Paragraph({ id, children, editMode, updater, deleter }) {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(children)

    function edit(editMode) {
        if (!editMode) {
            return
        }
        setIsOpen(true)
    }

    return (
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

export function Image({ src, height }) {
    const imageStyle = {
        height: height
    }
    return (
        <img className="image" src={src} style={imageStyle}></img>
    )
}

export function TwoParagraph({ childrenA, childrenB }) {
    return (
        <div className="container">
            <p>{childrenA}</p>
            <p>{childrenB}</p>
        </div>
    )
}