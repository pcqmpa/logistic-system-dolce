import React, { PropTypes } from 'react';

const GridCell = ({
  children,
  className,
  width,
  offset,
  noGutter,
  fixedWidth,
  responsiveSuffixes
}) => {
  const componentClass = 'o-grid__cell';
  let config = '';

  if (width) {
    config += `o-grid__cell--width-${width} `;
  }

  if (offset) {
    config += `o-grid__cell--offset-${offset}`;
  }

  if (responsiveSuffixes) {
    config += responsiveSuffixes.reduce((responsiveConfig, nextSufix) => (
      `o-grid__cell--width-${nextSufix.width}@${nextSufix.target} `
    ), '');
  }

  if (noGutter) {
    config += 'o-grid__cell--no-gutter ';
  }

  if (fixedWidth) {
    config += 'o-grid__cell--width-fixed ';
  }

  config += className || '';

  return (
    <div className={`${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

GridCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  offset: PropTypes.number,
  noGutter: PropTypes.bool,
  fixedWidth: PropTypes.bool,
  responsiveSuffixes: PropTypes.arrayOf(PropTypes.object)
};

export default GridCell;
