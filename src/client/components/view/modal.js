/**
 * Module with the Modal component.
 * @module src/client/components/view/modal
 */
// React.
import React, { PropTypes } from 'react';

// Animations
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Styles.
import '../../styles/components/_modal.scss';

const Modal = ({
  children,
  theme,
  layout,
  className,
  show,
  ghost,
  full
}) => {
  const componentClass = 'cp-modal';
  let config = '';
  let contentConfig = '';
  const animation = {
    name: 'simple-transition',
    enterDelay: 300,
    leaveDelay: 700
  };

  config += componentHelpers.generateComponentStyleConfig(componentClass, [
    theme,
    layout
  ]);

  if (ghost) {
    contentConfig += 'o-modal--ghost ';
  }

  if (full) {
    contentConfig += 'o-modal--full ';
  }

  if (show) {
    config += `${componentClass}--show `;
  }

  config += className || '';

  const modalContent = (
    <div className={`c-overlay ${componentClass} ${config.trim()}`}>
      <div className={`o-modal cp-modal__content ${contentConfig.trim()}`}>
        <div className="c-card">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <ReactCssTransitionGroup
      transitionName={animation.name}
      transitionEnterTimeout={animation.enterDelay}
      transitionLeaveTimeout={animation.leaveDelay}
    >
      { show && modalContent }
    </ReactCssTransitionGroup>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  layout: PropTypes.string,
  className: PropTypes.string,
  show: PropTypes.bool,
  ghost: PropTypes.bool,
  full: PropTypes.bool
};

export default Modal;
