import React from "react";
import ReactDOM from "react-dom/client";
import { GraphiQL } from "graphiql";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import "graphiql/style.css";
import "./resume.css";

const fetcher = createGraphiQLFetcher({ url: "/graphql" });

const variables = JSON.stringify(
  {
    input: {
      from: "",
      name: "",
      subject: "",
      body: "",
    },
  },
  null,
  "\t",
);

const query = `
# Welcome to my Resume GraphiQL Explorer.
# You can browse my schema by looking at the "Docs" on the right.
# Run a query by pressing the execute (>) button on the top bar.
query resume {
  chris {
    title
    description
    social {
      github
      linkedIn
      email
    }
    experience {
      location
      title
      duration
      description
    }
    skills {
      technologies
    }
  }
}

# Edit the "Query Variables" below, and send me an email using this mutation.
# (make sure you to include your email in the from field)
mutation contactMeMutation($input: ContactMeInput!) {
  contactMe(input: $input) {
    success
  }
}
`;

document.body.classList.add("graphiql-page");

ReactDOM.createRoot(document.getElementById("graphiql-root")!).render(
  <React.StrictMode>
    <div className="resume">
      <GraphiQL fetcher={fetcher} defaultQuery={query} initialVariables={variables}>
        <GraphiQL.Logo>
          <a href="/" title="Chris Driscol">
            Chris Driscol
          </a>
        </GraphiQL.Logo>
      </GraphiQL>
    </div>
  </React.StrictMode>,
);
