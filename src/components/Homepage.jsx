import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { findAll } from "../database/handleApi"

import CardGrid from "./listComponents/CardGrid"

import "./styles/page.css"
import "./styles/homepage.css"
import SideModal from "./SideModal"
import { FilterIcon } from "./icons"

export default function Homepage() {
    const [isOpen, setIsOpen] = useState(false)
    const [pages, setPages] = useState([])
    const [onlyVerifiedFilter, setOnlyVerifiedFilter] = useState(true)
    const [nameFilter, setNameFilter] = useState("")
    const { findAllResults, loadingAll } = findAll("stands")

    useEffect(() => {
        if (!loadingAll) {
            if (findAllResults !== null) {
                const pages = findAllResults
                .filter(page => page.data.status === "accepted")
                .filter(page => !(onlyVerifiedFilter && !page.data.verified))
                .filter(page => page.data.pageName?.toLowerCase().includes(nameFilter.toLowerCase()))
                .map(page => ({
                    name: page.data.pageName,
                    src: page.data.imgSrc
                }))
                setPages(pages)
            }
            else {
                console.log("404")
            }
        }
    }, [loadingAll, onlyVerifiedFilter, nameFilter])

    useEffect(() => {
        console.log(pages)
    }, []);

    if (loadingAll) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page homepage">
        <SideModal open={isOpen} onClose={() => setIsOpen(false)}>
            <h1>Filters</h1>
            <label>Name:
                <input type="text"
                    value={nameFilter}
                    onChange={(e) => {setNameFilter(e.target.value)}}
                />
            </label>
            <label>Only Verified Pages:
                <input type="checkbox"
                    checked={onlyVerifiedFilter}
                    onChange={(e) => {setOnlyVerifiedFilter(e.target.checked)}}
                />
            </label>
        </SideModal>
        <h1>Pages</h1>

        <CardGrid quantity={pages.length} pages={pages} />
        {ReactDOM.createPortal(
            <button className="editMenuButton" onClick={() => { setIsOpen(true) }}><FilterIcon/></button>,
            document.getElementById("switch-edit-root")
        )}
    </div>
}