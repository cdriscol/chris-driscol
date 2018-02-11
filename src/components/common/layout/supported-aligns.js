// @flow
const supportedJustifyProps = [
  'start',
  'center',
  'end',
  'space-between',
  'space-around',
];
const supportedAlignProps = ['start', 'center', 'end', 'stretch'];
export default supportedJustifyProps.reduce((supported, justify) => {
  supportedAlignProps.forEach(align => supported.push(`${justify} ${align}`));
  return supported;
}, []);
