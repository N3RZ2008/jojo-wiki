import { useState, useEffect, useContext } from "react"

import UserBarGrid from "../listComponents/UserBarGrid"
import Modal from "../Modal"

import { findAll, updateOne } from "../../database/handleApi"
import { UserModalContext } from "../UserModalProvider"

export default function AdminUserView() {
    const [idList, setIdList] = useState([])
    const [nameList, setNameList] = useState([])
    const [emailList, setEmailList] = useState([])
    const [srcList, setSrcList] = useState([])

    const { isOpen, setIsOpen, userId, userEmail } = useContext(UserModalContext)

    const [refresh, setRefresh] = useState(0)
    const { findAllResults, loadingAll } = findAll("users", refresh)

    useEffect(() => {
        if (!loadingAll) {
            if (findAllResults !== null) {
                const ids = findAllResults.map((user) => {
                    return user.userId
                })
                const names = findAllResults.map((user) => {
                    return user.userName
                })
                const emails = findAllResults.map((user) => {
                    return user.email
                })
                const srcs = findAllResults.map((user) => {
                    return user.profilePicture
                })
                // setNameList(names)
                setIdList(ids)
                setNameList(names)
                setEmailList(emails)
                setSrcList(srcs)
            }
            else {
                console.log("404")
            }
        }
    }, [loadingAll, refresh])

    function tryUpdate() {
        return
        const dataInsert = {
            "data.status": statusUpdate,
            "data.verified": isVerifiedUpdate
        }
        updateOne("stands", pageName, dataInsert)
    }

    function handleSubmit(e) {
        return
        e.preventDefault()
        try {
            tryUpdate()
            alert("Sucessfully updated user")
            setRefresh(refresh + 1)
            setIsOpen(false)
        } catch (error) {
            alert(error.message)
        }
    }

    if (loadingAll) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page">
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <h3>Id: {userId}</h3>
            <h3>Email: {userEmail}</h3>
        </Modal>
        <h1>Users</h1>
        <UserBarGrid quantity={idList.length} ids={idList} names={nameList} emails={emailList} srcs={srcList} />
    </div>
}