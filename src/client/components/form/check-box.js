import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

const CheckBox = ({
  id,
  children,
  className,
  onChange,
  name,
  label,
  valid,
  value,
  checked,
  theme,
  layout
}) => {
  const componentClass = 'cp-check-box';
  let config = '';

  config += componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  if (!valid) {
    config += `${componentClass}--invalid `;
  }

  config += className || '';

  if (label) {
    return (
      <label
        htmlFor={name}
        className={`c-field c-field--choice c-label ${config.trim()}`}
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {children}
      </label>
    );
  }

  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      value={value}
      checked={checked}
      className={`${componentClass} ${config.trim()}`}
      onChange={onChange}
    />
  );
};

CheckBox.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  label: PropTypes.bool,
  name: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  theme: PropTypes.string,
  layout: PropTypes.string
};

CheckBox.defaultProps = {
  valid: true
};

export default CheckBox;
