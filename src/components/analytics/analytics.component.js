// @flow
import * as React from 'react';
import ReactGA from 'react-ga';

type Props = { children: React.Node };
export default class Analytics extends React.Component<Props> {
  componentDidMount() {
    ReactGA.initialize('UA-113938995-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return this.props.children;
  }
}
