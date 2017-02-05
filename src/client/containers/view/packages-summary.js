/**
 * Module with the package reception orders summary component.
 * @module src/client/containers/view/packages-summary
 */
// React - Redux.
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Components.
import {
  Modal,
  ModalHeader,
  ModalBody,

  Table,
  TableHead,
  TableRow,
  TableCell
} from '../../components/';

// Utils.
import { array } from '../../../shared/utils/';

class PackagesSummary extends Component {
  static propTypes = {
    orders: PropTypes.arrayOf(PropTypes.object),
    showSummary: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      titles: [
        { text: 'Zona' },
        { text: 'Tipo de Paquete' },
        { text: 'Cantidad' }
      ]
    };
  }

  /**
   * Render the orders summary table.
   * @param {Object} orders -> The orders summary.
   * @returns {Array} -> With the summary.
   */
  renderSummary = orders => (
    array.flat(

    )
  );

  render() {
    const {
      orders,
      showSummary
    } = this.props;

    return (
      <Modal
        show={showSummary}
      >
        <ModalHeader>
          Resumen
        </ModalHeader>
        <ModalBody scroll>
          <Table>
            <TableHead titles={this.state.titles} />
            {this.renderSummary(orders)}
          </Table>
        </ModalBody>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    orders: state.packageReception.ordersList,
    showSummary: state.packageReception.showSummary
  })
)(PackagesSummary);
