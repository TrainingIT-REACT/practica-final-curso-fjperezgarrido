import React from 'react';
import PropTypes from 'prop-types';
import ResultsRow from "../ResultsRow";

/**
 * Muestra la lista de Releases
 */

class ResultList extends React.PureComponent {
  /**
   * Props of the component
   */
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  // Renderizamos la tabla si no estamos cargando resultados
  renderTable() {
    if (this.props.loading || this.props.total === 0) {
      return null;
    } else {
      return <table className="u-full-width">
        <tbody>
            { this.props.data.map(info =>
              <ResultsRow name={info.name}  />
            )}
        </tbody>
      </table>;
    }
  }

  /**
   * Render the ReleaseList component
   */
  render() {
    return <div>
      { this.renderTable() }
    </div>;
  }
}

export default ResultList;
