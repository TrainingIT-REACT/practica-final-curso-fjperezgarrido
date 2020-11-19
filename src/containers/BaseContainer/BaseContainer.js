import React from 'react';
import PropTypes from 'prop-types';

import '../../css/general_styles.css';
// Redux
import { connect } from 'react-redux';
import { startSearch, successSearch } from '../../actions/actions';


import Header from '../../components/Header';
import Home from "../../components/Home";
import SearchForm from '../../components/SearchForm';
import ResultList from "../../components/ResultList/ResultList";
import {NavLink} from "react-router-dom";


/**
 * Muestra un buscador, así como la lista de resultados. Este componente manda
 * las peticiones a la API de Github y retorna los datos a los componentes de
 * tipo presential.
 */
class BaseContainer extends React.Component {
  // Definimos los props que nos deben de llegar
  static propTypes = {
    // Dispatch es la funcion que utilizamos para lanzar acciones contra el store.
    // Esta función la proporciona connect.
    dispatch: PropTypes.func.isRequired,
    // Valores del estado
    loading: PropTypes.bool.isRequired,
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
    search: PropTypes.string.isRequired,
    queried: PropTypes.bool.isRequired
  }

  // Inicializamos el estado
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    // Ya no necesitamos el estado! everything está en los props
    // this.state = { ... }
  }

  /**
   * Este método actua como callback del evento onSubmit del formulario.
   * Recibe como parámetro el campo que debe de buscar.
   */

    //¿ COMO HACER DOS FETCH JUNTOS, PARA ATACAR A DOS URLS DISTINTAS, A ALBUMS Y A SONGS A LA VEZ?
    //
    // Mi intención con la funcion onSubmit era en un principio hacerla async, para así poder ejecutar dos fetch y mergear
    // los resultados results_album.contact(results_songs), en una unica funcion y pasarsela a successSearch(res),
    // pero no he podido hacerla async, por lo que embebo un fetch dentro del otro para aunar los resultados de
    // dos busquedas distintas.

  onSubmit = value => {
    if (value === '') {
      return (
        false
      )
    }
    // Lanzamos la accion!
    this.props.dispatch(startSearch(value));
    // Realizamos la petición a la API

    fetch(`/albums?q=${ value }`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        fetch(`/songs?q=${ value }`)
          .then(res_songs => {
            return res_songs.json();
          }).then(res1 => {
          const results = res.concat(res1)
          this.props.dispatch(successSearch(results));
        })

      })
      .catch(err => {
        // Mostramos el error por consola
        console.log(err);
      })
  }

  render() {
    return (
      <>
        <Header/>
        <nav className="Navigation">
          <NavLink exact to="/" className="Link" activeClassName="Link--active">Home</NavLink>
          <NavLink exact to="/albums-list" className="Link" activeClassName="Link--active">Albums</NavLink>
          <NavLink exact to="/artist-list" className="Link" activeClassName="Link--active">Artists</NavLink>
          <NavLink exact to="/songs-list" className="Link" activeClassName="Link--active">Songs</NavLink>
          <NavLink exact to="/apuntes" className="Link" activeClassName="Link--active">Apuntes</NavLink>
          <SearchForm onSubmit={this.onSubmit} search={this.props.search}/>
        </nav>
        <Home/>
        <section className="searchform">


          <ResultList data={ this.props.results }
                      total={ this.props.results.length }
                      loading={ this.props.loading }
                      search={ this.props.search }
                      queried={ this.props.queried } />
        </section>
      </>
    )
  }
}

// Esta funcion nos convierte valores del estado de Redux a props del
// componente
const mapStateToProps = state => {
  // En este caso nos interesan todas las variables del estado, por lo que podríamos
  // devolver una copia de State. Las separamos y las volvemos así a modo
  // ilustrativo
  let { search, loading, results, queried } = state;
  return { search, loading, results, queried };
}

// Connect es un HOC! Modifica los props de nuestro componente para incluir
// dispatch, así como los valores que obtengamos del estado
export default connect(mapStateToProps)(BaseContainer);
