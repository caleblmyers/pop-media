import React from 'react'

import './style.css'
import LogoTmdb from '../../img/tmdb.png'

const Footer = () => {
  return (
    <footer className="Footer nav-bg">
      <div className="container text-white" id="footer-row">
        <div className="row h-100">
          <div className="col-8 col-md-4 h-100 ml-auto">
            &copy; 2019 Caleb Myers
              <a className="pl-3" href="https://github.com/caleblmyers">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/caleb-myers/">
              <i className="pl-3 fab fa-linkedin"></i>
            </a>
          </div>
          <div className="col-4 h-100 mr-auto">
            <img className="img-fluid" id="tmdb-logo" src={LogoTmdb} alt="TMDB" />
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
