/**
 * Table head component.
 * @module src/client/components/layout/table-head
 */
// React.
import React, { PropTypes } from 'react';

// Components
import { TableCell } from '../';

const TableHead = ({ className, titles }) => (
  <div className={`c-table__row c-table__row--heading ${className || ''}`}>
    {titles.map((title, key) => (
      <TableCell key={key} className={title.className}>
        {title.text}
      </TableCell>
    ))}
  </div>
);

TableHead.propTypes = {
  className: PropTypes.string,
  titles: PropTypes.arrayOf(PropTypes.object)
};

export default TableHead;
