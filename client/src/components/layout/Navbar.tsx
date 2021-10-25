import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/developers'>Developers</Link>
        </li>
        <li>
          <Link to='/auth/register'>Register</Link>
        </li>
        <li>
          <Link to='/auth/login'>Login</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
