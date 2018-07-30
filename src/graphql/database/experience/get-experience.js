// @flow
type ExperienceType = {
  imageUrl: string,
  duration: string,
  location: string,
  description: string,
  title?: string,
};

const buildExperience = (
  imageUrl,
  duration,
  location,
  description,
  title,
): ExperienceType => ({
  imageUrl,
  duration,
  location,
  description,
  title,
});

export default (): Array<ExperienceType> => [
  buildExperience(
    'public/images/about/1.jpg',
    '2001 - 2002',
    'High School',
    `It was a TI-83+ calculator, my brother had shown me a game called Beerhunt he installed on his <i>smart</i> calculator. Once I realized I could hack the source code directly on the calculator, I reverse engineered the price of a beer and claimed the high score. At this point, I was hooked on everything computer science.`,
  ),
  buildExperience(
    'public/images/about/2.jpg',
    'Fall 2004 – Spring 2008',
    'University of Iowa, Iowa City, IA',
    'Started working in help desk troubleshooting problems for faculty and students as well as building computer labs around campus. I ended as a software developer, and developed a FileMaker Pro solution to help the Department of Otolaryngology go paperless.',
    'Help Desk Consultant, Software Developer',
  ),
  buildExperience(
    'public/images/about/3.jpg',
    'Summer 2007',
    'Mayo Clinic, Rochester, MN',
    `Was a key member of a data warehouse re-architecting project, having developed a full-stack web application to gather metadata about how our finance data was reported on. In 3 moths I wrote 22,000+ lines of non-generated C# and HTML code using ASP.Net 2.0.`,
    'Intern Programmer/Analyst',
  ),
  buildExperience(
    'public/images/about/4.jpg',
    'Summer 2008 - Summer 2013',
    'Mayo Clinic, Rochester, MN',
    `Developed and supported more than 70 clinical imaging applications used by the Department of Nuclear Medicine used in multiple states. Was recognized with the Above & Beyond Award in 2013. During my time, I developed 6 clinically used image processing applications for Nuclear Medicine and more than 20 windows services and utility applications to automate several tasks. Became certified and acted as SQL Server Application DBA for my team. Presented on WPF, MVVM, and .Net tooling to more than 50 other software engineers from other teams in 2011.`,
    'Senior Programmer/Analyst, DBA',
  ),
  buildExperience(
    'public/images/about/5.jpg',
    'Summer 2013 - Fall 2015',
    'Rally Software, Boulder, CO',
    'Developed two full-stack web applications including a Customer Community using SalesForce’s Force.com platform, and an On-Demand Learning Management System using the Drupal platform. Contributed to development of several SaaS integrations created with Java, Groovy, Apache Camel, ActiveMQ, ElasticSearch, and Kibana. Responsible for maintenance and development of advanced SalesForce Apex/VisualForce solutions. Participated in agile trainings including Scrum Master, Agile Basics, and SAFe Practitioner. Responsible for facilitating team retros, planning, estimation, pair programming, TDD, and continuous integration.',
    'Enterprise Software Engineer',
  ),
  buildExperience(
    'public/images/favicon/ms-icon-310x310.png',
    'Fall 2013 - Present',
    'Driscol Software LLC, Broomfield, CO',
    'After moving to Colorado, I formed an LLC and began doing work for friends and businesses in the Boulder area. I get referrals all from word-of-mouth and have continued to increase my contacts year to year. Most recently my larger projects have been full-stack web applications for the University of Colorado. My smaller projects include wedding websites, design and styling work, and SalesForce development.',
    'Owner',
  ),
  buildExperience(
    'public/images/about/6.png',
    'Fall 2015 - Present',
    'CommercialTribe, Denver, CO',
    'Responsible for leading development efforts for all new products and features. We started with a mostly MEAN stack, but now we have adopted GraphQL, React, Relay Modern, Redux, and React Native. Act as a player and coach, by not only being a top code contributor but also by coaching other developers on best practices, design patterns, open source, and agile principles.',
    'VP of Engineering',
  ),
];
