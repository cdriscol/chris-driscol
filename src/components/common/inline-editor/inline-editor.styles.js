// @flow
const defaultBezier = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition = (
  props: string | $ReadOnlyArray<string> = 'all',
  speed: number = 250,
  bezier: string = defaultBezier,
): { transition: string } => {
  let propNames = props;
  if (!Array.isArray(propNames)) propNames = [propNames];
  const transition = propNames
    .map(p => `${p} ${bezier} ${speed}ms`)
    .join(', ');
  return { transition };
};

const iconSvg = {
  ...transition('opacity', 100),
  height: 12,
  width: 12,
  color: 'gray',
  opacity: 1,
  position: 'absolute',
  top: 6,
  right: 6,
  zIndex: -1,
};

export default {
  wrapper: {
    flexDirection: 'column',
    boxSizing: 'border-box',
    display: 'flex',
  },
  inner: {},
  inputWrapper: {
    flexDirection: 'column',
    boxSizing: 'border-box',
    display: 'flex',
    position: 'relative',
    zIndex: 0,
  },
  input: {
    paddingLeft: 8,
    paddingTop: 5,
    paddingBottom: 5,
    width: '100%',
    fontSize: 20,
    fontWeight: 500,
    paddingRight: iconSvg.width + iconSvg.right,
    color: 'black',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderRadius: 5,
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    ...transition(['color', 'border-color']),
    ':hover': {
      borderColor: 'gray',
    },
    ':focus': {
      outline: 'none',
      borderColor: 'gray',
      color: 'black',
      fontStyle: 'normal',
    },
  },
  emptyInput: {
    fontStyle: 'oblique',
    color: 'black',
  },
  inputValue: {
    paddingLeft: 8,
    paddingRight: iconSvg.width + iconSvg.right,
    whiteSpace: 'pre',
    position: 'absolute',
    color: 'transparent',
    visibility: 'hidden',
    width: 'auto',
    overflow: 'auto',
    boxSizing: 'border-box',
    border: 'solid 1px transparent',
    display: 'inline-block',
  },
  invalid: {
    borderColor: 'red',
    ':hover': {
      borderColor: 'red',
    },
    ':focus': {
      borderColor: 'red',
    },
  },
  count: {
    ...transition(),
    fontSize: 12,
    textAlign: 'right',
    overflow: 'hidden',
  },
  countWithError: {
    height: 0,
  },
  invalidCount: {
    color: 'red',
  },
  validCount: {
    color: 'green',
  },
  errorCount: {
    color: 'red',
  },
  messages: {
    flexDirection: 'row',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    maxWidth: '100%',
  },
  errorWrapper: {
    flex: 1,
    boxSizing: 'border-box',
    position: 'relative',
    height: 0,
  },
  iconWrapper: {},
  iconSvg,
  iconSvg_focused: {
    opacity: 0,
  },
  error: {
    ...transition(),
    fontSize: 12,
    color: 'red',
    position: 'absolute',
    left: 0,
  },
};
