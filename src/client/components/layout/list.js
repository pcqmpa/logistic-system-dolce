/**
 * Module with the List layout component.
 * @module src/client/components/layout/list
 */
// React.
import React, { PropTypes } from 'react';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Styles.
import '../../styles/components/_list.scss';

const List = ({
  children,
  className,
  layout,
  theme
}) => {
  const componentClass = 'cp-list';
  let config = '';

  config += componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  config += className || '';

  return (
    <ul className={`${componentClass} ${config.trim()}`}>
      {children}
    </ul>
  );
};

List.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  layout: PropTypes.string,
  theme: PropTypes.string
};

export default List;
