import { Link } from "react-router-dom"
import Card from "./Card"
import "../styles/cardStyles.css"

export default function CardGrid({ quantity, pages }) {
    return <div className="cardGrid">
        {Array.from({ length: quantity }).map((_, index) => {
            return (
                <Link key={index} to={`/page/${pages[index].name}`} title={pages[index].name}>
                    <Card pageName={pages[index].name} imgSrc={pages[index].src} />
                </Link>
            )
        })}
    </div>
}