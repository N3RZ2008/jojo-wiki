import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/page.css"
import "../styles/forms.css"
import { signIn, signOut } from "../../auth/useAuth"

export default function Login({ logout = false }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function logOut() {
        try {
            await signOut()
            navigate("/login")
        } catch (error) {
            alert(error.message)
        }
    }
    if (logout) {
        logOut()
        alert("User successfully logged out")
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await signIn(email, password)
            alert("User successfully logged in")
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className="page">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value) }}
                placeholder="E-Mail"
            />
            <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value) }}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
        <Link className="formA" to={"/signup"}>Don't have an account?</Link>
    </div>
}