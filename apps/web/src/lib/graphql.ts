export const contactMutation = `
  mutation ContactMe($input: ContactMeInput!) {
    contactMe(input: $input) {
      success
    }
  }
`;

export const chrisQuery = `
  query AppQuery {
    chris {
      id
      title
      description
      about {
        description
        imageUrl
        imageCaption
        imageTitle
        tagLine
      }
      experience {
        duration
        title
        location
        description
        imageUrl
      }
      skills {
        languages
        technologies
        tools
        loves
      }
      work {
        title
        subTitle
        description
        location
        link
        video
        date
        imageUrl
        technologies
      }
      social {
        linkedIn
        github
        email
      }
    }
  }
`;
