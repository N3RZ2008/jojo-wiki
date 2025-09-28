import { useState, useEffect, useContext } from "react"

import PageBarGrid from "../listComponents/PageBarGrid"
import Modal from "../Modal"
import { ModalContext } from "../ModalProvider"

import { findAll, updateOne } from "../../database/handleApi"

export default function AdminPageView() {
    const [nameList, setNameList] = useState([])
    const [srcList, setSrcList] = useState([])
    const [statusList, setStatusList] = useState([])
    const [verifiedList, setVerifiedList] = useState([])

    const { isOpen, setIsOpen, pageName, defaultStatus, defaultIsVerified } = useContext(ModalContext)

    const [isVerifiedUpdate, setIsVerifiedUpdate] = useState(false)
    const [statusUpdate, setStatusUpdate] = useState("request")

    const [refresh, setRefresh] = useState(0)
    const { find, loading } = findAll("stands", refresh)

    useEffect(() => {
        if (!loading) {
            if (find !== null) {
                const names = find.map((page) => {
                    return page.data.pageName
                })
                const srcs = find.map((page) => {
                    return page.data.imgSrc
                })
                const status = find.map((page) => {
                    return page.data.status
                })
                const verified = find.map((page) => {
                    return page.data.verified
                })
                setNameList(names)
                setSrcList(srcs)
                setStatusList(status)
                setVerifiedList(verified)
            }
            else {
                console.log("404")
            }
        }
    }, [loading, refresh])

    useEffect(() => {
        setStatusUpdate(defaultStatus)
        setIsVerifiedUpdate(defaultIsVerified)
    }, [defaultStatus, defaultIsVerified])

    useEffect(() => {
        if(isVerifiedUpdate === "true") {
            setIsVerifiedUpdate(true)
        }
        if(isVerifiedUpdate === "false") {
            setIsVerifiedUpdate(false)
        }
    }, [isVerifiedUpdate])

    function tryUpdate() {
        const dataInsert = {
            "data.status": statusUpdate,
            "data.verified": isVerifiedUpdate
        }
        updateOne("stands", pageName, dataInsert)
    }

    function handleSubmit(e) {
        e.preventDefault()
        try {
            tryUpdate()
            alert("Sucessfully updated page")
            setRefresh(refresh+1)
            setIsOpen(false)
        } catch (error) {
            alert(error.message)
        }
    }

    if (loading) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page">
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <h1>{pageName}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Status:
                    <select
                        defaultValue={defaultStatus}
                        onChange={e => { setStatusUpdate(e.target.value) }}
                    >
                        <option value="request">Request</option>
                        <option value="accepted">Accept</option>
                        <option value="rejected">Reject</option>
                    </select>
                </label>
                <label>
                    Verification:
                    <select
                        defaultValue={defaultIsVerified}
                        onChange={e => { setIsVerifiedUpdate(e.target.value) }}
                    >
                        <option value={true}>Verified</option>
                        <option value={false}>Not Verified</option>
                    </select>
                </label>
                <button type="submit">Submit Changes</button>
            </form>
        </Modal>
        <h1>Pages</h1>
        <PageBarGrid quantity={nameList.length} names={nameList} srcs={srcList} status={statusList} isVerified={verifiedList} />
    </div>
}