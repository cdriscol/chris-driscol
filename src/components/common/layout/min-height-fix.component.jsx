// @flow
// https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items

import * as React from 'react';
import styles from './layout.styles';

type Props = {
  style?: {},
  children: React.Node,
};

const MinHeightFix = ({ children, style }: Props) => (
  <div
    style={{
      ...styles.column,
      ...(style || {}),
    }}
  >
    {children}
  </div>
);

export default MinHeightFix;
