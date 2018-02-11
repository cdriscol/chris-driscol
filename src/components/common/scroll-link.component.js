// @flow
import * as React from 'react';
import { Link } from 'react-scroll';
import ReactGA from 'react-ga';

type Props = {
  children: React.Node,
};

export default function ScrollLink({ children, ...extraProps }: Props) {
  const handleSetActive = (to: string) =>
    ReactGA.event({
      category: 'Scroll',
      action: to,
    });
  return (
    <Link
      offset={-70}
      style={{ cursor: 'pointer' }}
      smooth="easeInOutQuart"
      duration={1500}
      onSetActive={handleSetActive}
      {...extraProps}
    >
      {children}
    </Link>
  );
}
