import React from "react";
import PropTypes from 'prop-types';

const Header = ({mensaje}) => {
  return (
    <header className="bg-alert">
      <h1>{mensaje}</h1>
    </header>
  )
};

Header.propTypes = {
  mensaje: PropTypes.string.isRequired
};

export default Header;