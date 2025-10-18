import ReactDOM from "react-dom"
import "./styles/modal.css"
import { CloseIcon } from "./icons"

export default function Modal({ children, open, onClose }) {
    if (!open) return ReactDOM.createPortal(
        <div className="modalBackground" onClick={onClose}>
            <div className="modalDiv" onClick={e => {e.stopPropagation()}}>
                <button className="editMenuButton" onClick={onClose}><CloseIcon/></button>
                <div>{children}</div>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
    return ReactDOM.createPortal(
        <div className="modalBackground show" onClick={onClose}>
            <div className="modalDiv show" onClick={e => {e.stopPropagation()}}>
                <button className="editMenuButton" onClick={onClose}><CloseIcon/></button>
                <div>{children}</div>
            </div>
        </div>,
        document.getElementById("modal-root")
    )
}
