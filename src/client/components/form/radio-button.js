import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

const RadioButton = ({
  id,
  children,
  className,
  value,
  onChange,
  name,
  checked,
  theme,
  layout
}) => {
  const componentClass = 'radio-button';
  let config = '';

  config += componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  config += className || '';

  return (
    <label
      htmlFor={id}
      className={`c-field c-field--choice c-label ${config.trim()}`}
    >
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  checked: PropTypes.bool,
  theme: PropTypes.string,
  layout: PropTypes.string
};

export default RadioButton;
