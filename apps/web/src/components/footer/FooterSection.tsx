import { graphql } from "../../generated/graphql";
import { type FragmentType, useFragment } from "../../generated/graphql/fragment-masking";
import { IconGitHub, IconLinkedIn } from "../icons/Icons";
import { SiteContainer } from "../section/SiteContainer";
import "../icons/icons.css";
import "./footer.css";

type FooterSectionProps = {
  social?: FragmentType<typeof FooterSocialFragment> | null;
};

export const FooterSocialFragment = graphql(/* GraphQL */ `
  fragment FooterSocial on Social {
    linkedIn
    github
    email
  }
`);

export const FooterSection = ({ social }: FooterSectionProps) => {
  const socialData = useFragment(FooterSocialFragment, social);

  return (
    <footer className="footer">
      <SiteContainer>
        <div className="footer-row">
          <span className="copyright">
            Copyright &copy; <strong>Chris Driscol</strong> {new Date().getFullYear()}
          </span>
          <ul className="social-buttons">
            <li>
              <a href={socialData?.linkedIn ?? "#"} rel="noreferrer" target="_blank">
                <IconLinkedIn />
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href={socialData?.github ?? "#"} rel="noreferrer" target="_blank">
                <IconGitHub />
                <span className="sr-only">GitHub</span>
              </a>
            </li>
          </ul>
          <ul className="quicklinks">
            <li>
              <a href={socialData?.email ? `mailto:${socialData.email}` : "#"}>
                {socialData?.email ?? "chris@driscolsoftware.com"}
              </a>
            </li>
          </ul>
        </div>
      </SiteContainer>
    </footer>
  );
};
