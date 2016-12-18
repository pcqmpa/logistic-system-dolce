import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

const CheckBox = ({
  children,
  className,
  onChange,
  name,
  value,
  theme,
  layout
}) => {
  const componentClass = 'check-box';
  let config = '';

  config += componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  config += className || '';

  return (
    <label
      htmlFor={name}
      className={`c-field c-field--choice c-label ${config.trim()}`}
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      {children}
    </label>
  );
};

CheckBox.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.string,
  layout: PropTypes.string
};

export default CheckBox;
