import { useState, useEffect } from "react"

import BarGrid from "../listComponents/BarGrid"

import { findAll } from "../../database/handleApi"

export default function AdminPageView() {
    const [nameList, setNameList] = useState([])
    const [srcList, setSrcList] = useState([])
    const [statusList, setStatusList] = useState([])
    const [verifiedList, setVerifiedList] = useState([])
    const { find, loading } = findAll("stands")

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
    }, [loading])


    if (loading) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page">
        <BarGrid quantity={nameList.length} names={nameList} srcs={srcList} status={statusList} isVerified={verifiedList} />
    </div>
}