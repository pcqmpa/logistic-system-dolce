import React, { PropTypes } from 'react';

const Grid = ({
  children,
  className,
  noGutter,
  wrap,
  layout
}) => {
  const componentClass = 'o-grid';
  let config = '';

  if (noGutter) {
    config += 'o-grid--no-gutter ';
  }

  if (wrap) {
    config += 'o-grid--wrap ';
  }

  if (layout) {
    config += `o-grid--${layout} `;
  }

  config += className || '';

  return (
    <div className={`${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noGutter: PropTypes.bool,
  wrap: PropTypes.bool,
  layout: PropTypes.string
};

export default Grid;
