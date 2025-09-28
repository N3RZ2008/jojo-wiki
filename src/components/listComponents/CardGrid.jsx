import { Link } from "react-router-dom"
import Card from "./Card"
import "../styles/cardStyles.css"

export default function CardGrid({ quantity, names, srcs }) {
    return <div className="cardGrid">
        {Array.from({ length: quantity }).map((_, index) => {
            return (
                <Link key={index} to={`/page/${names[index]}`} title={names[index]}>
                    <Card pageName={names[index]} imgSrc={srcs[index]} />
                </Link>
            )
        })}
    </div>
}