import ReactDOM from "react-dom"
import "./styles/modal.css"
import { CloseIcon } from "./icons"

export default function SideModal({ children, open, onClose }) {
    if (!open) return null
    return ReactDOM.createPortal(
        <div className="sideModalBackground" onClick={onClose}>
            <div className="sideModalDiv" onClick={e => {e.stopPropagation()}}>
                <button className="editMenuButton" onClick={onClose}><CloseIcon/></button>
                <div>{children}</div>
            </div>
        </div>,
        document.getElementById("side-modal-root")
    )
}
