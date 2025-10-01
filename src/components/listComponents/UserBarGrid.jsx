import UserBar from "./UserBar"
import "../styles/barStyles.css"

export default function UserBarGrid({ quantity, ids, names, emails, srcs }) {
    return <div className="barGrid">
        {Array.from({ length: quantity }).map((_, index) => {
            return (
                <UserBar key={index} id={ids[index]} name={names[index]} email={emails[index]} imgSrc={srcs[index]} />
            )
        })}
    </div>
}