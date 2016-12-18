/* eslint-disable react/no-danger */
/**
 * Module with the render html component.
 * @module src/server/components/html
 */
// React.
import React, { Component, PropTypes } from 'react';

// App Config.
import { MOUNT_ID } from '../../../config/config';

class Html extends Component {
  static propTypes = {
    assets: PropTypes.shape().isRequired,
    children: PropTypes.node.isRequired,
    preloadedState: PropTypes.string.isRequired
  };

  mapStyles = styles => (
    Object.keys(styles).map((style, key) => (
      <link key={key} rel="stylesheet" href={styles[style]} />
    ))
  );

  mapScripts = scripts => (
    Object.keys(scripts).map((script, key) => (
      <script key={key} src={scripts[script]} />
    ))
  );

  render() {
    const { assets, children, preloadedState } = this.props;
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Logística - DOLCE</title>
          {/* Render Styles. */}
          {this.mapStyles(assets.styles)}
        </head>
        <body className="c-text">
          {/* Render Content. */}
          <div id={MOUNT_ID}>{children}</div>
          <script dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${preloadedState}` }} />
          {/* Render Scripts. */}
          {this.mapScripts(assets.javascript)}
        </body>
      </html>
    );
  }
}

export default Html;
