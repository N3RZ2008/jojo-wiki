import { useContext, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Heading, Paragraph, TwoParagraph, Image } from "./pageComponents"
import { PageContext } from "./PageProvider.jsx"
import Modal from "./Modal.jsx"
import HeadingIcon from "./icons/HeadingIcon.jsx"
import ParagraphIcon from "./icons/ParagraphIcon.jsx"
import TwoParagraphIcon from "./icons/TwoParagraphIcon.jsx"
import ImageIcon from "./icons/ImageIcon.jsx"
import SubmitIcon from "./icons/SubmitIcon.jsx"
import findOne from "../database/findOne.jsx"
import Insert from "../database/insert.jsx"
import "./styles/page.css"
import { useParams } from "react-router-dom"

const componentMap = {
    heading: Heading,
    paragraph: Paragraph,
    twoParagraph: TwoParagraph,
    image: Image
}

function DynamicRenderer({ layout, editMode, updater, deleter }) {
    return (
        layout.map(
            (item) => {
                const Component = componentMap[item.type];
                return <Component
                    key={item.id}
                    id={item.id}
                    {...item.props}
                    editMode={editMode}
                    updater={updater}
                    deleter={deleter}
                />
            }
        )
    )
}

function Page() {
    const { insertedName } = useParams()
    const [page, setPage] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [pageName, setPageName] = useState("")
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
    const { editMode } = useContext(PageContext)

    useEffect(() => {
        if (!loading) {
            if (find !== null) {
                setPage(find.page)
            }
            else {
                if (insertedName === undefined) {
                    setPage([])
                } else {
                    setPage(errorPage)
                }
            }
        }
    }, [loading])

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

    async function tryInsert(pageName) {
        if (pageName === "") return alert("Insert something first")

        const res = await fetch(`/api/stands/${pageName}`)
        const data = await res.json()
        if (!data.error) return alert("This name is not avaliable")

        const dataInsert = {
            data: {
                pageName: pageName,
                imgSrc: imgSrc,
                date: new Date()
            },
            page: page
        }
        alert("Sucessfully inserted page")
        Insert("stands", dataInsert)
    }

    if (loading) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page">
        <DynamicRenderer layout={page} editMode={editMode} updater={updateComp} deleter={deleteComp} />
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <h1>Submit Page</h1>
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
            <button onClick={() => tryInsert(pageName, imgSrc)}>Submit</button>
        </Modal>
        {editMode &&
            ReactDOM.createPortal(
                <div className="editMenu">
                    <button className="editMenuButton" onClick={() => addComp("heading")}><HeadingIcon /></button>
                    <button className="editMenuButton" onClick={() => addComp("paragraph")}><ParagraphIcon /></button>
                    <button className="editMenuButton" onClick={() => addComp("twoParagraph")}><TwoParagraphIcon /></button>
                    <button className="editMenuButton" onClick={() => addComp("image")}><ImageIcon /></button>
                    <button className="editMenuButton" onClick={() => setIsOpen(true)}><SubmitIcon /></button>
                    <button onClick={() => console.log(page)}>D</button>
                </div>,
                document.getElementById("edit-menu-root")
            )}
    </div>
}

export default Page
