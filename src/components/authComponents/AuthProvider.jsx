import { createContext, useEffect, useState } from "react";
import { supabase } from "../../auth/supabase";

export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        async function getInitialUser() {
            const { data, error } = await supabase.auth.getSession()
            if (error) console.error(error)
            setUser(data?.session?.user ?? null)
            setLoadingUser(false)
        }

        getInitialUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoadingUser(false)
        })
        return () => subscription.unsubscribe()
    })

    return <>
        <AuthContext.Provider value={{ user, setUser, loadingUser }}>
            {children}
        </AuthContext.Provider>
    </>
}

export default AuthProvider