import { Navigate } from 'react-router-dom'

const App = () => {
  return (
    // default page should be login page
    <div className="App">
      <Navigate to="/login" />
    </div>
  )
}

export default App
