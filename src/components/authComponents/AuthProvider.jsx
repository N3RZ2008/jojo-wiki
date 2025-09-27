import { createContext, useEffect, useState } from "react";
import { supabase } from "../../auth/supabase";

export const AuthContext = createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })
        return () => subscription.unsubscribe()
    })

    return <>
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    </>
}

export default AuthProvider