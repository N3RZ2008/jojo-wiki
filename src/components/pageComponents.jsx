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
                }}>Delete</button>
            </div>
        )
    }

    if (value == "") setValue("Insert text here")
    return <h1>{value}</h1>
}

export function Paragraph({ id, children, editMode, updater, deleter }) {
    const [value, setValue] = useState(children)

    useEffect(() => {
        updater(id, value)
    }, [value])

    if (editMode) {
        return (
            <div className="paragraph">
                <textarea
                    className="paragraphInput"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button onClick={() => {
                    deleter(id)
                }}>Delete</button>
            </div>
        )
    }

    if (value == "") setValue("Insert text here")
    return <p>{value}</p>
}

export function Image({ id, src, height, editMode, updater, deleter }) {
    const [srcValue, setSrcValue] = useState(src)
    const [heightValue, setHeightValue] = useState(parseInt(height))
    const imageStyle = {
        height: `${heightValue}vh`
    }

    useEffect(() => {
        updater(id, srcValue, heightValue)
    }, [srcValue, heightValue])

    if (editMode) {
        return (
            <div className="imageContainer">
                <img className="image" src={srcValue} style={imageStyle} />
                <div>
                    <input
                        className="imageInput"
                        type="text"
                        value={srcValue}
                        placeholder="Insert URL"
                        onChange={(e) => setSrcValue(e.target.value)}
                    />
                    <input
                        className="imageInput"
                        type="number"
                        value={heightValue}
                        min={"1"}
                        max={"100"}
                        placeholder="Insert height"
                        onChange={(e) => setHeightValue(e.target.value)}
                    />
                </div>
                <button onClick={() => {
                    deleter(id)
                }}>Delete</button>
            </div>
        )
    }

    return (
        <img className="image" src={srcValue} style={imageStyle} />
    )
}

export function TwoParagraph({ id, childrenA, childrenB, editMode, updater, deleter }) {
    const [valueA, setValueA] = useState(childrenA)
    const [valueB, setValueB] = useState(childrenB)

    if (editMode) {
        return (
            <>
                <div className="container twoParagraph">
                    <div className="paragraph twoParagraphP">
                        <textarea
                            className="paragraphInput"
                            type="text"
                            value={valueA}
                            onChange={(e) => setValueA(e.target.value)}
                        />
                    </div>
                    <div className="paragraph twoParagraphP">
                        <textarea
                            className="paragraphInput"
                            type="text"
                            value={valueB}
                            onChange={(e) => setValueB(e.target.value)}
                        />
                    </div>
                </div>
                <button onClick={() => {
                    deleter(id)
                }}>Delete</button>
            </>
        )
    }

    return (
        <div className="container">
            <p>{valueA}</p>
            <p>{valueB}</p>
        </div>
    )
}