/**
 * Module with the data table header component.
 * @module src/client/components/layout/data-header
 */
// React.
import React from 'react';
import PropTypes from 'prop-types';

// Components.
import { Grid } from '../';

const DataHeader = ({
  children,
  className,
  noGutter
}) => {
  const componentClass = 'cp-data-table__header';
  let config = '';

  config += className || '';

  return (
    <Grid
      noGutter={noGutter}
      className={`${componentClass} ${config.trim()}`}
    >
      {children}
    </Grid>
  );
};

DataHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noGutter: PropTypes.bool
};

export default DataHeader;
