import { useState } from "react"
import { Link } from "react-router-dom"
import "./styles/page.css"
import "./styles/forms.css"
import { signUp } from "../auth/useAuth"

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await signUp(email, password)
            alert("User successfully registered")
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className="page">
        <h1>Sign Up</h1>
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
            <button type="submit">Sign In</button>
        </form>
        <Link className="formA" to={"/login"}>Already have an account?</Link>
    </div>
}