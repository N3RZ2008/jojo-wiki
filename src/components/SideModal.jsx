import ReactDOM from "react-dom"
import "./styles/modal.css"

export default function SideModal({ children, open, onClose }) {
    if (!open) return null
    return ReactDOM.createPortal(
        <div className="sideModalBackground" onClick={onClose}>
            <div className="sideModalDiv" onClick={e => {e.stopPropagation()}}>
                <button onClick={onClose}>X</button>
                <div>{children}</div>
            </div>
        </div>,
        document.getElementById("side-modal-root")
    )
}
