/**
 * Module with the side menu component.
 * @module src/client/containers/view/side-nav
 */
// React.
import React, { Component, PropTypes } from 'react';

// Components.
import {
  Nav,
  NavItem,
  NavContent
} from '../../components/';

// Constants.
import * as routes from '../../../shared/constants/routes';
import * as types from '../../../shared/constants/types';
import { ADMIN, TRANSPORTER } from '../../../shared/constants/user-types';

// Styles.
import '../../styles/layouts/_side-nav.scss';

class SideNav extends Component {
  static propTypes = {
    userType: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.initItemRoutes();
  }

  initItemRoutes() {
    const { userType } = this.props;
    this.state = {
      items: [
        {
          type: types.Link,
          link: routes.DASHBOARD,
          content: 'Dashboard',
          visible: true
        },
        {
          type: types.Link,
          link: routes.USERS_LIST,
          content: 'Usuarios',
          visible: userType === ADMIN
        },
        {
          type: types.Link,
          link: routes.ASSIGN_TRANSPORTER,
          content: 'Asignar Transportador',
          visible: userType === ADMIN
        },
        {
          type: types.Link,
          link: routes.ASSIGN_DISTRIBUTORS,
          content: 'Asignar Distribuidores',
          visible: userType === ADMIN
        },
        {
          type: types.Link,
          link: routes.PACKAGE_RECEPTION,
          content: 'Recepción de Paquetes',
          visible: userType === TRANSPORTER
        },
        {
          type: types.Link,
          link: routes.ASSIGN_ROUTES,
          content: 'Asignación de Rutas',
          visible: userType === TRANSPORTER
        }
      ]
    };
  }

  renderNavItems = items => (
    items
      .filter(item => item.visible)
      .map((item, index) => (
        <NavItem key={`nav_${index}`} link={item.link}>
          {item.content}
        </NavItem>
      ))
  );

  render() {
    const { items } = this.state;
    return (
      <Nav layout="side-nav">
        <NavContent>Logo</NavContent>
        {this.renderNavItems(items)}
      </Nav>
    );
  }
}

export default SideNav;
