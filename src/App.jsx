import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Background from "./components/Background.jsx"
import PageProvider from "./components/PageProvider.jsx"
import Page from "./components/Page.jsx"
import Menu from "./components/Menu.jsx"
import Homepage from "./components/Homepage.jsx"
import test from "./layoutTest.json"

function Layout() {
	return <Background>
		<PageProvider>
			<Menu />
			<Outlet/>
		</PageProvider>
	</Background>
}

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{ path: "/", element: <Homepage /> },
			{ path: "/page/:insertedName", element: <Page /> },
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
