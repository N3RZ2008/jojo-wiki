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

function DynamicRenderer({layout}) {
    return(
        layout.map(
                (item, i) => {
                    const Component = componentMap[item.type];
                    return <Component key={i} {...item.props}>
                        {item.children ? <DynamicRenderer layout={item.children}/> : item.props.children}
                    </Component>
                }
            )
    )
}

function Page({layout}) {
    const [editMode, setEditMode] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(() => layout)

    function addComp(type) {
        setPage([
            ...page,
            {"type": type, "props": {"children": "Insert text here"}}
        ])
    }
    
    function switchMode() {
        if(editMode) {
            setEditMode(false)
            return
        }
        setEditMode(true)
    }

    return <div className="page">
        {<>
            <button onClick={() => switchMode()}>Switch Mode</button>
            <DynamicRenderer layout={page}/>
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