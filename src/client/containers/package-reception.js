/**
 * Module with the assign transporter container component.
 * @module src/client/containers/assign-transporter
 */
// React - Redux.
import React, { Component } from 'react';

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

  Table,
  TableHead,
  TableRow,
  TableCell,

  Button,
  InputBox,
  SelectBox,
  CheckBox,
  TextArea
} from '../components/';

// Constants.
import {
  MEDIUM_SIZE,
  XLARGE_SIZE
} from '../../shared/constants/types';

// Styles.
import '../styles/assign-transporter.scss';

class PackageReception extends Component {
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

  render() {
    return (
      <BoxContainer
        pillar
        size={MEDIUM_SIZE}
      >
        <h2 className="c-heading">Recepción de Paquetes</h2>
        <Grid noGutter>
          <GridCell width={20}>
            <SelectBox
              id="select_distributor"
              name="select_distributor"
              placeholder="Selecione el ditribuidor"
              options={[{ value: '1', text: 'distribuidor' }]}
            />
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
          <GridCell width={25}>
            <Table>
              <TableHead titles={[{ text: 'Data 1' }, { text: 'Data 2' }]} />
              <TableRow>
                <TableCell>
                  Data 1
                </TableCell>
                <TableCell>
                  Data 2
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Data 1
                </TableCell>
                <TableCell>
                  Data 2
                </TableCell>
              </TableRow>
            </Table>
          </GridCell>
          <GridCell width={50} offset={5}>
            <TextArea
              rows={6}
              placeholder="Deje sus comentarios"
            />
            <p>
              <Button
                size={XLARGE_SIZE}
                onClick={this.handleSubmitForm}
              >
                Asignar
              </Button>
            </p>
          </GridCell>
        </Grid>
      </BoxContainer>
    );
  }
}

export default PackageReception;
