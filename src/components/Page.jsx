import { useContext, useState } from "react"
import ReactDOM from "react-dom"
import {Title, Paragraph, TwoParagraph, Image} from "./pageComponents"
import { PageContext } from "./PageProvider.jsx"
import "./styles/page.css"

const componentMap = {
    title: Title,
    paragraph: Paragraph,
    twoParagraph: TwoParagraph,
    image: Image
}



function DynamicRenderer({layout, editMode, updater, deleter}) {
    return(
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

function Page({layout = []}) {
    // const [editMode, setEditMode] = useState(false)
    const [page, setPage] = useState(() => layout)
    const { editMode } = useContext(PageContext)

    function addComp(type) {
        setPage([
            ...page,
            {
                "id": crypto.randomUUID(),
                "type": type, 
                "props": {
                    "children": "Insert text here"
                }
            }
        ])
    }

    function updateComp(id, children, layout = page) {
        const update = layout.map(comp => {
            if (comp.id === id) {
                return {...comp, props: {...comp.props, children: children}}
            }
            if (comp.children) {
                return {...comp, children: updateComp(id, children, comp.children)}
            }
            return comp
        })
        if (layout == page) setPage(update);
        return update
    }

    function deleteComp(id, layout=page) {
        const update = layout
            .filter(comp => comp.id !== id)
            .map(comp => {
                if (comp.children) {
                    return {...comp, children: deleteComp(id, comp.children)}
                }
                return comp
            })
        if (layout == page) setPage(update);
        return update
    }

    return <div className="page">
        {<>
            <DynamicRenderer layout={page} editMode={editMode} updater={updateComp} deleter={deleteComp}/>
            {/* <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <button onClick={() => addComp("title")}>Title</button>
            </Modal> */}
        </>
        }
        {editMode && 
        ReactDOM.createPortal(
            <div className="editMenu">
                {/* <button onClick={() => setIsOpen(true)}>Add</button> */}
                <button onClick={() => addComp("title")}>Add Title</button>
                <button onClick={() => addComp("paragraph")}>Add Paragraph</button>
                {/* <button onClick={() => console.log(page)}>Debug</button> */}
            </div>,
            document.getElementById("edit-menu-root")
        )}
    </div>
}

export default Page