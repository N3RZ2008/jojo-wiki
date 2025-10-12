import ReactDOM from "react-dom"
import "./styles/modal.css"

export default function Modal({ children, open, onClose }) {
    if (!open) return null
    return ReactDOM.createPortal(
        <div className="modalBackground" onClick={onClose}>
            <div className="modalDiv" onClick={e => {e.stopPropagation()}}>
                <button onClick={onClose}>X</button>
                <div>{children}</div>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}
