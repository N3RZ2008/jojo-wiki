import { useState } from "react"
import Page from "./Page.jsx"
import Modal from "./Modal.jsx"

function Adder() {
    const [editMode, setEditMode] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState([])

    function addComp(type) {
        setPage([
            ...page,
            {"type": type, "props": {"children": "Title"}}
        ])
    }

    return(
        <div className="adderPage">
            <Page layout={page} editMode={editMode}/>
            <button onClick={() => setIsOpen(true)}>Add</button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <button onClick={() => addComp("title")}>Title</button>
            </Modal>
        </div>
    )
}

export default Adder