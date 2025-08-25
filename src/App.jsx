import Background from "./components/Background.jsx"
import Page from "./components/Page.jsx"
import test from "./layoutTest.json"

function App() {
  return (
    <>
      <Background>
        <Page layout={test}/>
      </Background>
    </>
  )
}

export default App
