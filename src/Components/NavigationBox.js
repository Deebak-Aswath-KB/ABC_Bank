import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationBox() {
  const linkStyle = {
    display: 'block',
    padding: '12px 16px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    borderRadius: '4px',
    marginBottom: '8px'
  };

  const activeStyle = {
    backgroundColor: '#555'
  };

  return (
    <div style={{
      width: '20%',
      height: '100%',
      backgroundColor: '#333',
      
      
    }}>
      
      <nav>
        <NavLink to="/" style={linkStyle} activeStyle={activeStyle}>Home</NavLink>
        <NavLink to="/customers" style={linkStyle} activeStyle={activeStyle}>Customers</NavLink>
        <NavLink to="/accounts" style={linkStyle} activeStyle={activeStyle}>Accounts</NavLink>
      </nav>
    </div>
  );
}

export default NavigationBox;
