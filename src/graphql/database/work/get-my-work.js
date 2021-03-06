// @flow

const buildWork = (
  imageUrl,
  title,
  subTitle,
  date,
  location,
  technologies,
  description,
  link,
  video,
) => ({
  title,
  subTitle,
  location,
  date,
  imageUrl,
  technologies,
  description,
  link,
  video,
});

export default () => [
  buildWork(
    'public/images/work/ct_views.png',
    'CommercialTribe',
    'New product and feature development in React, GraphQL, React-Native, Redux, and Relay Modern.',
    '2015-Present',
    'CommercialTribe',
    [
      'React',
      'React-Native',
      'Material UI',
      'Relay',
      'Redux',
      'draft-js',
      'Flow',
      'GraphQL',
      'MongoDB',
      'WebRTC',
      'Kubernetes',
      'Github',
    ],
    [
      'Working with a team of engineers, my responsibility is to ensure completion of new product and feature requests.  Working with business, product, and engineering teams to ensure we <i>build the right things and build them right</i>.',
      'My days can range from going heads-down all day on a technical problem, to meeting with every developer on my team for our one on one, to meeting with users and business stakeholders to understand and scope new features.',
      'In the last year, we have been transitioning away from Angular into React, Relay, and GraphQL. I have been spending a lot of my time building out a React component library and helping defining our GraphQL schema.',
    ],
    'https://www.commercialtribe.com/',
    'veGb2LARzsE',
  ),
  buildWork(
    'public/images/work/cu_views.png',
    'University Alumni Community',
    'An alumni community for the University of Colorado for students to register, update their contact information, and stay in contact with the university.',
    '2017',
    'Driscol Software LLC',
    [
      'Force.com',
      'JavaScript',
      'VisualForce',
      'Apex',
      'HTML5',
      'CSS3',
      'Bootstrap 3',
      'ESLint',
      'MavensMate',
      'Trello',
    ],
    [
      'Through my LLC, I had already done some minor engagements with the University of Colorado when I was asked if I could provide an estimate to deliver on an Alumni Community.',
      'I drew on my previous experience building a community on the Force.com platform, and took the contract. We ran this project using a Trello board and scrum practices.  I delivered working software in just a matter of weeks, repeated that process, and deployed the site in just a few months.',
    ],
    'https://alumnicommunity.cu.edu',
  ),
  buildWork(
    'public/images/work/ec_wedding.png',
    'Wedding RSVP Site',
    'A wedding website for a friend with RSVP and details.',
    '2017',
    'Side Project',
    [
      'React',
      'Webpack',
      'Node',
      'Redux',
      'Isomorophic',
      'Babel',
      'GreenSock',
      'Express',
      'CircleCI',
      'Github',
    ],
    [
      `Built this project in the "MERN Stack" starting with a boilerplate project.  I used a boilerplate to cut down on time to deploy as my friend only gave me only 48 hours to complete the site before his guests received their RSVP cards.`,
    ],
    'https://github.com/cdriscol/amerikawedding2017',
  ),
  buildWork(
    'public/images/work/community_views.jpg',
    'Rally Community',
    'Custom designed community built on the Force.com platform.',
    '2014 - 2015',
    'Rally Software',
    [
      'Force.com',
      'VisualForce',
      'Apex',
      'HTML5',
      'CSS3',
      'Bootstrap 3',
      'jQuery',
      'SCSS',
      'Compass',
      'ESLint',
      'Grunt',
    ],
    [
      `This Community serves as a site where customers of our ALM product are able to ask questions, view help articles, and collaborate in several different groups.`,
      `We ran into a lot of issues with this site when trying to customize the look and feel to match that of our branding. Ultimately we were able to create a completely responsive site using Bootstrap 3 and a lot of beautifully crafted jQuery.`,
    ],
  ),
  buildWork(
    'public/images/work/lms_views.jpg',
    'AgileU OnDemand LMS',
    'Agile OnDemand Learning Management System (LMS) built on Drupal.',
    '2014 - 2015',
    'Rally Software',
    [
      'Drupal',
      'PHP',
      'MySQL',
      'Apache',
      'Acquia',
      'HTML5',
      'CSS3',
      'Bootstrap 3',
      'jQuery',
      'SCSS',
      'Compass',
      'ESLint',
      'Grunt',
    ],
    [
      `This site allows customers of our product, and anyone else interested in Agile software development, to take courses at their leisure. This was my first experience with PHP and the Drupal platform, but we had a lot of Drupal experience within the company and chose an LMS Drupal Distribution as our starting point.`,
      `We ended up developing two of our own custom modules to contain all of the functionality and styling we were looking for. We tackled this project with a heavy TDD focus and quickly discovered the pain of Drupal/PHP testing. I am proud to say that today we have more than 1400 tests covering highly valuable functionality in our two custom modules.`,
    ],
    'https://ondemand.agileu.com/',
  ),
  buildWork(
    'public/images/work/wedding_views.jpg',
    'driscolwedding.com',
    'My own wedding website which our guests <strong>absolutely loved!</strong>',
    '2012',
    'Side Project',
    [
      'C#/.Net 4.0',
      'MVC',
      'Ninject (DI/IoC)',
      'MoQ (mocking lib)',
      'MSTest',
      'log4net',
      'MS-SQL',
      'jQuery',
      'jQuery Mobile',
      'CSS3',
      'HTML5',
      '960-grid',
    ],
    [
      `This site was created in roughly 30 hours of nights and weekends. I used a lot of .Net technologies I was familiar with, but I also got my hands dirty with CSS3 and created my first fully responsive website that served a real purpose.`,
      `I threw a lot of features at this site, including registry links, online RSVPs (with custom responses), song requests for the DJ, a fun trivia, guest book, and Google spreadsheet integrations. We had a unique code on everyones invitation which saved a ton of work since most people RSVP'd online using our website.`,
      `We received a ton of positive feedback from the site, most of which was from the custom RSVP responses and the trivia which had a leaderboard.`,
    ],
  ),
  buildWork(
    'public/images/work/mtb_race.jpg',
    'MTB Race Timer',
    'An offline mountain bike race timer used to record live lap results',
    '2012',
    'Volunteer',
    ['C#/.Net 4.5', 'WPF', 'MSTest', 'log4net', 'XML'],
    [
      `I love mountain biking. I was fortunate enough to live very close to mountain bike trails in Minnesota which led me to volunteer for a local race, the Sandwich 50. When helping plan for the first race, we realized we didn't have any way to record results, other than pen and paper.`,
      `As a Software Engineer, I refused to settle for the pen and paper method and rolled up my sleeves.. a few weeks later I had a working Windows application that could very simply record lap results.`,
      `The race was 7 laps with more than 70 participants lasting more than 6 hours. The ability to report on any racers current position and estimate the next time they would be coming through the start/finish made a lot of spectators and competitive racers <strong>VERY HAPPY!</strong>`,
    ],
  ),
  buildWork(
    'public/images/work/nukenotes.jpg',
    'Nuke Notes',
    'Replaced paper notes in the Nuclear Medicine department',
    '2012',
    'Mayo Clinic',
    [
      'C#/.Net 4.0',
      'WPF',
      'Ninject (DI/IoC)',
      'MoQ (mocking lib)',
      'MSTest',
      'log4net',
      'MVVM',
      'DICOM',
    ],
    [
      `This application was developed to replace paper notes used in the Nuclear Medicine department. This was architected to be very extensible utilizing many abstract base classes allowing developers to add new note types very easily.`,
      `Replacing paper notes allowed our technologists to be more productive by eliminating the need to enter this information into the patient's electronic medical record after paper notes are taken.`,
    ],
  ),
  buildWork(
    'public/images/work/cisternogram.jpg',
    'Cisternogram',
    'Measures leakage of the spine over time',
    '2011',
    'Mayo Clinic',
    [
      'C#/.Net 4.0',
      'WCF',
      'WPF',
      'Ninject (DI/IoC)',
      'MoQ (mocking lib)',
      'MSTest',
      'log4net',
      'MVVM',
      'C++/COM',
      'DICOM',
    ],
    [
      `An image processing application that takes in DICOM image data, allows a user to draw a ROI (region of interest) on the spine and brain, and measures leakage from a radionuclide spinal tap over 24-48 hours.`,
      `Was one of my most intensive image processing applications, and allowed me to extend my designer skills with custom context menus and using a UI framework that allowed for very custom theming.`,
    ],
  ),
  buildWork(
    'public/images/work/dspect.jpg',
    'D-SPECT QC GUI/Service',
    'Automated much of the daily QC work our technologists were performing',
    '2010',
    'Mayo Clinic',
    [
      'C#/.Net 3.5',
      'WCF',
      'WPF',
      'Ninject (DI/IoC)',
      'MoQ (mocking lib)',
      'XML',
      'MSTest',
      'log4net',
    ],
    [
      `An image processing application that takes in DICOM image data, allows a user to draw a ROI (region of interest) on the spine and brain, and measures leakage from a radionuclide spinal tap over 24-48 hours.`,
      `Was one of my most intensive image processing applications, and allowed me to extend my designer skills with custom context menus and using a UI framework that allowed for very custom theming.`,
    ],
  ),
  buildWork(
    'public/images/work/subtract.jpg',
    'SPECT Subtract',
    'SPECT image normalization and subtraction',
    '2010',
    'Mayo Clinic',
    [
      'C#/.Net 3.5',
      'WCF',
      'WPF',
      'Ninject (DI/IoC)',
      'MoQ (mocking lib)',
      'XML',
      'MSTest',
      'log4net',
    ],
    [
      `This application will take any SPECT image (usually of the thyroid) and perform a normalization and subtraction of a Sestamibi and Iodine image. The Iodine does not get taken up by tumors in the thyroid, so by performing the subtraction, you’re able to discern a tumor if one exists.`,
      `I really liked the <i>Ribbon Control</i> that MS-Word and other Microsoft products had at this time, so I tried pretty hard to imitate that control in this application. I think I got pretty close..`,
    ],
  ),
];
