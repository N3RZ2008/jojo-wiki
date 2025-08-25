import {Title, Paragraph} from "./pageComponents"
import "./page.css"

const componentMap = {
    title: Title,
    paragraph: Paragraph
}

function Page({layout}) {
    return <div className="homepage">
        {
            layout.map(
                (item) => {
                    const Component = componentMap[item.type];
                    return <Component {...item.props}/>
                }
            )
        }
    </div>
}

export default Page