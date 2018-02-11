// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
  select,
  number,
} from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import Layout from './layout.component';

type Props = {
  childCount: number,
  height: string,
  width: string,
};

class LayoutExample extends React.Component<Props> {
  static defaultProps = {
    childCount: 3,
    height: 'inherit',
  };

  renderChildren = () => {
    const children = [];
    for (let i = 0; i < this.props.childCount; i++) {
      children.push(
        <Layout
          align="center center"
          key={i}
          style={{
            border: `1px solid white`,
            color: 'white',
            textAlign: 'center',
            minWidth: 100,
            minHeight: 100,
          }}
        >
          {i}
        </Layout>,
      );
    }
    return children;
  };

  render() {
    const { childCount, height, width, ...props } = this.props;
    return (
      <div style={{ width, background: 'gray', height }}>
        <Layout style={{ height: '100%' }} {...props}>
          {this.renderChildren()}
        </Layout>
      </div>
    );
  }
}

storiesOf('Layout', module)
  .addDecorator(withKnobs)
  .add(
    'Flex Layout',
    withInfo({
      propTables: [Layout],
      propTablesExclude: [LayoutExample],
    })(() => (
      <LayoutExample
        childCount={number('example_childCount', 3)}
        height={select(
          'example_containerHeight',
          ['auto', '100px', '500px'],
          '500px',
        )}
        width={select(
          'example_containerWidth',
          ['auto', '100px', '500px'],
          '500px',
        )}
        wrap={boolean('wrap', Layout.defaultProps.wrap)}
        flex={boolean('flex', Layout.defaultProps.flex)}
        direction={select(
          'direction',
          ['row', 'column'],
          Layout.defaultProps.direction,
        )}
        align={select(
          'align',
          Layout.supportedAligns,
          Layout.defaultProps.align,
        )}
      />
    )),
  );
