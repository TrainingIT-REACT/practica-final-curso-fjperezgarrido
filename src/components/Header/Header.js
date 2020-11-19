import React from 'react';
import {NavLink} from "react-router-dom";

import './Header.css';

/**
 * Muestra el header de nuestra aplicación. No necesitamos que se actualice por
 * dejamos shouldComponenteUpdate nunca retornará true.
 */
class Header extends React.Component {
  /**
   * Al ser contenido estático, no necesitamos actualizar este componente.
   */
  shouldComponenteUpdate() {
    return false;
  }

  /**
   * Render the Header component
   */
  render() {
    return <header className="Header">
      <h1>Reactify</h1>

    </header>
  }
}

export default Header;
