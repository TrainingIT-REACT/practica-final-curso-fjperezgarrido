import React from 'react';
// import PropTypes from 'prop-types';

import '../css/general_styles.css'

// Importamos los componentes
import Header from '../../components/Header';
// import {NavLink} from "react-router-dom";

import Home from "../../components/Home";
// import SearchContainer from '../SearchContainer';


/**
 * Este es el container base de nuestra aplicación. Si recibe un elemento en
 * props.children, renderizará dicho elemento en la UI. Si este prop es
 * `undefined`, renderizará la vista para buscar nuevos repositorios.
 */
class BaseContainer extends React.Component {
  // /**
  //  * Props del component
  //  */
  // static propTypes = {
  //   // Es necesario, si no, los links no se actualizarán
  //   location: PropTypes.object.isRequired
  // };

  /**
   * Render the HomeContainer component
   */
  render() {
    return (
      <>
      <Header/>
      <Home/>

      </>
      );
  }
}

// Export the class
export default BaseContainer;
