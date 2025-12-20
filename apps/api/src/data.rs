use crate::types::{About, Chris, Experience, Skills, Social, Work};

fn about() -> About {
    About {
        description: vec![
            "I grew up near and went to college at the <strong>University of Iowa</strong> where I earned my <strong>B.S. in Computer Science</strong> and became a <strong>die-hard Hawkeye fan</strong>.".to_string(),
            "Currently I work as an <strong>VP of Engineering</strong> for CommercialTribe in beautiful <strong>Denver, CO</strong>.  I lead all development efforts on a team responsible for delivering <strong>new features and products in mobile and web</strong>.".to_string(),
            "My passion for <strong>agile software development</strong> brought me to Colorado in 2013 where I joined many thought leaders in agile at <strong>Rally Software</strong> in Boulder.".to_string(),
            "Prior to moving to Colorado I worked in Rochester, MN for the <strong>Mayo Clinic Department of Nuclear Medicine</strong> for just over 5 years.  Developing and supporting clinical <strong>diagnostic imaging applications</strong> on a small team helped me truly understand the importance of <strong>software quality, test automation, and continous integration tooling</strong>.".to_string(),
            "In my free time I love hiking, camping, snowboarding, mountain biking, baseball, football, <strong>spending time with my beautiful wife!</strong>".to_string(),
        ],
        image_url: Some("public/images/me.jpg".to_string()),
        image_caption: Some("VP of Engineering".to_string()),
        image_title: Some("Chris Driscol".to_string()),
        tag_line: Some("I <i class=\"fa fa-heart\"></i> working on <strong>Agile teams</strong> motivated by <strong>delivering customer value</strong> early and often.".to_string()),
    }
}

fn experience() -> Vec<Experience> {
    vec![
        Experience {
            image_url: Some("public/images/about/1.jpg".to_string()),
            duration: Some("2001 - 2002".to_string()),
            location: Some("High School".to_string()),
            description: Some("It was a TI-83+ calculator, my brother had shown me a game called Beerhunt he installed on his <i>smart</i> calculator. Once I realized I could hack the source code directly on the calculator, I reverse engineered the price of a beer and claimed the high score. At this point, I was hooked on everything computer science.".to_string()),
            title: None,
        },
        Experience {
            image_url: Some("public/images/about/2.jpg".to_string()),
            duration: Some("Fall 2004 â€“ Spring 2008".to_string()),
            location: Some("University of Iowa, Iowa City, IA".to_string()),
            description: Some("Started working in help desk troubleshooting problems for faculty and students as well as building computer labs around campus. I ended as a software developer, and developed a FileMaker Pro solution to help the Department of Otolaryngology go paperless.".to_string()),
            title: Some("Help Desk Consultant, Software Developer".to_string()),
        },
        Experience {
            image_url: Some("public/images/about/3.jpg".to_string()),
            duration: Some("Summer 2007".to_string()),
            location: Some("Mayo Clinic, Rochester, MN".to_string()),
            description: Some("Was a key member of a data warehouse re-architecting project, having developed a full-stack web application to gather metadata about how our finance data was reported on. In 3 moths I wrote 22,000+ lines of non-generated C# and HTML code using ASP.Net 2.0.".to_string()),
            title: Some("Intern Programmer/Analyst".to_string()),
        },
        Experience {
            image_url: Some("public/images/about/4.jpg".to_string()),
            duration: Some("Summer 2008 - Summer 2013".to_string()),
            location: Some("Mayo Clinic, Rochester, MN".to_string()),
            description: Some("Developed and supported more than 70 clinical imaging applications used by the Department of Nuclear Medicine used in multiple states. Was recognized with the Above & Beyond Award in 2013. During my time, I developed 6 clinically used image processing applications for Nuclear Medicine and more than 20 windows services and utility applications to automate several tasks. Became certified and acted as SQL Server Application DBA for my team. Presented on WPF, MVVM, and .Net tooling to more than 50 other software engineers from other teams in 2011.".to_string()),
            title: Some("Senior Programmer/Analyst, DBA".to_string()),
        },
        Experience {
            image_url: Some("public/images/about/5.jpg".to_string()),
            duration: Some("Summer 2013 - Fall 2015".to_string()),
            location: Some("Rally Software, Boulder, CO".to_string()),
            description: Some("Developed two full-stack web applications including a Customer Community using SalesForceâ€™s Force.com platform, and an On-Demand Learning Management System using the Drupal platform. Contributed to development of several SaaS integrations created with Java, Groovy, Apache Camel, ActiveMQ, ElasticSearch, and Kibana. Responsible for maintenance and development of advanced SalesForce Apex/VisualForce solutions. Participated in agile trainings including Scrum Master, Agile Basics, and SAFe Practitioner. Responsible for facilitating team retros, planning, estimation, pair programming, TDD, and continuous integration.".to_string()),
            title: Some("Enterprise Software Engineer".to_string()),
        },
        Experience {
            image_url: Some("public/images/favicon/ms-icon-310x310.png".to_string()),
            duration: Some("Fall 2013 - Present".to_string()),
            location: Some("Driscol Software LLC, Broomfield, CO".to_string()),
            description: Some("After moving to Colorado, I formed an LLC and began doing work for friends and businesses in the Boulder area. I get referrals all from word-of-mouth and have continued to increase my contacts year to year. Most recently my larger projects have been full-stack web applications for the University of Colorado. My smaller projects include wedding websites, design and styling work, and SalesForce development.".to_string()),
            title: Some("Owner".to_string()),
        },
        Experience {
            image_url: Some("public/images/about/6.png".to_string()),
            duration: Some("Fall 2015 - Present".to_string()),
            location: Some("CommercialTribe, Denver, CO".to_string()),
            description: Some("Responsible for leading development efforts for all new products and features. We started with a mostly MEAN stack, but now we have adopted GraphQL, React, Relay Modern, Redux, and React Native. Act as a player and coach, by not only being a top code contributor but also by coaching other developers on best practices, design patterns, open source, and agile principles.".to_string()),
            title: Some("VP of Engineering".to_string()),
        },
    ]
}

fn skills() -> Skills {
    Skills {
        languages: vec![
            "JavaScript",
            "C#",
            "Java",
            "Groovy",
            "HTML",
            "CSS",
            "SCSS",
            "PHP",
            "Ruby",
            "Python",
            "SQL",
            "Apex",
            "VisualForce",
            "Lightning",
            "VB",
            "VB6",
            "XAML",
        ]
        .into_iter()
        .map(String::from)
        .collect(),
        technologies: vec![
            "React",
            "React Native",
            "Relay",
            "GraphQL",
            "Flow",
            "Redux",
            "Angular",
            "Express",
            "Node",
            "Bootstrap",
            ".Net",
            "WPF",
            "GreenSock",
            "MS-SQL",
            "MySQL",
            "pSQL",
            "MongoDB",
            "Apache Camel",
            "ActiveMQ",
        ]
        .into_iter()
        .map(String::from)
        .collect(),
        tools: vec![
            "OSX",
            "Windows",
            "Linux",
            "AWS",
            "Xcode",
            "Digital Ocean",
            "TravisCI",
            "CircleCI",
            "Jenkins",
            "Github",
            "Kubernetes",
            "WebStorm",
            "Atom.io",
            "Sublime Text",
            "Webpack",
            "IntelliJ",
            "Visual Studio",
            "Eclipse",
        ]
        .into_iter()
        .map(String::from)
        .collect(),
        loves: vec![
            "Open Source",
            "JavaScript",
            "React",
            "React Native",
            "Agile",
            "Relay",
            "GraphQL",
            "Flow",
            "Node",
            "Mountain Biking",
            "GreenSock",
            "MongoDB",
            "Groovy",
            "Material Design",
            "Bootstrap",
            "Snowboarding",
            "Material UI",
            "WebStorm",
            "Digital Ocean",
            "Webpack",
            "Extreme Programming",
            "React Storybook",
            "Colorado",
            "Iowa",
        ]
        .into_iter()
        .map(String::from)
        .collect(),
    }
}

fn social() -> Social {
    Social {
        linked_in: "https://www.linkedin.com/in/chrisdriscol/".to_string(),
        github: "https://github.com/cdriscol".to_string(),
        email: "chris@driscolsoftware.com".to_string(),
    }
}

fn work() -> Vec<Work> {
    vec![
        Work {
            image_url: Some("public/images/work/ct_views.png".to_string()),
            title: Some("CommercialTribe".to_string()),
            sub_title: Some(
                "New product and feature development in React, GraphQL, React-Native, Redux, and Relay Modern.".to_string(),
            ),
            date: Some("2015-Present".to_string()),
            location: Some("CommercialTribe".to_string()),
            technologies: vec![
                "React",
                "React-Native",
                "Material UI",
                "Relay",
                "Redux",
                "draft-js",
                "Flow",
                "GraphQL",
                "MongoDB",
                "WebRTC",
                "Kubernetes",
                "Github",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "Working with a team of engineers, my responsibility is to ensure completion of new product and feature requests.  Working with business, product, and engineering teams to ensure we <i>build the right things and build them right</i>.".to_string(),
                "My days can range from going heads-down all day on a technical problem, to meeting with every developer on my team for our one on one, to meeting with users and business stakeholders to understand and scope new features.".to_string(),
                "In the last year, we have been transitioning away from Angular into React, Relay, and GraphQL. I have been spending a lot of my time building out a React component library and helping defining our GraphQL schema.".to_string(),
            ],
            link: Some("https://www.commercialtribe.com/".to_string()),
            video: Some("veGb2LARzsE".to_string()),
        },
        Work {
            image_url: Some("public/images/work/cu_views.png".to_string()),
            title: Some("University Alumni Community".to_string()),
            sub_title: Some(
                "An alumni community for the University of Colorado for students to register, update their contact information, and stay in contact with the university.".to_string(),
            ),
            date: Some("2017".to_string()),
            location: Some("Driscol Software LLC".to_string()),
            technologies: vec![
                "Force.com",
                "JavaScript",
                "VisualForce",
                "Apex",
                "HTML5",
                "CSS3",
                "Bootstrap 3",
                "ESLint",
                "MavensMate",
                "Trello",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "Through my LLC, I had already done some minor engagements with the University of Colorado when I was asked if I could provide an estimate to deliver on an Alumni Community.".to_string(),
                "I drew on my previous experience building a community on the Force.com platform, and took the contract. We ran this project using a Trello board and scrum practices.  I delivered working software in just a matter of weeks, repeated that process, and deployed the site in just a few months.".to_string(),
            ],
            link: Some("https://alumnicommunity.cu.edu".to_string()),
            video: None,
        },
        Work {
            image_url: Some("public/images/work/ec_wedding.png".to_string()),
            title: Some("Wedding RSVP Site".to_string()),
            sub_title: Some("A wedding website for a friend with RSVP and details.".to_string()),
            date: Some("2017".to_string()),
            location: Some("Side Project".to_string()),
            technologies: vec![
                "React",
                "Webpack",
                "Node",
                "Redux",
                "Isomorophic",
                "Babel",
                "GreenSock",
                "Express",
                "CircleCI",
                "Github",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec!["Built this project in the \"MERN Stack\" starting with a boilerplate project.  I used a boilerplate to cut down on time to deploy as my friend only gave me only 48 hours to complete the site before his guests received their RSVP cards.".to_string()],
            link: Some("https://github.com/cdriscol/amerikawedding2017".to_string()),
            video: None,
        },
        Work {
            image_url: Some("public/images/work/community_views.jpg".to_string()),
            title: Some("Rally Community".to_string()),
            sub_title: Some("Custom designed community built on the Force.com platform.".to_string()),
            date: Some("2014 - 2015".to_string()),
            location: Some("Rally Software".to_string()),
            technologies: vec![
                "Force.com",
                "VisualForce",
                "Apex",
                "HTML5",
                "CSS3",
                "Bootstrap 3",
                "jQuery",
                "SCSS",
                "Compass",
                "ESLint",
                "Grunt",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "This Community serves as a site where customers of our ALM product are able to ask questions, view help articles, and collaborate in several different groups.".to_string(),
                "We ran into a lot of issues with this site when trying to customize the look and feel to match that of our branding. Ultimately we were able to create a completely responsive site using Bootstrap 3 and a lot of beautifully crafted jQuery.".to_string(),
            ],
            link: None,
            video: None,
        },
        Work {
            image_url: Some("public/images/work/lms_views.jpg".to_string()),
            title: Some("AgileU OnDemand LMS".to_string()),
            sub_title: Some("Agile OnDemand Learning Management System (LMS) built on Drupal.".to_string()),
            date: Some("2014 - 2015".to_string()),
            location: Some("Rally Software".to_string()),
            technologies: vec![
                "Drupal",
                "PHP",
                "MySQL",
                "Apache",
                "Acquia",
                "HTML5",
                "CSS3",
                "Bootstrap 3",
                "jQuery",
                "SCSS",
                "Compass",
                "ESLint",
                "Grunt",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "This site allows customers of our product, and anyone else interested in Agile software development, to take courses at their leisure. This was my first experience with PHP and the Drupal platform, but we had a lot of Drupal experience within the company and chose an LMS Drupal Distribution as our starting point.".to_string(),
                "We ended up developing two of our own custom modules to contain all of the functionality and styling we were looking for. We tackled this project with a heavy TDD focus and quickly discovered the pain of Drupal/PHP testing. I am proud to say that today we have more than 1400 tests covering highly valuable functionality in our two custom modules.".to_string(),
            ],
            link: Some("https://ondemand.agileu.com/".to_string()),
            video: None,
        },
        Work {
            image_url: Some("public/images/work/wedding_views.jpg".to_string()),
            title: Some("driscolwedding.com".to_string()),
            sub_title: Some("My own wedding website which our guests <strong>absolutely loved!</strong>".to_string()),
            date: Some("2012".to_string()),
            location: Some("Side Project".to_string()),
            technologies: vec![
                "C#/.Net 4.0",
                "MVC",
                "Ninject (DI/IoC)",
                "MoQ (mocking lib)",
                "MSTest",
                "log4net",
                "MS-SQL",
                "jQuery",
                "jQuery Mobile",
                "CSS3",
                "HTML5",
                "960-grid",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "This site was created in roughly 30 hours of nights and weekends. I used a lot of .Net technologies I was familiar with, but I also got my hands dirty with CSS3 and created my first fully responsive website that served a real purpose.".to_string(),
                "I threw a lot of features at this site, including registry links, online RSVPs (with custom responses), song requests for the DJ, a fun trivia, guest book, and Google spreadsheet integrations. We had a unique code on everyones invitation which saved a ton of work since most people RSVP'd online using our website.".to_string(),
                "We received a ton of positive feedback from the site, most of which was from the custom RSVP responses and the trivia which had a leaderboard.".to_string(),
            ],
            link: None,
            video: None,
        },
        Work {
            image_url: Some("public/images/work/mtb_race.jpg".to_string()),
            title: Some("MTB Race Timer".to_string()),
            sub_title: Some("An offline mountain bike race timer used to record live lap results".to_string()),
            date: Some("2012".to_string()),
            location: Some("Volunteer".to_string()),
            technologies: vec![
                "C#/.Net 4.5",
                "WPF",
                "MSTest",
                "log4net",
                "XML",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "I love mountain biking. I was fortunate enough to live very close to mountain bike trails in Minnesota which led me to volunteer for a local race, the Sandwich 50. When helping plan for the first race, we realized we didn't have any way to record results, other than pen and paper.".to_string(),
                "As a Software Engineer, I refused to settle for the pen and paper method and rolled up my sleeves.. a few weeks later I had a working Windows application that could very simply record lap results.".to_string(),
                "The race was 7 laps with more than 70 participants lasting more than 6 hours. The ability to report on any racers current position and estimate the next time they would be coming through the start/finish made a lot of spectators and competitive racers <strong>VERY HAPPY!</strong>".to_string(),
            ],
            link: None,
            video: None,
        },
        Work {
            image_url: Some("public/images/work/nukenotes.jpg".to_string()),
            title: Some("Nuke Notes".to_string()),
            sub_title: Some("Replaced paper notes in the Nuclear Medicine department".to_string()),
            date: Some("2012".to_string()),
            location: Some("Mayo Clinic".to_string()),
            technologies: vec![
                "C#/.Net 4.0",
                "WPF",
                "Ninject (DI/IoC)",
                "MoQ (mocking lib)",
                "MSTest",
                "log4net",
                "MVVM",
                "DICOM",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "This application was developed to replace paper notes used in the Nuclear Medicine department. This was architected to be very extensible utilizing many abstract base classes allowing developers to add new note types very easily.".to_string(),
                "Replacing paper notes allowed our technologists to be more productive by eliminating the need to enter this information into the patient's electronic medical record after paper notes are taken.".to_string(),
            ],
            link: None,
            video: None,
        },
        Work {
            image_url: Some("public/images/work/cisternogram.jpg".to_string()),
            title: Some("Cisternogram".to_string()),
            sub_title: Some("Measures leakage of the spine over time".to_string()),
            date: Some("2011".to_string()),
            location: Some("Mayo Clinic".to_string()),
            technologies: vec![
                "C#/.Net 4.0",
                "WCF",
                "WPF",
                "Ninject (DI/IoC)",
                "MoQ (mocking lib)",
                "MSTest",
                "log4net",
                "MVVM",
                "C++/COM",
                "DICOM",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "An image processing application that takes in DICOM image data, allows a user to draw a ROI (region of interest) on the spine and brain, and measures leakage from a radionuclide spinal tap over 24-48 hours.".to_string(),
                "Was one of my most intensive image processing applications, and allowed me to extend my designer skills with custom context menus and using a UI framework that allowed for very custom theming.".to_string(),
            ],
            link: None,
            video: None,
        },
        Work {
            image_url: Some("public/images/work/dspect.jpg".to_string()),
            title: Some("D-SPECT QC GUI/Service".to_string()),
            sub_title: Some("Automated much of the daily QC work our technologists were performing".to_string()),
            date: Some("2010".to_string()),
            location: Some("Mayo Clinic".to_string()),
            technologies: vec![
                "C#/.Net 3.5",
                "WCF",
                "WPF",
                "Ninject (DI/IoC)",
                "MoQ (mocking lib)",
                "XML",
                "MSTest",
                "log4net",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "An image processing application that takes in DICOM image data, allows a user to draw a ROI (region of interest) on the spine and brain, and measures leakage from a radionuclide spinal tap over 24-48 hours.".to_string(),
                "Was one of my most intensive image processing applications, and allowed me to extend my designer skills with custom context menus and using a UI framework that allowed for very custom theming.".to_string(),
            ],
            link: None,
            video: None,
        },
        Work {
            image_url: Some("public/images/work/subtract.jpg".to_string()),
            title: Some("SPECT Subtract".to_string()),
            sub_title: Some("SPECT image normalization and subtraction".to_string()),
            date: Some("2010".to_string()),
            location: Some("Mayo Clinic".to_string()),
            technologies: vec![
                "C#/.Net 3.5",
                "WCF",
                "WPF",
                "Ninject (DI/IoC)",
                "MoQ (mocking lib)",
                "XML",
                "MSTest",
                "log4net",
            ]
            .into_iter()
            .map(String::from)
            .collect(),
            description: vec![
                "This application will take any SPECT image (usually of the thyroid) and perform a normalization and subtraction of a Sestamibi and Iodine image. The Iodine does not get taken up by tumors in the thyroid, so by performing the subtraction, youâ€™re able to discern a tumor if one exists.".to_string(),
                "I really liked the <i>Ribbon Control</i> that MS-Word and other Microsoft products had at this time, so I tried pretty hard to imitate that control in this application. I think I got pretty close..".to_string(),
            ],
            link: None,
            video: None,
        },
    ]
}

pub fn chris() -> Chris {
    Chris {
        id: "guest".to_string(),
        title: "Chris Driscol | VP of Engineering in Colorado".to_string(),
        description: "Hi, I'm Chris Driscol, an experienced full-stack engineer with a passion for crafting really awesome software.  Check out my site to learn about me!".to_string(),
        skills: skills(),
        experience: experience(),
        about: about(),
        work: work(),
        social: social(),
    }
}
