import type { Social } from "../../types/chris";
import { IconGitHub, IconLinkedIn } from "../icons/Icons";
import "../icons/icons.css";
import "./footer.css";

type FooterSectionProps = {
  social?: Social | null;
};

export const FooterSection = ({ social }: FooterSectionProps) => (
  <footer className="footer">
    <div className="site-container">
      <div className="footer-row">
        <span className="copyright">
          Copyright &copy; <strong>Chris Driscol</strong> {new Date().getFullYear()}
        </span>
        <ul className="social-buttons">
          <li>
            <a href={social?.linkedIn ?? "#"} rel="noreferrer" target="_blank">
              <IconLinkedIn />
              <span className="sr-only">LinkedIn</span>
            </a>
          </li>
          <li>
            <a href={social?.github ?? "#"} rel="noreferrer" target="_blank">
              <IconGitHub />
              <span className="sr-only">GitHub</span>
            </a>
          </li>
        </ul>
        <ul className="quicklinks">
          <li>
            <a href={social?.email ? `mailto:${social.email}` : "#"}>
              {social?.email ?? "chris@driscolsoftware.com"}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);
