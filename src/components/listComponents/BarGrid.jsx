import { Link } from "react-router-dom"
import Bar from "./Bar"
import "../styles/barStyles.css"

export default function BarGrid({ quantity, names, srcs, status, isVerified }) {
    return <div className="barGrid">
        {Array.from({ length: quantity }).map((_, index) => {
            return (
                <Link to={""}>
                    <Bar key={index} pageName={names[index]} imgSrc={srcs[index]} status={status[index]} isVerified={isVerified[index]} />
                </Link>
            )
        })}
    </div>
}