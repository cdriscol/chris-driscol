// https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, css } from '../../styles/with-styles';
import componentStyles from './layout.styles';
import { propTypes as layoutPropTypes } from './props';

const MinHeightFix = ({ children, style, styles }) => (
	<div {...css([styles.column, style])}>
		{ children }
	</div>
);

MinHeightFix.propTypes = {
	children: PropTypes.node.isRequired,
	style: layoutPropTypes.style,
	styles: PropTypes.object
};

export default withStyles(componentStyles)(MinHeightFix);
