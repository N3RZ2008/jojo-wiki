import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { findOne } from "../../database/handleApi"

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

    if (loading) return <div className="page"><h1>Loading...</h1></div>
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
                    <p>Role: {userSelected?.role.charAt(0).toUpperCase() + userSelected?.role.slice(1)}</p>
                </div>
            </div>
            <div className="desc">
                <p>{userSelected?.desc ? userSelected?.desc : "Nothing here"}</p>
            </div>
        </div>
    </div>
}