import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Styles.
import '../../styles/components/_select-box.scss';

const SelectBox = ({
  id,
  name,
  valid,
  value,
  label,
  options,
  onChange,
  className,
  placeholder,
  theme,
  layout
}) => {
  const componentClass = 'cp-select-box';
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
        className="c-label o-form-element cp-label-select-box"
      >
        {label}
        <select
          id={id}
          name={name}
          value={value}
          className={`c-field c-field--label ${componentClass} ${config.trim()}`}
          onChange={onChange}
        >
          <option value="none">{placeholder}</option>
          {options.map((option, key) => (
            <option key={key} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <select
      id={id}
      name={name}
      value={value}
      className={`c-field ${componentClass} ${config.trim()}`}
      onChange={onChange}
    >
      <option value="none">{placeholder}</option>
      {options.map((option, key) => (
        <option key={key} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

SelectBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  layout: PropTypes.string
};

SelectBox.defaultProps = {
  valid: true
};

export default SelectBox;
