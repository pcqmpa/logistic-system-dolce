/**
 * Module with the data table content component.
 * @module src/client/components/layout/data-content
 */
 // React.
import React, { PropTypes } from 'react';

const DataContent = ({ children, className }) => {
  const componentClass = 'cp-data-table__content';
  let config = '';

  config += className || '';

  return (
    <div className={`${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

DataContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default DataContent;
