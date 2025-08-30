import { useState, useEffect } from "react"
import {Title, Paragraph, Container, Image} from "./pageComponents"
import Modal from "./Modal.jsx"
import "./styles/page.css"

const componentMap = {
    title: Title,
    paragraph: Paragraph,
    container: Container,
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
                    {item.children ? <DynamicRenderer
                    layout={item.children}
                    editMode={editMode}
                    updater={updater}
                    deleter={deleter}
                    /> : item.props.children}
                </Component>
            }
        )
    )
}

function Page({layout = []}) {
    const [editMode, setEditMode] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(() => layout)

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
    
    function switchMode() {
        if(editMode) {
            setEditMode(false)
            return
        }
        setEditMode(true)
        return
    }

    return <div className="page">
        {<>
            <button onClick={() => switchMode()}>Switch Mode</button>
            <DynamicRenderer layout={page} editMode={editMode} updater={updateComp} deleter={deleteComp}/>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <button onClick={() => addComp("title")}>Title</button>
            </Modal>
        </>
        }
        {editMode && 
        <div className="editMenu">
            <button onClick={() => setIsOpen(true)}>Add</button>
        </div>}
    </div>
}

export default Page