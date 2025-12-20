// @flow
export default (styles: Array<?{} | ?boolean>): {} => {
  return styles.reduce((style, nextStyle) => {
    if (!nextStyle || typeof nextStyle !== 'object') return style;
    return {
      ...style,
      ...nextStyle,
    };
  }, {});
};
