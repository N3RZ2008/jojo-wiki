import { useContext, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Title, Paragraph, TwoParagraph, Image } from "./pageComponents"
import { PageContext } from "./PageProvider.jsx"
import useDBFind from "./useDBFind.jsx"
import "./styles/page.css"

const componentMap = {
    title: Title,
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
                >

                </Component>
            }
        )
    )
}

function Page({ pageName = "teste" }) {
    const [page, setPage] = useState([])
    const { find, findFilter, loading } = useDBFind("stands", pageName)
    const { editMode } = useContext(PageContext)

    useEffect(() => {
        if (!loading) {
            if (findFilter) {
                setPage(findFilter[0].page)
                // console.log(findFilter)
            }
            else {
                setPage(find[0].page)
                // console.log(find.filter((page) => page.data.pageName === "teste"))
            }
        }
    }, [find, loading])

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
                if (childrenA & childrenB) {
                    return { ...comp, props: { ...comp.props, childrenA: childrenA, childrenB: childrenB } }
                }
                if (srcValue & heightValue) {
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

    if (loading) return <div className="page"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib-ueHzsv9SSi7d5Alg9wvb3IvvCgCnzNdg&s" alt="" />perae...</div>

    return <div className="page">
        <DynamicRenderer layout={page} editMode={editMode} updater={updateComp} deleter={deleteComp} />
        {editMode &&
            ReactDOM.createPortal(
                <div className="editMenu">
                    {/* <button onClick={() => setIsOpen(true)}>Add</button> */}
                    <button onClick={() => addComp("title")}>Add Title</button>
                    <button onClick={() => addComp("paragraph")}>Add Paragraph</button>
                    <button onClick={() => addComp("twoParagraph")}>Add 2 Paragraphs</button>
                    <button onClick={() => addComp("image")}>Add Image</button>
                    {/* <button onClick={() => console.log(page)}>Debug</button> */}
                </div>,
                document.getElementById("edit-menu-root")
            )}
    </div>
}

export default Page