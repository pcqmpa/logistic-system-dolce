/**
 * Module with the material design icon component.
 * @module src/client/components/view/icon
 */
// React.
import React, { PropTypes } from 'react';

const Icon = ({
  type,
  theme,
  iconTheme,
  className
}) => {
  const componentClass = 'icon';
  let config = '';
  let iconConfig = `mdi-${type} `;

  if (iconTheme) {
    iconConfig += `mdi-${iconTheme} `;
  }

  if (theme) {
    config += `${componentClass}--${theme} `;
  }

  config += className || '';

  return (
    <i
      className={`mdi ${iconConfig.trim()} ${componentClass} ${config.trim()}`}
    />
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  theme: PropTypes.string,
  iconTheme: PropTypes.string,
  className: PropTypes.string
};

export default Icon;
