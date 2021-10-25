import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Switch>
          <Route exact path='/auth/register' component={Register} />
          <Route exact path='/auth/login' component={Login} />
        </Switch>
      </section>
    </Router>
  )
}

export default App
