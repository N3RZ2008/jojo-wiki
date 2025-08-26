import { useState } from "react";
import Modal from "./Modal.jsx"
import "./styles/page.css"
// import "./styles/adder.css"

function Adder() {
    const [isOpen, setIsOpen] = useState(false)
    // const [page, setPage] = useState([])

    return(
        <div className="page">
            <button onClick={() => setIsOpen(true)}>Add</button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <select name="component" id="component">
                    <option value="title">Title</option>
                    <option value="paragraph">Paragraph</option>
                </select>
            </Modal>
        </div>
    )
}

export default Adder