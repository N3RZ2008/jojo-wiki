import { useEffect, useState } from "react"
import { findAll } from "../database/handleApi"
import CardGrid from "./CardGrid"
import "./styles/page.css"
import "./styles/homepage.css"

export default function Homepage() {
    const [nameList, setNameList] = useState([])
    const [srcList, setSrcList] = useState([])
    const { find, loading } = findAll("stands")

    useEffect(() => {
        if (!loading) {
            if (find !== null) {
                const names = find.map((page) => page.data.pageName)
                const srcs = find.map((page) => page.data.imgSrc)
                setNameList(names)
                setSrcList(srcs)
            }
            else {
                console.log("404")
            }
        }
    }, [loading])

    if (loading) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page homepage">
        <h1>Pages</h1>
        <CardGrid quantity={nameList.length} names={nameList} srcs={srcList}/>
    </div>
}