/**
 * Input group component.
 * @module src/client/components/layout/input-group
 */
// React.
import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

const InputGroup = ({
  children,
  theme,
  layout,
  className
}) => {
  const componentClass = 'input-group';
  let config = '';

  config += componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  config += className || '';

  return (
    <div className={`c-input-group ${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  layout: PropTypes.string,
  className: PropTypes.string
};

export default InputGroup;
