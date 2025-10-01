import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { DocumentIcon, PencilIcon } from "../icons"
import { UserModalContext } from "../UserModalProvider"

export default function UserBar({ id, email, name, imgSrc }) {
    const navigate = useNavigate()
    const { setIsOpen, setUserId, setUserEmail } = useContext(UserModalContext)

    const src = imgSrc ? imgSrc : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"

    return <div className="barItem">
        <div className="pageData">
            <img src={src} alt="" />
            <h1 title={name} >{name ? name : "Untitled"}</h1>
        </div>
        <div className="status">
            status
        </div>
        <div className="actions">
            <button className="actionButton" onClick={() => { navigate(`/profile/${id}`) }} ><DocumentIcon /></button>
            <button className="actionButton" onClick={() => {
                setIsOpen(true)
                setUserId(id)
                setUserEmail(email)
            }} ><PencilIcon /></button>
        </div>
    </div>
}