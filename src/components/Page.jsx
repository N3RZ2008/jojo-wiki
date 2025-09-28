import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ReactDOM from "react-dom"

import { Heading, Paragraph, TwoParagraph, Image } from "./pageComponents"
import { AuthContext } from "./authComponents/AuthProvider.jsx"
import Modal from "./Modal.jsx"

import {
    DeleteIcon,
    HeadingIcon,
    ImageIcon,
    ParagraphIcon,
    PencilIcon,
    SubmitIcon,
    TwoParagraphIcon
} from "./icons.jsx"

import { findOne, insertOne, updateOne, deleteOne, useCheckAdmin } from "../database/handleApi.jsx"
import { api } from "../database/api.js"

import "./styles/page.css"

const componentMap = {
    heading: Heading,
    paragraph: Paragraph,
    twoParagraph: TwoParagraph,
    image: Image
}

function DynamicRenderer({ layout, editMode, updater, deleter, mover}) {
    return (
        layout.map(
            (item, index) => {
                const Component = componentMap[item.type];
                return <Component
                    key={item.id}
                    id={item.id}
                    {...item.props}
                    editMode={editMode}
                    updater={updater}
                    deleter={deleter}
                    mover={mover}
                    pos={index}
                />
            }
        )
    )
}

function Page() {
    const { insertedName } = useParams()
    const navigate = useNavigate()
    const [page, setPage] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [pageName, setPageName] = useState("")
    const [pageUser, setPageUser] = useState("")
    const [imgSrc, setImgSrc] = useState("")
    const errorPage = [
        {
            "id": 1,
            "type": "heading",
            "props": {
                "children": "404"
            }
        }
    ]
    const { find, loading } = findOne("stands", insertedName)
    const { user } = useContext(AuthContext)
    const { isAdmin } = useCheckAdmin(user?.id)

    useEffect(() => {
        if (!loading) {
            if (find !== null) {
                setPage(find.page)
                setPageName(find.data.pageName)
                setImgSrc(find.data.imgSrc)
                setPageUser(find.data.userId)
            }
            else {
                if (insertedName === undefined) {
                    setAddMode(true)
                    setPage([])
                } else {
                    setPage(errorPage)
                }
            }
        }
    }, [find, loading])

    useEffect(() => {
        console.log()
    }, [page])

    function switchMode() {
        if (user === null) return alert("Login first")
        if (editMode) {
            return setEditMode(false)
        }
        return setEditMode(true)
    }

    function checkPerm() {
        if (addMode) return true
        if (isAdmin) return true
        if (pageUser === user?.id) return true
        return false
    }

    function addComp(type) {
        if (type.toString() === "twoParagraph") {
            setPage([
                ...page,
                {
                    "id": crypto.randomUUID(),
                    "type": type,
                    "props": {
                        "childrenA": "Insert text here",
                        "childrenB": "Insert text here"
                    }
                }
            ])
            return
        }
        if (type.toString() === "image") {
            setPage([
                ...page,
                {
                    "id": crypto.randomUUID(),
                    "type": type,
                    "props": {
                        "src": "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
                        "height": "50vh"
                    }
                }
            ])
            return
        }
        setPage([
            ...page,
            {
                "id": crypto.randomUUID(),
                "type": type,
                "props": {
                    "children": "Insert text here",
                }
            }
        ])
    }

    function updateComp(id, children, childrenA, srcValue, heightValue, childrenB, layout = page) {
        const update = layout.map(comp => {
            if (comp.id === id) {
                if (childrenA && childrenB) {
                    return { ...comp, props: { ...comp.props, childrenA: childrenA, childrenB: childrenB } }
                }
                if (srcValue && heightValue) {
                    return { ...comp, props: { ...comp.props, src: srcValue, height: `${heightValue}vh` } }
                }
                return { ...comp, props: { ...comp.props, children: children } }
            }
            if (comp.children) {
                return { ...comp, children: updateComp(id, children, comp.children) }
            }
            return comp
        })
        if (layout == page) setPage(update);
        return update
    }

    function deleteComp(id, layout = page) {
        const update = layout
            .filter(comp => comp.id !== id)
            .map(comp => {
                if (comp.children) {
                    return { ...comp, children: deleteComp(id, comp.children) }
                }
                return comp
            })
        if (layout == page) setPage(update);
        return update
    }

    function moveComp(p) {
        if (p<0 || p>=page.length-1) return
        setPage(
            page.map((comp, index) => {
                if (index == p) return page[p+1]
                if (index == p+1) return page[p]
                return comp
            })
        )
    }

    async function tryInsert() {
        if (pageName === "") return alert("Insert something first")

        const res = await fetch(`${api}/stands/${pageName}`)
        const data = await res.json()
        if (!data.error) return alert("This name is not avaliable")

        const dataInsert = {
            data: {
                pageName: pageName,
                imgSrc: imgSrc,
                date: new Date(),
                userId: user.id,
                status: "request",
                verified: false
            },
            page: page
        }
        insertOne("stands", dataInsert)
        alert("Sucessfully inserted page")
    }

    function tryUpdate() {
        if (addMode) return

        const dataInsert = {
            page: page,
            "data.status": "request",
            "data.verified": false
        }
        updateOne("stands", pageName, dataInsert)
        alert("Sucessfully updated page")
    }

    function tryDelete() {
        const check = confirm("Are you sure?")
        if (!check) return
        deleteOne("stands", pageName)
        navigate("/")
    }

    if (loading) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page">
        <DynamicRenderer layout={page} editMode={editMode} updater={updateComp} deleter={deleteComp} mover={moveComp} />
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            {addMode ? <>
                <h1>Add Page</h1>
                <input
                    type="text"
                    value={pageName}
                    placeholder="Insert page name"
                    onChange={(e) => setPageName(e.target.value)}
                />
                <input
                    className="imageInput"
                    type="text"
                    value={imgSrc}
                    placeholder="Insert URL"
                    onChange={(e) => setImgSrc(e.target.value)}
                />
                <img className="imagePreview" src={imgSrc ? imgSrc : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"} alt="" />
                <button onClick={tryInsert}>Submit Page</button>
            </> :
                <>
                    <h1>Update Page</h1>
                    <input
                        type="text"
                        value={pageName}
                        disabled={true}
                    />
                    <input
                        className="imageInput"
                        type="text"
                        value={imgSrc}
                        placeholder="Insert URL"
                        onChange={(e) => setImgSrc(e.target.value)}
                    />
                    <img className="imagePreview" src={imgSrc ? imgSrc : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"} alt="" />
                    <button onClick={tryUpdate}>Submit Changes</button>
                </>
            }
        </Modal>
        {checkPerm() &&
            ReactDOM.createPortal(
                <button className="editMenuButton switchMode" onClick={switchMode}><PencilIcon /></button>,
                document.getElementById("switch-edit-root")
            )}
        {editMode &&
            ReactDOM.createPortal(
                <div className="editMenu">
                    <button className="editMenuButton" onClick={() => addComp("heading")}><HeadingIcon /></button>
                    <button className="editMenuButton" onClick={() => addComp("paragraph")}><ParagraphIcon /></button>
                    <button className="editMenuButton" onClick={() => addComp("twoParagraph")}><TwoParagraphIcon /></button>
                    <button className="editMenuButton" onClick={() => addComp("image")}><ImageIcon /></button>
                    <button className="editMenuButton" onClick={() => setIsOpen(true)}><SubmitIcon /></button>
                    {!addMode &&
                        <button className="editMenuButton" onClick={tryDelete}><DeleteIcon /></button>
                    }

                </div>,
                document.getElementById("edit-menu-root")
            )}
    </div>
}

export default Page
