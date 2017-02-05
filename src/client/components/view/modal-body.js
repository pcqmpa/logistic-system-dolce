/**
 * Module with the Modal - Body component.
 * @module src/client/components/view/modal-body
 */
// React.
import React, { PropTypes } from 'react';

const ModalBody = ({
  children,
  className,
  scroll
}) => {
  const componentClass = 'cp-modal__body';
  let config = '';

  if (scroll) {
    config += 'o-panel ';
  }

  config += className || '';

  return (
    <div className={`c-card__body ${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  scroll: PropTypes.bool
};

export default ModalBody;
