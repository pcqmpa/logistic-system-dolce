/**
 * Input group component.
 * @module src/client/components/layout/input-group
 */
// React.
import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Styles.
import '../../styles/components/_input-group.scss';

const InputGroup = ({
  children,
  theme,
  layout,
  center,
  className
}) => {
  const componentClass = 'cp-input-group';
  let config = '';

  config += componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  if (center) {
    config += `${componentClass}--center `;
  }

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
  center: PropTypes.bool,
  className: PropTypes.string
};

export default InputGroup;
