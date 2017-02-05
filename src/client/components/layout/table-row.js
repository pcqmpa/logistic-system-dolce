import React, { PropTypes } from 'react';

const TableRow = ({ children, className }) => {
  const componentClass = 'c-table__row';
  const config = className || '';

  return (
    <div className={`${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default TableRow;
