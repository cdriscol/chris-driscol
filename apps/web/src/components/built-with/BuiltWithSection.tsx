import { SiteContainer } from "../section/SiteContainer";

export const BuiltWithSection = () => (
  <section className="bg-[#171619] py-10 text-[#bbb]" id="builtWith">
    <SiteContainer>
      <p className="m-0 text-center text-[1.3em] italic">
        This site is powered by GraphQL, you can query all this sites data (and more) by using my{" "}
        <a
          title="GraphiQL Explorer"
          href="/resume"
          target="_blank"
          rel="noreferrer"
          className="text-[#e20098] hover:text-[#e20098]"
        >
          GraphiQL Explorer
        </a>
        .
      </p>
    </SiteContainer>
  </section>
);
