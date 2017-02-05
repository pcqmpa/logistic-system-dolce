/**
 * Module with the package reception orders summary component.
 * @module src/client/containers/view/packages-summary
 */
// React - Redux.
import React, { PropTypes, Component } from 'react';

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

// Constants.
import { SUMMARY_MODAL } from '../../constants/layouts';

// Styles.
import '../../styles/layouts/_summary-modal.scss';

class PackagesSummary extends Component {
  static propTypes = {
    ordersSummary: PropTypes.shape(),
    showSummary: PropTypes.bool,
    handleCloseSummary: PropTypes.func
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
      Object.keys(orders).map(zone => (
        Object.keys(orders[zone]).map((packageType, key) => (
          <TableRow key={`${zone}_${packageType}_${key}`}>
            <TableCell center>
              {zone}
            </TableCell>
            <TableCell center>
              {packageType}
            </TableCell>
            <TableCell center>
              {orders[zone][packageType].count}
            </TableCell>
          </TableRow>
        ))
      ))
    )
  );

  render() {
    const {
      ordersSummary,
      showSummary,
      handleCloseSummary
    } = this.props;

    return (
      <Modal
        show={showSummary}
        layout={SUMMARY_MODAL}
      >
        <ModalHeader handleCloseClick={handleCloseSummary}>
          Resumen
        </ModalHeader>
        <ModalBody scroll>
          <Table>
            <TableHead titles={this.state.titles} />
            {this.renderSummary(ordersSummary)}
          </Table>
        </ModalBody>
      </Modal>
    );
  }
}

export default PackagesSummary;
