import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
        <ul>
            <Link to='/' >
                Home
            </Link>

            <Link to='/log' >
                Log
            </Link>

        </ul>
    </div>
  )
}

export default Navbar;