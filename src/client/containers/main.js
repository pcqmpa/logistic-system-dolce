/**
 * Module with the app Main component.
 * @module src/client/containers/main
 */
// React - Redux.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Containers.
import {
  SideNav,
  HeaderNav,
  ToastList,
  LoadingContainer
} from './';

// Components
import { GridCell, Panel } from '../components/';

// Styles.
import '../styles/main.scss';

/**
 * Main component of the app, the base of the marup.
 */
class Main extends Component {
  /**
   * The component proptypes.
   * @type {Object}
   * @property {ReactElement} children -> The content of the current route.
   * @property {Object} user -> The user properties.
   */
  static propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.shape().isRequired
  };

  /**
   * Renders the app Header component if the user is authenticated.
   * @returns {ReactElement} -> The Header component.
   */
  renderHeader() {
    const { user } = this.props;
    if (!user.isAuth) {
      return null;
    }

    return (<HeaderNav />);
  }

  /**
   * Renders the app SideNav component if the user is authenticated.
   * @returns {ReactElement} -> The SideNav component.
   */
  renderSideNav() {
    const { user } = this.props;
    if (!user.isAuth) {
      return null;
    }

    return (
      <GridCell
        width={20}
        className="app-content__nav-column"
      >
        <SideNav userType={user.data.IdTipo} />
      </GridCell>
    );
  }

  /**
   * Renders the Main container component.
   * @returns {ReactElement} -> The react component.
   */
  render() {
    const { children, user } = this.props;

    return (
      <main className="o-grid o-grid--no-gutter app-content">
        {this.renderSideNav()}
        <GridCell width={(user.isAuth) ? 80 : 100} className="app-content__main-column">
          {this.renderHeader()}
          <Panel navTop={user.isAuth} className="views-container">
            {children}
          </Panel>
        </GridCell>
        <ToastList />
        <LoadingContainer />
      </main>
    );
  }
}

export default connect(
  state => ({ user: state.user })
)(Main);
