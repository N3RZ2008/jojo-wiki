import { useEffect, useState } from "react"
import findAll from "../database/findAll"
import { Link } from "react-router-dom"
import "./styles/page.css"
import "./styles/homepage.css"

export default function Homepage() {
    const [nameList, setNameList] = useState([])
    const { find, loading } = findAll("stands")

    useEffect(() => {
        if (!loading) {
            if (find !== null) {
                const names = find.map((page) => page.data.pageName)
                setNameList(names)
            }
            else {
                console.log("404")
            }
        }
    }, [loading])

    function catalog() {
        if (loading) return 
        return nameList.map((name) => {
            return <Link to={`/page/${name}`}>
                {name}
            </Link>
        })
    }
    
    if (loading) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page homepage">
        <h1>Homepage</h1>
        <div className="catalog">
            { catalog() }
        </div>
    </div>
}