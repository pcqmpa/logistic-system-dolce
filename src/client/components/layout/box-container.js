/**
 * BoxContainer component.
 * @module src/client/components/layout/box-container
 */
import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

const BoxContainer = ({
  children,
  className,
  size,
  letter,
  pillar,
  window
}) => {
  let componentClass;

  if (letter) {
    componentClass = 'u-letter-box';
  }

  if (pillar) {
    componentClass = 'u-pillar-box';
  }

  if (window) {
    componentClass = 'u-window-box';
  }

  let config = '';

  config += componentHelpers.generateComponentStyleConfig(
    componentClass, [size]
  );

  config += className || '';

  return (
    <div className={`${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

BoxContainer.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string.isRequired,
  className: PropTypes.string,
  letter: PropTypes.bool,
  pillar: PropTypes.bool,
  window: PropTypes.bool
};

export default BoxContainer;
