import { useEffect, useState } from "react"
import { findOne } from "../database/handleApi"
import "./styles/page.css"
import { useParams } from "react-router-dom"

export default function Profile() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const { find, loading } = findOne("users", userId)

    useEffect(() => {
        if (!loading) {
            setUser(find)
        }
    }, [find, loading])

    if (loading) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>
    if (user === null) return <div className="page profile">User Not Found</div>

    return <div className="page profile">
        <h1>Logged with {user?.email}</h1>
        <img src={user?.profilePicture} alt="" />
        <button onClick={() => { console.log(user) }}>debug</button>
    </div>
}