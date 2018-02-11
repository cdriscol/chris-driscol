import React from 'react';
import { withStyles, css } from '../../styles/with-styles';
import { isIE, getBrowserMajorVersion } from '../browser';
import componentStyles from './layout.styles';
import MinHeightFix from './min-height-fix.component';
import supportedAligns from './supported-aligns';
import { propTypes, defaultProps } from './props';

const isIE11OrLower = isIE() && getBrowserMajorVersion() <= 11;
function Layout (props) {
	const { children, styles, wrap, direction, style, flex, theme, align, ...extraProps } = props;

	const getJustifyStyles = justify => {
		const { styles } = props;
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
		const [justify, align] = props.align.split(' ');
		const alignStyle = getAlignStyles(align);
		const justifyStyle = getJustifyStyles(justify);
		return [justifyStyle, alignStyle];
	};

	// https://github.com/philipwalton/flexbugs#4-flex-shorthand-declarations-with-unitless-flex-basis-values-are-ignored
	const getFlexBasisFix = () => flex && isIE11OrLower && styles.flexBasisAuto;

	const renderFlexChild = isWrapped => {
		return (
			<div
				{...extraProps}
				{...css([
					direction === 'row' ? styles.row : styles.column,
					wrap && styles.wrap,
					flex && styles.flex,
					...getFlexChildStyles(),
					!isWrapped && style,
					isWrapped && style && { minHeight: style.minHeight },
					getFlexBasisFix()
				])}>
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

Layout.defaultProps = defaultProps;
Layout.propTypes = propTypes;
Layout.supportedAligns = supportedAligns;

export default withStyles(componentStyles)(Layout);
