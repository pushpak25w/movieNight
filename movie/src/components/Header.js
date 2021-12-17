import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <navbar >
            <Link to="/"><h2 className="header">MovieNight</h2></Link>
           
        </navbar>
    )
}

export default Header
