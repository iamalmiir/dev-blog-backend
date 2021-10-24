import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './components/Landing'

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={Landing} />
    </Router>
  )
}

export default App
