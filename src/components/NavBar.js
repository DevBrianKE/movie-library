import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = ({ toggleTheme }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div>
      {/* Hamburger Button */}
      <button className={`hamburger ${isNavVisible ? 'active' : ''}`} onClick={toggleNavbar}>
        <div></div>
        <div></div>
        <div></div>
      </button>

      {/* Navbar Main */}
      <div className={`mainnav ${isNavVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/series">Series</NavLink>
          <NavLink to="/episodes">Episodes</NavLink>
          <NavLink to="/library">Library</NavLink>
        </nav>
        
        {/* Navbar Controls */}
        <div className="navbar-controls">
          <NavLink to="/add-movie">
            <button className="addbutton">Add Movie</button>
          </NavLink>
          <button onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
