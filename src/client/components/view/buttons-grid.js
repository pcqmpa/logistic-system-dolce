import React, { PropTypes } from 'react';

// Components.
import {
  Field,
  ButtonGridCell
} from '../';

const ButtonsGrid = ({
  groupName,
  handleChangeGroup,
  cells
}) => (
  <Field
    className="buttons-grid"
    listInline
  >
    {cells.map((cell, key) => (
      <ButtonGridCell
        id={`${groupName}_${key}`}
        key={btoa(`button_grid_${key}`)}
        value={cell.value}
        name={groupName}
        checked={cell.checked}
        onChange={handleChangeGroup(cell.value)}
      >
        {cell.text}
      </ButtonGridCell>
    ))}
  </Field>
);

ButtonsGrid.propTypes = {
  groupName: PropTypes.string.isRequired,
  handleChangeGroup: PropTypes.func.isRequired,
  cells: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ButtonsGrid;
