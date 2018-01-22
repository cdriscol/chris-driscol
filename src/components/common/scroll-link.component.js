import React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-scroll';

function ScrollLink({ children, ...extraProps }) {
  return (
    <Link
      style={{ cursor: 'pointer' }}
      smooth="easeInOutQuart"
      duration={1500}
      {...extraProps}
    >
      {children}
    </Link>
  );
}

ScrollLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollLink;
