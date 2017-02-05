import React, { PropTypes } from 'react';

const TableCell = ({
  children,
  className,
  center
}) => {
  const componentClass = 'c-table__cell';
  let config = '';

  if (center) {
    config += `${componentClass}--center `;
  }

  config += className || '';

  return (
    <span className={`${componentClass} ${config.trim()}`}>
      {children}
    </span>
  );
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  center: PropTypes.bool
};

export default TableCell;
