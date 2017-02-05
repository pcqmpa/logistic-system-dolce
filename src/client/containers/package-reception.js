/**
 * Module with the assign transporter container component.
 * @module src/client/containers/assign-transporter
 */
// React - Redux.
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components.
import {
  Grid,
  GridCell,
  DataTable,
  DataHeader,
  DataContent,
  DataRow,
  DataItem,
  BoxContainer,
  InputGroup,

  Button,
  InputBox,
  CheckBox,
  TextArea
} from '../components/';
import { PackagesSummary } from './';

// Actions.
import {
  updateOrdersObservation,
  toggleShowOrdersSummary
} from '../../shared/actions/package-reception-actions';

// Constants.
import {
  MEDIUM_SIZE,
  XLARGE_SIZE
} from '../../shared/constants/types';

// Styles.
import '../styles/assign-transporter.scss';

class PackageReception extends Component {
  static propTypes = {
    observation: PropTypes.string,
    ordersSummary: PropTypes.shape(),
    showSummary: PropTypes.bool,
    updateOrdersObservation: PropTypes.func,
    toggleShowOrdersSummary: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      headers: [
        { text: 'Usuario', size: 40 },
        { text: 'Nombre', size: 40 },
        { text: 'Seleccionar', size: 20 }
      ]
    };
  }

  /**
   * Handles the show and hide of the summary modal.
   * @returns {void}
   */
  handleShowSummary = () => {
    this.props.toggleShowOrdersSummary();
  };

  /**
   * Updates the package reception observation field.
   * @param {DOMEvent} event -> The event object.
   * @returns {void}
   */
  handleObservationUpdates = (event) => {
    const { value } = event.target;
    this.props.updateOrdersObservation(value);
  };

  render() {
    const {
      observation,
      showSummary,
      ordersSummary
    } = this.props;

    return (
      <BoxContainer
        pillar
        size={MEDIUM_SIZE}
      >
        <h2 className="c-heading">Recepción de Paquetes</h2>
        <Grid noGutter>
          <GridCell width={20}>
            <Button
              onClick={this.handleShowSummary}
            >
              Resumen
            </Button>
          </GridCell>
          <GridCell width={20} offset={10}>
            <InputBox
              placeholder="Filtrar transportadores"
            />
          </GridCell>
        </Grid>
        <Grid
          wrap
          noGutter
          className="u-letter-box--medium"
        >
          <GridCell width={80}>
            <DataTable paginators={[]} >
              <DataHeader>
                {this.state.headers.map((title, key) => (
                  <DataItem key={key} width={title.size}>
                    {title.text}
                  </DataItem>
                ))}
              </DataHeader>
              <DataContent>
                <DataRow>
                  <DataItem center width={40}>
                    Test
                  </DataItem>
                  <DataItem center width={40}>
                    Test
                  </DataItem>
                  <DataItem width={20}>
                    <InputGroup center>
                      <CheckBox
                        name="select_packages"
                      />
                    </InputGroup>
                  </DataItem>
                </DataRow>
              </DataContent>
            </DataTable>
          </GridCell>
        </Grid>
        <Grid noGutter>
          <GridCell width={50}>
            <TextArea
              rows={6}
              value={observation}
              placeholder="Deje sus comentarios"
              onChange={this.handleObservationUpdates}
            />
          </GridCell>
          <GridCell width={20} offset={5}>
            <Button
              size={XLARGE_SIZE}
              onClick={this.handleSubmitForm}
            >
              Recibir Pedidos
            </Button>
          </GridCell>
        </Grid>
        <PackagesSummary
          showSummary={showSummary}
          ordersSummary={ordersSummary}
          handleCloseSummary={this.handleShowSummary}
        />
      </BoxContainer>
    );
  }
}

export default connect(
  state => ({ ...state.packageReception }),
  dispatch => (bindActionCreators({
    updateOrdersObservation,
    toggleShowOrdersSummary
  }, dispatch))
)(PackageReception);
