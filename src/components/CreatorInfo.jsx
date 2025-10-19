import ReactDOM from "react-dom"
import "./styles/modal.css"
import { Link } from "react-router-dom"

export default function CreatorInfo({ children, creatorId, creatorName }) {
    return ReactDOM.createPortal(
        <Link to={`/profile/${creatorId}`}>
            <div className="bottomModal" title={creatorName}>
                {children}
            </div>
        </Link>,
        document.getElementById("bottom-modal-root")
    )
}
