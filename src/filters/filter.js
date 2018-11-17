import React, { Component, PropTypes } from 'react';

const { func, string } = PropTypes;

export default function filter(ComposedComponent) {
  return class Filter extends Component {
    static contextTypes = {
      updateFilter: func.isRequired,
    }

    static propTypes = {
      filterName: string.isRequired,
    }

    updateFilter = (value) => {
      this.context.updateFilter(this.props.filterName, value);
    }

    render() {
      const props = { ...this.props, updateFilter: this.updateFilter };
      return <ComposedComponent {...props} />;
    }
  }
}