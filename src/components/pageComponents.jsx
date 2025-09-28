import { useEffect, useState } from "react"
import "./styles/pageComponents.css"
import { ArrowDown, ArrowUp, DeleteIcon } from "./icons"

export function Heading({ id, children, editMode, updater, deleter, mover, pos }) {
    const [value, setValue] = useState(children)

    useEffect(() => {
        updater(id, value)
    }, [value])

    if (editMode) {
        return (
            <div className="heading">
                <input
                    className="headingInput"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className="editActions">
                    <button className="editMenuButton" onClick={() => {
                        deleter(id)
                    }}><DeleteIcon /></button>
                    <button className="editMenuButton" onClick={() => {
                        mover(pos - 1)
                    }}><ArrowUp /></button>
                    <button className="editMenuButton" onClick={() => {
                        mover(pos)
                    }}><ArrowDown /></button>
                </div>
            </div>
        )
    }

    if (value == "") setValue("Insert text here")
    return <h1>{value}</h1>
}

export function Paragraph({ id, children, editMode, updater, deleter, mover, pos }) {
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
                <div className="editActions">
                    <button className="editMenuButton" onClick={() => {
                        deleter(id)
                    }}><DeleteIcon /></button>
                    <button className="editMenuButton" onClick={() => {
                        mover(pos - 1)
                    }}><ArrowUp /></button>
                    <button className="editMenuButton" onClick={() => {
                        mover(pos)
                    }}><ArrowDown /></button>
                </div>
            </div>
        )
    }

    if (value == "") setValue("Insert text here")
    return <p>{value}</p>
}

export function Image({ id, src, height, editMode, updater, deleter, mover, pos }) {
    const [srcValue, setSrcValue] = useState(src)
    const [heightValue, setHeightValue] = useState(parseInt(height))
    const imageStyle = {
        height: `${heightValue}vh`
    }

    useEffect(() => {
        updater(id, null, null, srcValue, heightValue, null)
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
                <div className="editActions">
                    <button className="editMenuButton" onClick={() => {
                        deleter(id)
                    }}><DeleteIcon /></button>
                    <button className="editMenuButton" onClick={() => {
                        mover(pos - 1)
                    }}><ArrowUp /></button>
                    <button className="editMenuButton" onClick={() => {
                        mover(pos)
                    }}><ArrowDown /></button>
                </div>
            </div>
        )
    }

    return (
        <img className="image" src={srcValue} style={imageStyle} />
    )
}

export function TwoParagraph({ id, childrenA, childrenB, editMode, updater, deleter, mover, pos }) {
    const [valueA, setValueA] = useState(childrenA)
    const [valueB, setValueB] = useState(childrenB)

    useEffect(() => {
        updater(id, null, valueA, null, null, valueB)
    }, [valueA, valueB])

    if (editMode) {
        return (
            <>
                <div className="containerItem twoParagraph">
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
                <div className="editActions">
                    <button className="editMenuButton" onClick={() => {
                        deleter(id)
                    }}><DeleteIcon /></button>
                    <button className="editMenuButton" onClick={() => {
                        mover(pos - 1)
                    }}><ArrowUp /></button>
                    <button className="editMenuButton" onClick={() => {
                        mover(pos)
                    }}><ArrowDown /></button>
                </div>
            </>
        )
    }

    return (
        <div className="containerItem">
            <p>{valueA}</p>
            <p>{valueB}</p>
        </div>
    )
}