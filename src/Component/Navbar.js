import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <nav className="navbar bg-black fixed-top">
                <div className="container-fluid px-5">
                    <Link className="navbar-brand text-white fs-4 text-uppercase fw-bolder" to="/">Funding</Link>
                    <div className='d-flex align-items-center justify-content-between column-gap-3'>
                        <Link to="/user" className="btn btn-success px-4 fw-semibold rounded-0" type="submit">User</Link>
                        <Link to="/manager" className="btn btn-danger px-4 fw-semibold rounded-0" type="submit">Manager</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
