/**
 * Module with the data table row component.
 * @module src/client/components/layout/data-row
 */
// React.
import React from 'react';
import PropTypes from 'prop-types';

// Components.
import { Grid } from '../';

const DataRow = ({
  children,
  className,
  noGutter
}) => {
  const componentClass = 'cp-data-table__row';
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

DataRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noGutter: PropTypes.bool
};

export default DataRow;
