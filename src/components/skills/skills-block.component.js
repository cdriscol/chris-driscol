import React from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';

const SkillBlock = ({ title, skills }) => (
  <div className={classNames('col-xs-12', 'col-md-4')}>
    <h3 className={classNames('text-center', 'color-silver')}>{title}</h3>
    <p
      className={classNames('text-center', 'color-silver', 'font-size-1_1em')}
    >
      {skills.join(', ')}
    </p>
  </div>
);

SkillBlock.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillBlock;
