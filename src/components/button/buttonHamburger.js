import React from 'react';

const HamburgerButton = ({ isActive, onClick }) => {
  return (
    <a
      className={`navbar-burger ${isActive ? 'is-active' : ''}`}
      role="button"
      aria-label="menu"
      aria-expanded={isActive ? 'true' : 'false'}
      onClick={onClick}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  );
};

export default HamburgerButton;
