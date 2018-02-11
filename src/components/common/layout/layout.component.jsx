// @flow
import * as React from 'react';
import { isIE, getBrowserMajorVersion } from './browser';
import styles from './layout.styles';
import MinHeightFix from './min-height-fix.component';
import supportedAligns from './supported-aligns';

const isIE11OrLower = isIE() && getBrowserMajorVersion() <= 11;

type Props = {
  style?: {
    +minHeight?: number,
  },
  children: React.Node,
  wrap: boolean,
  direction: 'row' | 'column',
  align: string,
  flex: boolean,
};

export default function Layout(props: Props) {
  const {
    children,
    wrap,
    direction,
    style,
    flex,
    align,
    ...extraProps
  } = props;

  const getJustifyStyles = justify => {
    switch (justify) {
      case 'start':
        return styles.justifyStart;
      case 'center':
        return styles.justifyCenter;
      case 'end':
        return styles.justifyEnd;
      case 'space-between':
        return styles.justifySpaceBetween;
      case 'space-around':
        return styles.justifySpaceAround;
    }
  };

  const getAlignStyles = align => {
    switch (align) {
      case 'start':
        return styles.alignStart;
      case 'center':
        return styles.alignCenter;
      case 'end':
        return styles.alignEnd;
      case 'stretch':
        return styles.alignStretch;
    }
  };

  const getFlexChildStyles = () => {
    const [justify, alignProp] = align.split(' ');
    const alignStyle = getAlignStyles(alignProp);
    const justifyStyle = getJustifyStyles(justify);
    return [justifyStyle, alignStyle];
  };

  // https://github.com/philipwalton/flexbugs#4-flex-shorthand-declarations-with-unitless-flex-basis-values-are-ignored
  const getFlexBasisFix = () => flex && isIE11OrLower && styles.flexBasisAuto;

  const combineStyles = (styles: Array<?{} | ?boolean>): {} => {
    return styles.reduce((style, nextStyle) => {
      if (!nextStyle || typeof nextStyle !== 'object') return style;
      return {
        ...style,
        ...nextStyle,
      };
    }, {});
  };

  const renderFlexChild = isWrapped => {
    return (
      <div
        {...extraProps}
        style={combineStyles([
          direction === 'row' ? styles.row : styles.column,
          wrap && styles.wrap,
          flex && styles.flex,
          ...getFlexChildStyles(),
          !isWrapped && style,
          isWrapped && style && { minHeight: style.minHeight },
          getFlexBasisFix(),
        ])}
      >
        {children}
      </div>
    );
  };

  const needsIeWrapper = () => {
    // TODO: Find min height in array, computed style, etc
    return style && Number.isFinite(style.minHeight);
  };

  if (!needsIeWrapper()) return renderFlexChild();

  const { minHeight, ...wrapperStyle } = style || {};
  return (
    <MinHeightFix style={wrapperStyle} styles={styles}>
      {renderFlexChild(true)}
    </MinHeightFix>
  );
}

Layout.defaultProps = {
  wrap: false,
  direction: 'row',
  align: 'start stretch',
  flex: false,
};
Layout.supportedAligns = supportedAligns;
