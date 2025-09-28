import { createContext, useState } from "react";

export const ModalContext = createContext()

export default function ModalProvider({children}) {
    const [pageName, setPageName] = useState("Undefined")
    const [defaultStatus, setDefaultStatus] = useState("Undefined")
    const [defaultIsVerified, setDefaultIsVerified] = useState("Undefined")
    const [isOpen, setIsOpen] = useState(false)

    return <>
        <ModalContext.Provider value={{isOpen, setIsOpen, pageName, setPageName, defaultStatus, setDefaultStatus, defaultIsVerified, setDefaultIsVerified}}>
            {children}
        </ModalContext.Provider>
    </>
}
