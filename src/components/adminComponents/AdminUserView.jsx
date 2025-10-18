import { useState, useEffect, useContext } from "react"

import UserBarGrid from "../listComponents/UserBarGrid"
import Modal from "../Modal"

import { findAll, updateOne } from "../../database/handleApi"
import { UserModalContext } from "../UserModalProvider"

export default function AdminUserView() {
    const [idList, setIdList] = useState([])
    const [nameList, setNameList] = useState([])
    const [srcList, setSrcList] = useState([])
    const [roleList, setRoleList] = useState([])

    const { isOpen, setIsOpen, userId, defaultUserRole, setDefaultUserRole } = useContext(UserModalContext)

    const [roleUpdate, setRoleUpdate] = useState(false)

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
                const roles = findAllResults.map((user) => {
                    if (user.isAdmin) return "admin"
                    return "user"
                })
                const srcs = findAllResults.map((user) => {
                    return user.profilePicture
                })
                setIdList(ids)
                setNameList(names)
                setSrcList(srcs)
                setRoleList(roles)
            }
            else {
                console.log("404")
            }
        }
    }, [loadingAll, refresh])

    useEffect(() => {
        setRoleUpdate(defaultUserRole)
    }, [defaultUserRole]);
    

    function tryUpdate() {
        let isAdmin = false
        if (roleUpdate === "admin") isAdmin = true

        const dataInsert = {
            isAdmin: isAdmin
        }
        updateOne("users", userId, dataInsert)
    }

    function handleSubmit(e) {
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

    if (loadingAll) return <div className="page"><h1>Loading...</h1></div>

    return <div className="page">
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <form onSubmit={handleSubmit}>
                <label>
                    Role:
                    <select
                        defaultValue={defaultUserRole}
                        onChange={e => { setDefaultUserRole(e.target.value) }}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </label>
                <button type="submit">Submit Changes</button>
            </form>
        </Modal>
        <h1>Users</h1>
        <UserBarGrid quantity={idList.length} ids={idList} names={nameList} srcs={srcList} roles={roleList} />
    </div>
}