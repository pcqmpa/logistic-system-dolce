/**
 * Module with the users list filter component.
 * @module src/client/components/view/users-filter
 */
// React.
import React, { PropTypes } from 'react';

// Components.
import {
  Grid,
  GridCell,
  Icon,
  Button,
  InputBox,
  SelectBox,
  InputGroup,
  InputGroupItem
} from '../';

// Constants.
import {
  USER_TYPE_FILTER,
  USER_FULLNAME_FILTER
} from '../../constants/strings';
import {
  BACKSPACE,
  ACCOUNT_PLUS
} from '../../constants/icons';
import {
  DARK,
  BUTTON_ICON
} from '../../constants/themes';
import { XLARGE_SIZE } from '../../../shared/constants/types';

const UsersFilter = ({
  rules,
  types,
  filter,
  onClearFilter,
  onFilterChanges,
  linkToNewUser
}) => (
  <Grid noGutter>
    <GridCell width={10}>
      <Button
        size={XLARGE_SIZE}
        layout={BUTTON_ICON}
        onClick={linkToNewUser}
      >
        <Icon
          type={ACCOUNT_PLUS}
          iconTheme={DARK}
        />
      </Button>
    </GridCell>
    <GridCell width={40}>
      <InputGroup>
        <InputGroupItem>
          <InputBox
            id="fullname_filter"
            name="fullname_filter"
            valid={rules.fullname.valid}
            value={filter.fullname}
            onChange={onFilterChanges(USER_FULLNAME_FILTER)}
            placeholder="Filtro de usuarios"
          />
        </InputGroupItem>
        <InputGroupItem>
          <SelectBox
            id="user_type_filter"
            name="user_type_filter"
            placeholder="Tipo de usuario"
            valid={rules.type.valid}
            value={filter.type}
            options={types}
            onChange={onFilterChanges(USER_TYPE_FILTER)}
          />
        </InputGroupItem>
        <Button
          size={XLARGE_SIZE}
          layout={BUTTON_ICON}
          onClick={onClearFilter}
        >
          <Icon
            type={BACKSPACE}
            iconTheme={DARK}
          />
        </Button>
      </InputGroup>
    </GridCell>
  </Grid>
);

UsersFilter.propTypes = {
  rules: PropTypes.shape().isRequired,
  types: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.shape(),
  onClearFilter: PropTypes.func,
  onFilterChanges: PropTypes.func,
  linkToNewUser: PropTypes.func
};

export default UsersFilter;
