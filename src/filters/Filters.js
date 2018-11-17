import React, { Component, PropTypes } from 'react';

const { func } = PropTypes;

class Filters extends Component {
  static propTypes = {
    onChange: func.isRequired,
  }

  static childContextTypes = {
    updateFilter: func,
  }

  state = { filters: {} };

  notifyChange = () => {
    this.props.onChange(this.state.filters);
  }

  updateFilter = (name, value) => {
    this.setState({
      filters: { ...this.state.filters, [name]: value },
    }, this.notifyChange);
  }

  getChildContext() {
    return {
      updateFilter: this.updateFilter,
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Filters;