import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css'
import AuthContext from '../../contexts/AuthContext';
import AuthDropdown from '../../components/AuthDropdown';
// import SearchBar from '../SearchBar';

class Navigation extends Component {
  static contextType = AuthContext;

  state = {
    collapsed: true
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { user } = this.context;
    const { collapsed } = this.state;
    const targetClass = `collapse navbar-collapse ${!collapsed && 'show'}`;
    const togglerClass = `navbar-toggler ${collapsed && 'collapsed'}`;

    return (
      <div className='Navigation sticky-top'>
        <nav className='navbar navbar-dark navbar-expand-lg'>
          <Link className='navbar-brand' to='/'>Pop Media</Link>
          <button className={togglerClass} onClick={this.toggleCollapse} data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className={targetClass} id='navbarSupportedContent'>
            {/* <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <SearchBar />
              </li>
            </ul> */}
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/' onClick={this.toggleCollapse}>Home</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/genres' onClick={this.toggleCollapse}>Genres</Link>
              </li>
              {user &&
                <li className='nav-item'>
                  <Link className='nav-link' to='/secret' onClick={this.toggleCollapse}>Secret</Link>
                </li>}
              {user
                ? <AuthDropdown onClick={this.toggleCollapse} />
                : <>
                  <li className='nav-item'><Link className='nav-link' to='/login' onClick={this.toggleCollapse}>Login</Link></li>
                  <li className='nav-item'><Link className='nav-link' to='/register' onClick={this.toggleCollapse}>Register</Link></li>
                </>}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;
