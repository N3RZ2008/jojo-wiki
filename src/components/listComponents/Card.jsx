export default function Card({ pageName, imgSrc }) {
    const src = imgSrc ? imgSrc : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"

    return <div className="cardItem">
        <img src={src} alt="" />
        <h2 title={pageName ? pageName : "Untitled"}>{pageName ? pageName : "Untitled"}</h2>
    </div>
}