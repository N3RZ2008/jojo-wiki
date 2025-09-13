import { signOut } from "../auth/useAuth"

export default function LogOut() {
    async function tryLogOut() {
        try {
            await signOut()
        } catch (error) {
            alert(error.message)
        }
    }
    signOut()
    return
}