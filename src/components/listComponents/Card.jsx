import { Link } from "react-router-dom"

export default function Card({ pageName, imgSrc, creatorId, creatorName, creatorPfp }) {
    const src = imgSrc ? imgSrc : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"

    return <div className="cardItem">
        <img src={src} alt="" />
        <h2 title={pageName ? pageName : "Untitled"}>{pageName ? pageName : "Untitled"}</h2>
        <div className="creator" title={creatorName}>
            <img src={creatorPfp} alt="" />
            <Link style={{color: "white"}} to={`/profile/${creatorId}`}>
                {creatorName}
            </Link>
        </div>
    </div>
}