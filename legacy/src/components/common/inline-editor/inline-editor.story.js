// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number, text, withKnobs } from '@storybook/addon-knobs/react';
import { withInfo } from '@storybook/addon-info';
import InlineEditor from './inline-editor.component';

class InlineEditorExample extends React.Component<any, { value: ?string }> {
  state = {
    value: 'defaultValue',
  };

  render() {
    return (
      <InlineEditor
        defaultValue={text('defaultValue', 'defaultValue')}
        onChange={value => this.setState({ value })}
        value={this.state.value}
        onBlur={action('onBlur')}
        onFocus={action('onFocus')}
        maxChars={number('maxChars', 25)}
        error={text('error', undefined)}
      />
    );
  }
}

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add(
    'Inline Editor',
    withInfo({
      propTables: [InlineEditor],
      propTablesExclude: [InlineEditorExample],
    })(() => <InlineEditorExample />),
  );
