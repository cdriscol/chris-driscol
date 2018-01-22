import React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import FaHeart from 'react-icons/lib/fa/heart';
import { createFragmentContainer, graphql } from 'react-relay';
import Typed from 'react-typed';
import './skills.css';
import SkillsBlock from './skills-block.component';

function Skills({ skills }) {
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
            I <FaHeart style={{ color: 'pink' }} />
            <Typed strings={skills.loves} loop typeSpeed={100} />
          </div>
        </div>
      </div>
    </section>
  );
}

Skills.propTypes = {
  skills: PropTypes.shape({
    loves: PropTypes.arrayOf(PropTypes.string).isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    tools: PropTypes.arrayOf(PropTypes.string).isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

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
