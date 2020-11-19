import React from 'react';
import PropTypes from 'prop-types';

/**
 * Muestra una release de un repositorio
 */
class ResultsRow extends React.PureComponent {
  /**
   * Props del componente
   */
  static propTypes = {
    name: PropTypes.object.isRequired
  }

  /**
   * Render the ReleaseRow component
   */
  render() {
    let name = this.props.name;

    return <tr className="ReleaseRow">
      <td>{ name }</td>
    </tr>;
  }
}

// Export the class
export default ResultsRow;
