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
      <nav className="Navigation">
        <NavLink exact to="/" className="Link" activeClassName="Link--active">Home</NavLink>
        <NavLink exact to="/albums-list" className="Link" activeClassName="Link--active">Albums</NavLink>
        <NavLink exact to="/artist-list" className="Link" activeClassName="Link--active">Artists</NavLink>
        <NavLink exact to="/songs-list" className="Link" activeClassName="Link--active">Songs</NavLink>
        <NavLink exact to="/apuntes" className="Link" activeClassName="Link--active">Apuntes</NavLink>
      </nav>
    </header>
  }
}

export default Header;
