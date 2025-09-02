import Background from "./components/Background.jsx"
import PageProvider from "./components/PageProvider.jsx"
import Page from "./components/Page.jsx"
import Menu from "./components/Menu.jsx"
import test from "./layoutTest.json"

function App() {
  return (
    <>
      <Background>
        <PageProvider>
          <Menu/>
          <Page layout={test}/>  
          {/* <Page/> */}
        </PageProvider>
      </Background>
    </>
  )
}

export default App
