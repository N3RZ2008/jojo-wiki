import { createContext, useState } from "react";

export const UserModalContext = createContext()

export default function UserModalProvider({ children }) {
    const [userId, setUserId] = useState("Undefined")
    const [userEmail, setUserEmail] = useState("Undefined")
    const [defaultUserRole, setDefaultUserRole] = useState("user")
    const [isOpen, setIsOpen] = useState(false)

    return <>
        <UserModalContext.Provider value={{ isOpen, setIsOpen, userId, setUserId, userEmail, setUserEmail, defaultUserRole, setDefaultUserRole }}>
            {children}
        </UserModalContext.Provider>
    </>
}
