/**
 * Input group item component.
 * @module src/client/components/layout/input-group-item
 */
// React.
import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

const InputGroupItem = ({
  children,
  theme,
  layout,
  className
}) => {
  const componentClass = 'input-group__item';
  let config = '';

  config += componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  config += className || '';

  return (
    <div className={`o-field ${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

InputGroupItem.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  layout: PropTypes.string,
  className: PropTypes.string
};

export default InputGroupItem;
