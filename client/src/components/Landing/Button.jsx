import React from 'react';
import { NavLink } from 'react-router-dom';

const Button = ({ styles }) => (
  <NavLink to="/dashboard">
    <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
      Open App
    </button>
  </NavLink>
);

export default Button;
