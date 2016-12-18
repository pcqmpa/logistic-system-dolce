/* eslint-disable import/no-extraneous-dependencies */
/**
 * Module with the redux devtools container.
 * @module src/shared/containers/dev-tools
 */

import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    changeMonitorKey="ctrl-m"
  >
    <LogMonitor />
  </DockMonitor>
);
