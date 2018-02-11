// @flow
import * as React from 'react';
import ContentCreate from 'react-material-icons/icons/content/create';
import combineStyles from '../combine-styles';
import styles from './inline-editor.styles';

type Props = {
  value: ?string,
  defaultValue?: string,
  isDefaultValue?: (?string) => boolean,
  maxChars?: number,
  onChange?: (?string) => void,
  onFocus?: () => void,
  onBlur?: () => void,
  error?: string,
  style?: {},
  children?: React.Node,
};

type State = {
  focused: boolean,
  inputWidth: number,
  innerMaxWidth?: number,
};

export default class InlineEditor extends React.Component<Props, State> {
  input: ?HTMLInputElement;
  childWrapper: ?{ offsetWidth: number };
  inputPlaceholder: ?{ offsetWidth: number, style: any };
  wrapper: ?{ offsetWidth: number };

  static defaultProps = {
    defaultValue: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      focused: false,
      inputWidth: 0,
    };
  }

  isOverMaxLength = () => {
    const { maxChars, value } = this.props;
    if (value === null || value === undefined) return;
    return maxChars ? value.length > maxChars : false;
  };

  isDefault = () => {
    const { isDefaultValue, defaultValue, value } = this.props;
    return isDefaultValue ? isDefaultValue(value) : defaultValue === value;
  };

  handleChange = ({ target }: { target: { value: string } }) => {
    const { onChange } = this.props;
    const { value } = target;
    if (onChange) onChange(value);
  };

  handleBlur = () => {
    const { onBlur, onChange, defaultValue, value } = this.props;
    this.setState({ focused: false });
    if (onBlur) onBlur();
    if (!value && onChange) onChange(defaultValue);
  };

  handleFocus = () => {
    this.setState({ focused: true });
    const { onFocus, value } = this.props;
    if (value === null || value === undefined) return;
    if (this.input) this.input.setSelectionRange(0, value.length);
    if (onFocus) onFocus();
  };

  updateInputWidth = () => {
    if (!this.inputPlaceholder || !this.inputPlaceholder.offsetParent) return;
    const childWidth = this.childWrapper ? this.childWrapper.offsetWidth : 0;
    const domWidth = this.inputPlaceholder.offsetWidth + childWidth + 18;
    const { inputWidth, innerMaxWidth } = this.state;
    if (innerMaxWidth === null || innerMaxWidth === undefined) return;
    const minDomWidth = Math.min(innerMaxWidth, domWidth);
    if (minDomWidth === inputWidth) return;
    this.setState({ inputWidth: minDomWidth });
  };

  setMaxWidth = () => {
    if (!this.wrapper) return;
    this.setState({ innerMaxWidth: this.wrapper.offsetWidth - 2 });
  };

  componentDidMount = () => {
    setTimeout(this.setMaxWidth, 0);
    setTimeout(this.copyInputStyles, 0);
    setTimeout(this.updateInputWidth, 0);
  };

  componentDidUpdate = () => {
    setTimeout(this.updateInputWidth, 0);
    this.copyInputStyles();
  };

  copyInputStyles = () => {
    if (!window.getComputedStyle) return;

    const inputStyle = this.input && window.getComputedStyle(this.input);
    if (!inputStyle) return;

    const widthNode = this.inputPlaceholder;
    if (!widthNode || !widthNode.style) return;
    widthNode.style.fontSize = inputStyle.fontSize;
    widthNode.style.fontFamily = inputStyle.fontFamily;
    widthNode.style.fontWeight = inputStyle.fontWeight;
    widthNode.style.fontStyle = inputStyle.fontStyle;
    widthNode.style.letterSpacing = inputStyle.letterSpacing;
    widthNode.style.textTransform = inputStyle.textTransform;
  };

  render() {
    const {
      error,
      children,
      defaultValue,
      isDefaultValue,
      maxChars,
      value,
      onChange,
      onBlur,
      style,
      onFocus,
      ...inputProps
    } = this.props;
    const { focused, inputWidth, innerMaxWidth } = this.state;
    const isOverCharLimit = this.isOverMaxLength();
    return (
      <div
        style={styles.wrapper}
        ref={e => {
          this.wrapper = e;
        }}
      >
        <div
          style={combineStyles([styles.inner, { maxWidth: innerMaxWidth }])}
        >
          <div
            style={combineStyles([styles.inputWrapper, { width: inputWidth }])}
          >
            <div
              style={styles.inputValue}
              ref={element => {
                this.inputPlaceholder = element;
              }}
            >
              {value}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  ref={e => {
                    this.input = e;
                  }}
                  value={value}
                  style={combineStyles([
                    styles.input,
                    (isOverCharLimit || !!error) && styles.invalid,
                    this.isDefault() && styles.emptyInput,
                    style,
                  ])}
                  type="text"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  onFocus={this.handleFocus}
                  {...inputProps}
                />
                <ContentCreate
                  style={combineStyles([
                    styles.iconSvg,
                    focused && styles.iconSvg_focused,
                  ])}
                />
              </div>
              <div
                ref={e => {
                  this.childWrapper = e;
                }}
              >
                {children}
              </div>
            </div>
            <div style={styles.messages}>
              <div
                style={combineStyles([
                  styles.count,
                  isOverCharLimit && styles.invalidCount,
                  !!error && styles.countWithError,
                ])}
              >
                {this.props.maxChars &&
                  value &&
                  `${value.length}/${this.props.maxChars}`}
              </div>
            </div>
          </div>
          <div style={styles.errorWrapper}>
            <div
              style={combineStyles([
                styles.error,
                { opacity: error ? 1 : 0, top: error ? 0 : -10 },
              ])}
            >
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
