/**
 * Module with the List Item layout component.
 * @module src/client/components/layout/list-item
 */
// React.
import React, { PropTypes } from 'react';

const ListItem = ({
  children,
  className,
  noGutter,
  header
}) => {
  const componentClass = 'cp-list__item';
  let config = '';
  let gridConfig = '';

  if (noGutter) {
    gridConfig += 'o-grid--no-gutter ';
  }

  if (header) {
    config += `${componentClass}--header `;
  }

  config += className || '';

  return (
    <li className={`o-grid ${gridConfig.trim()} ${componentClass} ${config.trim()}`}>
      {children}
    </li>
  );
};

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noGutter: PropTypes.bool,
  header: PropTypes.bool
};

export default ListItem;
