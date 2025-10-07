import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { DocumentIcon, PencilIcon } from "../icons"
import { UserModalContext } from "../UserModalProvider"

export default function UserBar({ id, name, imgSrc, role }) {
    const navigate = useNavigate()
    const { setIsOpen, setUserId, setDefaultUserRole } = useContext(UserModalContext)

    const src = imgSrc ? imgSrc : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"

    return <div className="barItem">
        <div className="pageData">
            <img src={src} alt="" />
            <h1 title={name} >{name ? name : "Untitled"}</h1>
        </div>
        <div className="status">
            
        </div>
        <div className="actions">
            <button className="actionButton" onClick={() => { navigate(`/profile/${id}`) }} ><DocumentIcon /></button>
            <button className="actionButton" onClick={() => {
                setIsOpen(true)
                setUserId(id)
                setDefaultUserRole(role)
            }} ><PencilIcon /></button>
        </div>
    </div>
}