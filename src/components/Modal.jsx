import "./styles/modal.css"

function Modal({children, open, onClose}) {
    if (!open) return null
    return (
        <div className="modal">
            <button onClick={onClose}>Close Modal</button>
            <div>{children}</div>
        </div>
    )
}

export default Modal