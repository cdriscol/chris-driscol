// @flow
// TODO: Add Driscol Software projects, update CT data

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
    `It was a TI-83+ calculator, my brother had shown me a game called Beerhunt he installed on his <i>smart</i> calculator.  Once I realized I could hack the source code directly on the calculator, I reverse engineered the price of a beer and claimed the high score.  At this point, I was hooked on everything computer science.`,
  ),
  buildExperience(
    'public/images/about/2.jpg',
    'Fall 2004 – Spring 2008',
    'University of Iowa, Iowa City, IA',
    `Troubleshoot problems via telephone and in person. Built computer labs around campus. Developed a FileMaker Pro solution to help the Department of Otolaryngology go paperless.`,
    'Help Desk Consultant, Software Developer',
  ),
  buildExperience(
    'public/images/about/3.jpg',
    'Summer 2007',
    'Mayo Clinic, Rochester, MN',
    `Key member of a data warehouse re-architecting project. Developed a web application to gather metadata about how our finance data was reported on. Wrote 22,000+ lines of non-generated C# and HTML code using ASP.Net 2.0.`,
    'Intern Programmer/Analyst',
  ),
  buildExperience(
    'public/images/about/4.jpg',
    'Summer 2008 - Summer 2013',
    'Mayo Clinic, Rochester, MN',
    `Developed and supported more than 70 clinical imaging applications used by the Department of Nuclear Medicine used in multiple states. Received Above & Beyond Award in 2013. Developed 6 clinically used image processing applications for Nuclear Medicine. Developed 20+ windows services and utility applications to automate several tasks. SQL Server Application DBA for my team. Presented on WPF, MVVM, and .Net tooling to more than 50 IT staff in 2011. Developed an Android DICOM image viewer app with a web-service backend.`,
    'Senior Programmer/Analyst, DBA',
  ),
  buildExperience(
    'public/images/about/5.jpg',
    'Summer 2013 - Fall 2015',
    'Rally Software, Boulder, CO',
    `Developed a Customer Community using SalesForce’s Force.com platform. Developed an On-Demand Learning Management System using the Drupal platform. Several SaaS integrations created with Java, Groovy, Apache Camel, ActiveMQ, ElasticSearch, and Kibana. Hands-on with AWS Elastic Beanstalk, EC2, SQS, and S3. Advanced SalesForce Apex/VisualForce development. Agile trainings including Scrum Master, Agile Basics, and SAFe Practitioner. Facilitate team retros, planning, and estimation. Pair programming, TDD, continuous integration.`,
    'Enterprise Software Engineer',
  ),
  buildExperience(
    'public/images/about/6.png',
    'Fall 2015 - Present',
    'CommercialTribe, Denver, CO',
    `Lead development efforts on new features using MEAN stack. Implement and coach XP best practices. Advocate for agile culture.`,
    'Lead Software Engineer',
  ),
];
