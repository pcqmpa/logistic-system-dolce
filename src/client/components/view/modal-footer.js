/**
 * Module with the Modal - Footer component.
 * @module src/client/components/view/modal-footer
 */
// React.
import React, { PropTypes } from 'react';

const ModalFooter = ({ children, className }) => {
  const componentClass = 'cp-moda__footer';
  const config = className || '';

  return (
    <div className={`c-card__footer ${componentClass} ${config.trim()}`}>
      {children}
    </div>
  );
};

ModalFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default ModalFooter;
