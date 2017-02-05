/**
 * Module with the Modal - Header component.
 * @module src/client/components/view/modal-header
 */
// React.
import React, { PropTypes } from 'react';

// Components.
import { Button } from '../';

const ModalHeader = ({
  children,
  className,
  handleCloseClick
}) => {
  const componentClass = 'cp-modal__header';
  const config = className || '';

  return (
    <div className={`c-card__header ${componentClass} ${config.trim()}`}>
      <Button
        close
        className="cp-modal__close"
        onClick={handleCloseClick}
      >
        ×
      </Button>
      {children}
    </div>
  );
};

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  handleCloseClick: PropTypes.func
};

export default ModalHeader;
