import "./built-with.css";

export const BuiltWithSection = () => (
  <section className="built-with" id="builtWith">
    <div className="site-container">
      <p className="text-muted">
        This site is powered by GraphQL, you can query all this sites data (and more) by using my{" "}
        <a title="GraphiQL Explorer" href="/resume" target="_blank" rel="noreferrer">
          GraphiQL Explorer
        </a>
        .
      </p>
    </div>
  </section>
);
