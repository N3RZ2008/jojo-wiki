import { createContext, useState } from "react";

export const PageContext = createContext(null)

function PageProvider({children}) {
    const [editMode, setEditMode] = useState(false)

    return <>
        <PageContext.Provider value={{editMode, setEditMode}}>
            {children}
        </PageContext.Provider>
    </>
}

export default PageProvider