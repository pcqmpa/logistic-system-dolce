import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Styles.
import '../../styles/components/_radio-button.scss';

const RadioButton = ({
  id,
  children,
  className,
  value,
  onChange,
  name,
  label,
  valid,
  checked,
  theme,
  layout
}) => {
  const componentClass = 'cp-radio-button';
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
  }

  return (
    <input
      id={id}
      name={name}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className={`${componentClass} ${config.trim()}`}
    />
  );
};

RadioButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.bool,
  valid: PropTypes.bool,
  checked: PropTypes.bool,
  theme: PropTypes.string,
  layout: PropTypes.string
};

RadioButton.defaultProps = {
  valid: true
};

export default RadioButton;
