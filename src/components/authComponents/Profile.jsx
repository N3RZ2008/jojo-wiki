import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { findAll, findOne, updateOne } from "../../database/handleApi"
import { AuthContext } from "./AuthProvider"

import "../styles/page.css"
import "../styles/profile.css"

export default function Profile() {
    const [userSelected, setUserSelected] = useState(null)
    const { userId } = useParams()
    const { find, loading } = findOne("users", userId)

    useEffect(() => {
        if (!loading) {
            setUserSelected(find)
        }
    }, [find, loading])

    if (loading) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>
    if (userSelected === null) return <div className="page">User Not Found</div>

    return <div className="page">
        <h1>Profile</h1>
        <div className="profile">
            <div className="info">
                <div className="infoImg">
                    <img src={userSelected?.profilePicture} alt="" />
                </div>
                <div className="infoText">
                    <p>Username: {userSelected?.userName}</p>
                    <p>Email: {userSelected?.email}</p>
                    <p>Role: {userSelected?.isAdmin ? "Admin" : "User"}</p>
                </div>
            </div>
            <div className="desc">
                <p>{userSelected?.desc ? userSelected?.desc : "Nothing here"}</p>
            </div>
        </div>
        <button onClick={() => { console.log(userSelected?.desc !== undefined) }}>debug</button>
    </div>
}