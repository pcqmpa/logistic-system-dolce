/**
 * Module with the Button component.
 * @module src/client/components/form/button
 */
import React from 'react';
import PropTypes from 'prop-types';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Styles.
import '../../styles/components/_button.scss';

const Button = ({
  id,
  type,
  children,
  className,
  onClick,
  group,
  size,
  block,
  close,
  theme,
  layout
}) => {
  const componentClass = 'c-button';
  let config = '';

  config += componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  if (block) {
    config += `${componentClass}--block `;
  }

  if (close) {
    config += `${componentClass}--close `;
  }

  if (size) {
    config += `u-${size} `;
  }

  config += className || '';

  return (
    <button
      id={id}
      type={type}
      data-group={group}
      className={`c-button ${config.trim()}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  group: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  block: PropTypes.bool,
  close: PropTypes.bool,
  theme: PropTypes.string,
  layout: PropTypes.string
};

export default Button;
