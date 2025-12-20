// @flow
import React from 'react';
import classNames from 'classnames';

type Props = {
  title: string,
  skills: $ReadOnlyArray<string>,
};

const SkillBlock = ({ title, skills }: Props) => (
  <div className={classNames('col-xs-12', 'col-md-4')}>
    <h3 className={classNames('text-center', 'color-silver')}>{title}</h3>
    <p
      className={classNames('text-center', 'color-silver', 'font-size-1_1em')}
    >
      {skills.join(', ')}
    </p>
  </div>
);

export default SkillBlock;
