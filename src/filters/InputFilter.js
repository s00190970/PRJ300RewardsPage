import React, { Component, PropTypes } from 'react';
import filter from './filter';

const { func, string } = PropTypes;

class InputFilters extends Component {
  static propTypes = {
    updateFilter: func.isRequired,
  }

  onChange = ({ target: { value } }) => {
    this.props.updateFilter(value);
  }

  render() {
    return <input onChange={this.onChange} />
  }
}

export default filter(InputFilters);