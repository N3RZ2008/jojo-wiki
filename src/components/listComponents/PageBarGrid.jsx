import { Link } from "react-router-dom"
import PageBar from "./PageBar"
import "../styles/barStyles.css"

export default function PageBarGrid({ quantity, names, srcs, status, isVerified }) {
    return <div className="barGrid">
        {Array.from({ length: quantity }).map((_, index) => {
            return (
                <PageBar key={index} pageName={names[index]} imgSrc={srcs[index]} status={status[index]} isVerified={isVerified[index]} />
            )
        })}
    </div>
}