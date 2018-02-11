// @flow
import React from 'react';
import classNames from 'classnames';
import FaHeart from 'react-icons/lib/fa/heart';
import { createFragmentContainer, graphql } from 'react-relay';
import Typed from 'react-typed';
import './skills.css';
import SkillsBlock from './skills-block.component';
import type { skills_skills } from './__generated__/skills_skills.graphql';

type Props = {
  skills: skills_skills,
};

function Skills({ skills }: Props) {
  return (
    <section className={classNames('home-section', 'skills')} id="skills">
      <div className="container">
        <div className="row">
          <div className={classNames('col-lg-12', 'text-center')}>
            <h2 className="section-heading">My Skills</h2>
            <p className="section-subheading text-muted">
              {`These are some things I've picked up over the years..`}
            </p>
          </div>
        </div>
        <div className="color-gray">
          <div className="container">
            <div className="row">
              <SkillsBlock title="languages" skills={skills.languages} />
              <SkillsBlock title="technologies" skills={skills.technologies} />
              <SkillsBlock title="tools" skills={skills.tools} />
            </div>
          </div>
          <div className={classNames('container', 'ilove')}>
            I <FaHeart style={{ color: 'pink' }} />{' '}
            <Typed strings={skills.loves} loop typeSpeed={100} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default createFragmentContainer(
  Skills,
  graphql`
    fragment skills_skills on Skills {
      loves
      languages
      tools
      technologies
    }
  `,
);
