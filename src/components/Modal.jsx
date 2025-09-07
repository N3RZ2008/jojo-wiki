import ReactDOM from "react-dom"
import "./styles/modal.css"

function Modal({ children, open, onClose }) {
    if (!open) return null
    return ReactDOM.createPortal(
        <div className="modalBackground">
            <div className="modal">
                <button onClick={onClose}>Close Modal</button>
                <div>{children}</div>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}

export default Modal