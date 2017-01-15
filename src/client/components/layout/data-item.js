/**
 * Module with the data table item component.
 * @module src/client/components/layout/data-item
 */
 // React.
import React, { PropTypes } from 'react';

// Component.
import { GridCell } from '../';

const DataItem = ({
  children,
  className,
  width,
  center
}) => {
  const componentClass = 'cp-data-table__item';
  let config = '';

  if (center) {
    config += `${componentClass}--center`;
  }

  config += className || '';

  return (
    <GridCell
      className={`${componentClass} ${config.trim()}`}
      width={width}
    >
      {children}
    </GridCell>
  );
};

DataItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  center: PropTypes.bool
};

export default DataItem;
