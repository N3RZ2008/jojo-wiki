import { useNavigate } from "react-router-dom"

export default function Card({ pageName, imgSrc, creatorId, creatorName, creatorPfp }) {
    const nav = useNavigate()
    const src = imgSrc ? imgSrc : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"

    return <div className="cardItem">
        <img src={src} alt="" />
        <h2 title={pageName ? pageName : "Untitled"}>{pageName ? pageName : "Untitled"}</h2>
        <div className="creator" title={creatorName} onClick={(e) => {
            e.preventDefault()
            nav(`/profile/${creatorId}`)
        }}>
            <img src={creatorPfp} alt="" />
            <span>
                {creatorName}
            </span>
        </div>
    </div>
}