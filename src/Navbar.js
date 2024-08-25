import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar'>
        <ul>
            <li><NavLink to="/" activeClassName="active">Dashboard</NavLink></li>
            <li><NavLink to="/manage-bookings" activeClassName="active">Manage Bookings</NavLink></li>
            <li><NavLink to="/manage-boats" activeClassName="active">Manage Boats</NavLink></li>
            <li><NavLink to="/manage-meals" activeClassName="active">Manage Meals</NavLink></li>
            <li><NavLink to="/manage-pricing" activeClassName="active">Manage Pricing</NavLink></li>
        </ul>
    </div>
  );
}
