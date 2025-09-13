import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Background from "./components/Background.jsx"
import AuthProvider from "./components/AuthProvider.jsx"
import Page from "./components/Page.jsx"
import Menu from "./components/Menu.jsx"
import Homepage from "./components/Homepage.jsx"
import SignUp from "./components/SignUp.jsx"
import Login from "./components/LogIn.jsx"
import test from "./layoutTest.json"

function Layout() {
	return <Background>
		<AuthProvider>
			<Menu />
			<Outlet />
		</AuthProvider>
	</Background>
}

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: "/", element: <Homepage /> },
			{ path: "/page/:insertedName", element: <Page /> },
			{ path: "/signup", element: <SignUp /> },
			{ path: "/login", element: <Login /> },
			{ path: "/logout", element: <Login logout={true} /> },
			{ path: "*", element: <Page insertedName="404" /> }
		]
	}
])

function App() {
	return (
		<RouterProvider router={router} />
	)
}

export default App
