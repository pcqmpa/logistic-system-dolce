/**
 * Module with the List Section layout component.
 * @module src/client/components/layout/list-section
 */
// React.
import React, { PropTypes } from 'react';

// Components.
import { GridCell } from '../';

const ListSection = ({
  children,
  className,
  noGutter,
  center,
  width,
  offset,
  fixedWidth,
  responsiveSuffixes
}) => {
  const componentClass = 'cp-list__section';
  let config = '';

  if (center) {
    config += `${componentClass}--center `;
  }

  config += className || '';

  return (
    <GridCell
      width={width}
      offset={offset}
      noGutter={noGutter}
      fixedWidth={fixedWidth}
      responsiveSuffixes={responsiveSuffixes}
      className={`${componentClass} ${config.trim()}`}
    >
      {children}
    </GridCell>
  );
};

ListSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noGutter: PropTypes.bool,
  center: PropTypes.bool,
  width: PropTypes.number,
  offset: PropTypes.number,
  fixedWidth: PropTypes.bool,
  responsiveSuffixes: PropTypes.arrayOf(PropTypes.object)
};

export default ListSection;
