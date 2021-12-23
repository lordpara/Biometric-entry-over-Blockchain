import React, { Component, useState } from 'react'
import logo from '../logo2.jpg'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">

          <img src={logo} className="img" alt="" />
          <h1 className="title">BIOMETRIC ENTRY SYSTEM</h1>
      </nav>
    );
  }
}

export default Navbar;
