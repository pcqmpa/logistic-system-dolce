import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Styles.
import '../../styles/components/_input-box.scss';

const TextArea = ({
  id,
  valid,
  value,
  name,
  label,
  type,
  disabled,
  onChange,
  className,
  placeholder,
  rows,
  cols,
  theme,
  layout
}) => {
  const componentClass = 'cp-text-area';
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
      <label htmlFor={id} className="c-label o-form-element cp-label-text-area">
        {label}
        <textarea
          id={id}
          type={type || 'text'}
          name={name}
          rows={rows}
          cols={cols}
          className={`c-field c-field--label ${componentClass} ${config.trim()}`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
      </label>
    );
  }
  return (
    <textarea
      id={id}
      name={name}
      type={type || 'text'}
      rows={rows}
      cols={cols}
      className={`c-field ${componentClass} ${config.trim()}`}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
    />
  );
};

TextArea.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  theme: PropTypes.string,
  layout: PropTypes.string
};

TextArea.defaultProps = {
  valid: true
};

export default TextArea;
