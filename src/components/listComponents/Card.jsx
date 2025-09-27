export default function Card({ pageName, imgSrc }) {
    const src = imgSrc ? imgSrc : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"

    return <div className="cardItem">
        <img src={src} alt="" />
        <h1>{pageName ? pageName : "Untitled"}</h1>
    </div>
}