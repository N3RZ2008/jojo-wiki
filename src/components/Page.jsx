import {Title, Paragraph, Container} from "./pageComponents"
import "./styles/page.css"

const componentMap = {
    title: Title,
    paragraph: Paragraph,
    container: Container
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
    return <div className="page">
        {
            <DynamicRenderer layout={layout}/>
        }
    </div>
}

export default Page