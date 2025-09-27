import { DeleteIcon, DocumentIcon, PencilIcon } from "../icons"

export default function Bar({ pageName, imgSrc, status, isVerified }) {
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
            <button className="actionButton" ><DocumentIcon /></button>
            <button className="actionButton" ><PencilIcon /></button>
            <button className="actionButton" ><DeleteIcon /></button>
        </div>
    </div>
}