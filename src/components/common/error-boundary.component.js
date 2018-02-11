// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
};
type State = {
  hasError: boolean,
  error?: Error,
  info?: any,
};
export default class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  componentDidCatch(error: Error, info: any) {
    this.setState({ hasError: true, error, info });
  }

  renderError() {
    if (!this.state.error) return null;
    return (
      <div>
        <h3>Something went wrong..</h3>
        <p>{this.state.error.toString()}</p>
      </div>
    );
  }

  render() {
    if (this.state.hasError) this.renderError();
    return this.props.children;
  }
}
