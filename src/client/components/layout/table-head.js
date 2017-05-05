/**
 * Table head component.
 * @module src/client/components/layout/table-head
 */
// React.
import React, { PropTypes } from 'react';

// Components
import { TableCell } from '../';

const TableHead = ({
  className,
  titles,
  center
}) => {
  const componentClass = 'c-table__head';
  const childrenClass = `${componentClass}__cell`;
  const config = className || '';
  let childrenConfig = '';

  if (center) {
    childrenConfig += `${childrenClass}--center `;
  }

  return (
    <div
      className={`c-table__row c-table__row--heading ${componentClass} ${config.trim()}`}
    >
      {titles.map((title, key) => (
        <TableCell
          key={btoa(`table_head_${key}`)}
          className={`${childrenClass} ${childrenConfig.trim()} ${title.className || ''}`}
        >
          {title.text}
        </TableCell>
      ))}
    </div>
  );
};

TableHead.propTypes = {
  className: PropTypes.string,
  titles: PropTypes.arrayOf(PropTypes.object),
  center: PropTypes.bool
};

export default TableHead;
