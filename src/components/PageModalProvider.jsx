import { createContext, useState } from "react";

export const PageModalContext = createContext()

export default function PageModalProvider({children}) {
    const [pageName, setPageName] = useState("Undefined")
    const [defaultStatus, setDefaultStatus] = useState("Undefined")
    const [defaultIsVerified, setDefaultIsVerified] = useState("Undefined")
    const [isOpen, setIsOpen] = useState(false)
    const [refresh, setRefresh] = useState(0)

    return <>
        <PageModalContext.Provider value={{isOpen, setIsOpen, pageName, setPageName, defaultStatus, setDefaultStatus, defaultIsVerified, setDefaultIsVerified, refresh, setRefresh}}>
            {children}
        </PageModalContext.Provider>
    </>
}
