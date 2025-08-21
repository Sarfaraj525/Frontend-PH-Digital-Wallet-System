import { Outlet } from "react-router"


function App() {
 

  return (
    <>
      <h1>Welcome to My App</h1>
      <p>This is a simple React application.</p>
      <Outlet />
    </>
  )
}

export default App
