import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./styles/page.css"
import "./styles/forms.css"
import { signUp } from "../auth/useAuth"
import { insertOne } from "../database/handleApi"

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function tryInsert(id, email) {
        const userInsert = {
            userId: id,
            isAdmin: false,
            profilePicture: "https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png",
            email: email
        }
        insertOne("users", userInsert)
    }

    async function handleSubmit(e) {
        // return alert("Sign up temporarily disabled")
        e.preventDefault()
        try {
            const data = await signUp(email, password)
            tryInsert(data.user.id, data.user.email)
            // navigate("/homepage")
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