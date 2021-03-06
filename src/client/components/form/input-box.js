import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Styles.
import '../../styles/components/_input-box.scss';

const InputBox = ({
  id,
  valid,
  value,
  name,
  label,
  type,
  onChange,
  className,
  placeholder,
  theme,
  layout
}) => {
  const componentClass = 'cp-input-box';
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
      <label htmlFor={id} className="c-label o-form-element cp-label-input-box">
        {label}
        <input
          id={id}
          type={type || 'text'}
          name={name}
          className={`c-field c-field--label ${componentClass} ${config.trim()}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
    );
  }
  return (
    <input
      id={id}
      name={name}
      type={type || 'text'}
      className={`c-field ${componentClass} ${config.trim()}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

InputBox.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  layout: PropTypes.string
};

InputBox.defaultProps = {
  valid: true
};

export default InputBox;
