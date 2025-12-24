import { graphql } from "../../graphql/generated";
import { type FragmentType, useFragment } from "../../graphql/generated/fragment-masking";
import { IconGitHub, IconLinkedIn } from "../icons/Icons";
import { SiteContainer } from "../section/SiteContainer";

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
    <footer className="bg-muted py-[25px] text-center text-[white] font-heading md:text-left">
      <SiteContainer className="w-full max-w-[1170px] px-[4vw]">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:items-center md:justify-between md:gap-0">
          <span className="leading-[40px] normal-case">
            Copyright &copy; <strong>Chris Driscol</strong> {new Date().getFullYear()}
          </span>
          <ul className="flex list-none items-center justify-center gap-[16px] p-[0px] m-[0px]">
            <li>
              <a
                href={socialData?.linkedIn ?? "#"}
                rel="noreferrer"
                target="_blank"
                className="grid h-[44px] w-[44px] place-items-center rounded-full bg-deep text-[white] transition-colors duration-300 hover:bg-accent focus:bg-accent active:bg-accent"
              >
                <IconLinkedIn className="h-[24px] w-[24px]" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href={socialData?.github ?? "#"}
                rel="noreferrer"
                target="_blank"
                className="grid h-[44px] w-[44px] place-items-center rounded-full bg-deep text-[white] transition-colors duration-300 hover:bg-accent focus:bg-accent active:bg-accent"
              >
                <IconGitHub className="h-[24px] w-[24px]" />
                <span className="sr-only">GitHub</span>
              </a>
            </li>
          </ul>
          <ul className="list-none p-[0px] m-[0px] normal-case md:text-right">
            <li>
              <a
                href={socialData?.email ? `mailto:${socialData.email}` : "#"}
                className="text-[white] no-underline"
              >
                {socialData?.email ?? "chris@driscolsoftware.com"}
              </a>
            </li>
          </ul>
        </div>
      </SiteContainer>
    </footer>
  );
};
