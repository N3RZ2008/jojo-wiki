import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Card from "./Card"
import "../styles/cardStyles.css"
import { findAll } from "../../database/handleApi"

export default function CardGrid({ quantity, pages }) {
    const { findAllResults, loadingAll } = findAll("users")
    const [userMap, setUserMap] = useState({})

    useEffect(() => {
        if (!loadingAll) {
            if (findAllResults !== null) {
                const userMap = findAllResults.reduce((acc, user) => {
                    acc[user.userId] = {
                        name: user.userName,
                        pfp: user.profilePicture
                    }
                    return acc
                }, {})
                setUserMap(userMap)
            }
            else {
                console.log("404")
            }
        }
    }, [loadingAll])

    return <div className="cardGrid">
        {Array.from({ length: quantity }).map((_, index) => {
            return (
                <Link key={index} to={`/page/${pages[index].name}`}>
                    <Card
                        pageName={pages[index].name}
                        imgSrc={pages[index].src}
                        creatorId={pages[index].userId}
                        creatorName={userMap[pages[index].userId]?.name ?? "Loading..."}
                        creatorPfp={userMap[pages[index].userId]?.pfp ?? "https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png"}
                    />
                </Link>
            )
        })}
    </div>
}