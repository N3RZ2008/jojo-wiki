import { useEffect, useState } from "react"
import { findAll } from "../database/handleApi"

import CardGrid from "./listComponents/CardGrid"

import "./styles/page.css"
import "./styles/homepage.css"
import SideModal from "./SideModal"

export default function Homepage() {
    const [isOpen, setIsOpen] = useState(false)
    const [nameList, setNameList] = useState([])
    const [srcList, setSrcList] = useState([])
    const [onlyVerified, setOnlyVerified] = useState(true)
    const { findAllResults, loadingAll } = findAll("stands")

    // useEffect(() => {
    //     console.log(nameList)
    //     console.log(srcList)
    // }, [nameList, srcList]);

    useEffect(() => {
        if (!loadingAll) {
            if (findAllResults !== null) {
                const names = findAllResults.map((page) => {
                    if (page.data.status === "accepted") {
                        if (!(onlyVerified && !page.data.verified)) {
                            return page.data.pageName
                        }
                        return undefined
                    }
                })
                const srcs = findAllResults.map((page) => {
                    if (page.data.status === "accepted") {
                        if (!(onlyVerified && !page.data.verified)) {
                            return page.data.imgSrc
                        }
                        return undefined
                    }
                })
                setNameList(names.filter((name) => { return name }))
                setSrcList(srcs)
            }
            else {
                console.log("404")
            }
        }
    }, [loadingAll, onlyVerified])

    if (loadingAll) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page homepage">
        <SideModal open={isOpen} onClose={() => setIsOpen(false)}>
            <h1>Filters</h1>
            <button
                onClick={() => {
                    if (onlyVerified) {
                        setOnlyVerified(false)
                    } else {
                        setOnlyVerified(true)
                    }
                }}
            >onlyVerified = {onlyVerified ? "True" : "False"}</button>
        </SideModal>
        <h1>Pages</h1>
        <button onClick={() => { setIsOpen(true) }}>Modal</button>
        <CardGrid quantity={nameList.length} names={nameList} srcs={srcList} />
    </div>
}