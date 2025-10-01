import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { findAll, findOne, updateOne } from "../../database/handleApi"
import { AuthContext } from "./AuthProvider"

import "../styles/page.css"
import "../styles/profile.css"

export default function Profile() {
    const [userSelected, setUserSelected] = useState(null)
    const [userName, setUserName] = useState("Undefined")
    const [userPfp, setUserPfp] = useState("")
    const [userDesc, setUserDesc] = useState("")
    const { user } = useContext(AuthContext)
    const { userId } = useParams()
    const { find, loading } = findOne("users", userId)
    const { findAllResults, loadingAll } = findAll("users")

    useEffect(() => {
        if (!loading && !loadingAll) {
            setUserSelected(find)
            setUserName(userSelected?.userName)
            setUserPfp(userSelected?.profilePicture)
            setUserDesc(userSelected?.desc)
        }
    }, [find, loading, loadingAll])

    function handleSubmit() {
        if (findAllResults.filter((user) => user?.userName === userName).length > 0 && userSelected?.userName !== userName) return alert("Username already taken")
        const dataInsert = {
            userName: userName,
            desc: userDesc,
            profilePicture: userPfp
        }
        updateOne("users", user?.id, dataInsert)
        alert("Sucessfully updated user")
    }

    if (loading || loadingAll) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>
    if (userSelected === null) return <div className="page">User Not Found</div>
    if (user?.id === userId && !loading) {
        return <div className="page">
            <h1>Your profile</h1>
            <div className="profile">
                <div className="info">
                    <div className="infoImg">
                        <img src={userPfp} alt="" />
                        <input
                            type="text"
                            defaultValue={userPfp}
                            onChange={(e) => { setUserPfp(e.target.value) }}
                        />
                    </div>
                    <div className="infoText">
                        <label>Username:
                            <input
                                type="text"
                                defaultValue={userName}
                                onChange={(e) => { setUserName(e.target.value) }}
                            />
                        </label>
                        <p>Email: {userSelected?.email}</p>
                        <p>Role: {userSelected?.isAdmin ? "Admin" : "User"}</p>
                    </div>
                </div>
                <div className="desc">
                    <textarea
                        defaultValue={userDesc}
                        onChange={(e) => { setUserDesc(e.target.value) }}
                    />
                </div>
                <button onClick={handleSubmit} >Submit Changes</button>
            </div>
            <button onClick={() => { console.log(userSelected?.desc !== undefined) }}>debug</button>
        </div>
    }

    return <div className="page">
        <h1>Profile</h1>
        <div className="profile">
            <div className="info">
                <img src={userSelected?.profilePicture} alt="" />
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