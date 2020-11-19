import React from 'react';
import PropTypes from 'prop-types';

import './SearchForm.css';

/**
 * Renderiza el formulario de búsqueda. A pesar de ser un componente de tipo
 * presential, este si define su propio estado. No obstante, el estado no afecta
 * a la renderización puesto que no se utiliza en el método render. Es por estado
 * razón que el componente extiende de `PureComponent`
 */
class SearchForm extends React.PureComponent {
  /**
   * Props del componente
   */
  static propTypes = {
    // Necesitamos el callback de onSubmit
    onSubmit: PropTypes.func.isRequired,
    // Valor actual
    search: PropTypes.string.isRequired
  }

  // Iniciamos el estado
  constructor(props) {
    super(props);

    this.state = { value: '' }
  }

  /**
   * Actualizamos el estado con cada cambio en el input.
   * El parámetro e incluye toda la información del evento
   */
  onChange = (e) => {
    this.setState({ value: e.target.value });
  }

  /**
   * El usuario ha pulsado enter! Cancelamos el evento por defecto para
   * evitar el envío de la petición POST y notificamos al padre
   */
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  /**
   * Este componente renderiza un formulario con un único campo. Cuando
   * el usuario pulse enter, este form lanzará el evento onSubmit. También
   * capturamos el evento onChange del input para almacenar el valor del texto.
   */
  render() {
    return <form onSubmit={ this.onSubmit } className="buscador inline">
      <input type="text" className="u-full-width" name="Search"
             placeholder="albums, artist, songs, ..." onChange={ this.onChange }
             id="searchInput" defaultValue={ this.props.search }/>
      <button className="button-primary" type="submit" value="Search">Buscar</button>

    </form>;
  }
}

// Export the class
export default SearchForm;
