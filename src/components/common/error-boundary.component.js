import React from 'react';
import * as PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  renderError() {
    return (
      <div>
        <h3>Something went wrong..</h3>
        <p>{this.state.error}</p>
      </div>
    );
  }

  render() {
    if (this.state.hasError) this.renderError();
    return this.props.children;
  }
}
