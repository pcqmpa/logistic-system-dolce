/**
 * Module of Table component.
 * @module src/client/components/layout/table
 */
// React.
import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Styles.
import '../../styles/components/_table.scss';

const Table = ({
  children,
  className,
  theme,
  layout,
  striped
}) => {
  const componentClass = 'c-table';
  let config = componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  if (striped) {
    config += 'c-table--striped ';
  }

  config += className || '';

  return (
    <div className={`${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  theme: PropTypes.string,
  layout: PropTypes.string,
  striped: PropTypes.bool
};

export default Table;
