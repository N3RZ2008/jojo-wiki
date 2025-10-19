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
                    src: page.data.imgSrc,
                    userId: page.data.userId
                }))
                setPages(pages)
            }
            else {
                console.log("404")
            }
        }
    }, [loadingAll, onlyVerifiedFilter, nameFilter])

    if (loadingAll) return <div className="page"><h1>Loading...</h1></div>

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
            <button className="editMenuButton" onClick={() => { 
                if (isOpen) {
                    return setIsOpen(false)
                }
                setIsOpen(true)
             }}><FilterIcon/></button>,
            document.getElementById("switch-edit-root")
        )}
    </div>
}