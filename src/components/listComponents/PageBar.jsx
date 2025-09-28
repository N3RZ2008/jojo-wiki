import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { ModalContext } from "../ModalProvider"

import { DeleteIcon, DocumentIcon, PencilIcon } from "../icons"

export default function PageBar({ pageName, imgSrc, status, isVerified }) {
    const navigate = useNavigate()
    const { setIsOpen, setPageName, setDefaultStatus, setDefaultIsVerified } = useContext(ModalContext)

    const src = imgSrc ? imgSrc : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
    const statusText = `Status: ${status.charAt(0).toUpperCase() + status.slice(1)}`
    const verifiedText = `${!isVerified ? "Not " : ""}Verified`

    return <div className="barItem">
        <div className="pageData">
            <img src={src} alt="" />
            <h1 title={pageName} >{pageName ? pageName : "Untitled"}</h1>
        </div>
        <div className="status">
            <h3 title={statusText}>{statusText}</h3>
            <h3 title={verifiedText}>{verifiedText}</h3>
        </div>
        <div className="actions">
            <button className="actionButton" onClick={() => { navigate(`/page/${pageName}`) }} ><DocumentIcon /></button>
            <button className="actionButton" onClick={() => { 
                setIsOpen(true) 
                setPageName(pageName) 
                setDefaultStatus(status)
                setDefaultIsVerified(isVerified)
                }} ><PencilIcon /></button>
        </div>
    </div>
}