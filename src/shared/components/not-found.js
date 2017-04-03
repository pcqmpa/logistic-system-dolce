/**
 * Module with the NotFound component.
 * @module src/shared/components/not-found
 */
// React - Router.
import React from 'react';
import { Link } from 'react-router-dom';

// Components.
import { Status } from './';

// Constants.
import { DASHBOARD } from '../constants/routes';

/**
 * The NotFound components rendered when there's no match on the routes.
 * @returns {ReactElement} -> The react component.
 */
const NotFound = () => (
  <Status code={404}>
    <div className="not-found">
      <h1>404</h1>
      <h2>La página que busca no existe!</h2>
      <p>
        <Link to={DASHBOARD}>
          Volver a la página principal
        </Link>
      </p>
    </div>
  </Status>
);

export default NotFound;
