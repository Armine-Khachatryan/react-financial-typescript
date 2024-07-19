import React from 'react'
import './header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='main-header'>
        <div className="main-container">
          <nav>
            <div className="logo">Logo</div>
            <ul className="nav-languages">
              <li><button>English</button></li>
              <li><button>Spanish</button></li>
            </ul>
            <div className="nav-buttons">
              <Link to="/login" className="login">Login</Link>
              <Link to="/signup" className="signup">Signup</Link>
            </div>
          </nav>
        </div>
    </header>
  )
}
