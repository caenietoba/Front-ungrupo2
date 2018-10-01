import React, { Component } from 'react';
import '../styles/Navbar.css';
import Profile from '../resources/Profile.png';
import Sign_out from '../resources/Sign out.png';

class Navbar extends Component {
  
  render() {
    return (
      <div className="container-fluid px-0 mx-0">
        <nav className="navbar navbar-collapse navbar-expand-lg navbar-dark bg-dark">
          <a href="/"><span className="navbar-brand">Proyecto ungrupo</span></a>
          
        
          <form class="form-inline offset-md-4">
            <input className="form-control mr-2 input" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
          
          <div className="collapse navbar-collapse offset-md-4" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#"><img className="img-nav" src={Profile} alt="Profile" title="Profile" /></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/"><img className="img-nav" src={Sign_out} alt="Sign out" title="Sign out" /></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;