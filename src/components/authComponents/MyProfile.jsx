import { useContext, useEffect, useState } from "react"

import { findAll, findOne, updateOne } from "../../database/handleApi"
import { AuthContext } from "./AuthProvider"

import "../styles/page.css"
import "../styles/profile.css"

export default function Profile() {
    const [userSelected, setUserSelected] = useState(null)
    const [userName, setUserName] = useState("Undefined")
    const [userPfp, setUserPfp] = useState("")
    const [userDesc, setUserDesc] = useState("")
    const { user, loadingUser } = useContext(AuthContext)
    const { find, loading } = findOne("users", user?.id)
    const { findAllResults, loadingAll } = findAll("users")

    useEffect(() => {
        if (!loading && !loadingAll) {
            setUserSelected(find)
            setUserName(userSelected?.userName)
            setUserPfp(userSelected?.profilePicture)
            setUserDesc(userSelected?.desc)
        }
    }, [find, loading, loadingAll, userSelected])

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
    
    if (loading || loadingAll || loadingUser) return <div className="page"><h1>Loading...</h1></div>
    if (userSelected === null) return <div className="page">User Not Found</div>

    return <div className="page">
        <h1>Your profile</h1>
        <div className="profile">
            <div className="info">
                <div className="infoImg">
                    <img src={userPfp} alt="" />
                    <input
                        type="text"
                        value={userPfp}
                        onChange={(e) => { setUserPfp(e.target.value) }}
                    />
                </div>
                <div className="infoText">
                    <label>Username:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => { setUserName(e.target.value) }}
                        />
                    </label>
                    <p>Email: {userSelected?.email}</p>
                    <p>Role: {userSelected?.role.charAt(0).toUpperCase() + userSelected?.role.slice(1)}</p>
                </div>
            </div>
            <div className="desc">
                <textarea
                    value={userDesc}
                    onChange={(e) => { setUserDesc(e.target.value) }}
                />
            </div>
            <button onClick={handleSubmit} >Submit Changes</button>
        </div>
    </div>
}