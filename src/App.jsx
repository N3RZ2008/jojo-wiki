import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Background from "./components/Background.jsx"
import Page from "./components/Page.jsx"
import Menu from "./components/Menu.jsx"
import Homepage from "./components/Homepage.jsx"

import AuthProvider from "./components/authComponents/AuthProvider.jsx"
import SignUp from "./components/authComponents/SignUp.jsx"
import Login from "./components/authComponents/LogIn.jsx"
import Profile from "./components/authComponents/Profile.jsx"

import AdminPageView from "./components/adminComponents/AdminPageView.jsx"

import 'bootstrap/dist/css/bootstrap.min.css';
import ModalProvider from "./components/ModalProvider.jsx"

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
			{ path: "/profile/:userId", element: <Profile /> },
			{ path: "/admin/pages", element: <ModalProvider><AdminPageView /></ModalProvider>},
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
