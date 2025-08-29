import Background from "./components/Background.jsx"
import Page from "./components/Page.jsx"
import Menu from "./components/Menu.jsx"
import test from "./layoutTest.json"
import Adder from "./components/Adder.jsx"

function App() {
  return (
    <>
      <Background>
        <Menu/>
        <Page layout={test}/>  
      </Background>
    </>
  )
}

export default App
