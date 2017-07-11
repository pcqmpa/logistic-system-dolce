/**
 * Module with the data table component.
 * @module src/client/components/layout/data-table
 */
// React.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components.
import { Button } from '../';

// Utils.
import { componentHelpers } from '../../../shared/utils/';

// Constants.
import { BRAND, SMALL_SIZE } from '../../../shared/constants/types';

// Styles.
import '../../styles/components/_data-table.scss';

class DataTable extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.string,
    layout: PropTypes.string,
    selected: PropTypes.number,
    className: PropTypes.string,
    paginators: PropTypes.arrayOf(PropTypes.object),
    onClickPaginator: PropTypes.func
  };

  mapPaginators = (componentClass) => {
    const {
      selected,
      paginators,
      onClickPaginator
    } = this.props;
    const paginatorClass = `${componentClass}__paginator`;

    if (paginators.length > 1) {
      return (
        paginators.map((paginator, key) => {
          const selectedClass =
            (paginator.value === selected) ?
              `c-button--active ${paginatorClass}--active` : '';
          return (
            <Button
              key={btoa(`data_table_paginator_${key}`)}
              theme={BRAND}
              size={SMALL_SIZE}
              className={`${paginatorClass} ${selectedClass.trim()}`}
              onClick={onClickPaginator(paginator.value)}
            >
              {paginator.text}
            </Button>
          );
        })
      );
    }

    return '';
  };

  render() {
    const {
      children,
      theme,
      layout,
      className
    } = this.props;
    const componentClass = 'cp-data-table';
    let config = '';

    config += componentHelpers.generateComponentStyleConfig(componentClass, [
      theme,
      layout
    ]);

    config += className || '';

    return (
      <div className={`${componentClass} ${config.trim()}`}>
        <div className={`${componentClass}__container`}>
          {children}
        </div>
        {this.mapPaginators(componentClass)}
      </div>
    );
  }
}

export default DataTable;
