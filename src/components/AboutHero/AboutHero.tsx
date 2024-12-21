import Github from "lucide-solid/icons/github";
import Linkedin from "lucide-solid/icons/linkedin";
import Youtube from "lucide-solid/icons/youtube";

import "./AboutHero.scss";

const profileLinks = [
  { icon: Github, url: "https://github.com/carnageous" },
  { icon: Youtube, url: "https://www.youtube.com/@roulzhq" },
  { icon: Linkedin, url: "https://www.linkedin.com/in/janis-jansen" },
] as const;

const badges = [
  "fullstack-dev",
  "ts-nerd",
  "wasm-fanatic",
  "scss-user",
] as const;

const introText = (
  <>
    Hey! I'm Janis, a german fullstack dev focusing on making next-gen,
    cutting-edge web technology actually useful to customers. <br />
    Over the last couple of years (9 already, damn, time flies) I worked on
    numerous projects in fields like cloud-based CAE software, HMIs, Applied
    machine learning, 3D interfaces and more.
  </>
);

const previousWorkList = (
  <ul>
    <li>
      <b>
        <a href="https://divecae.com" target="_blank" rel="noopener">
          Dive CAE
        </a>
      </b>{" "}
      - built the leading cloud-native CAE platform <i>dive</i>.
    </li>
    <li>
      <a href="https://sms-digital.com"></a>
    </li>
  </ul>
);

export default function AboutHero() {
  return (
    <div class="about-hero">
      <h2 class="about-hero__title">
        Janis Jansen
        <span class="about-hero__links">
          {profileLinks.map((i) => (
            <a href={i.url} target="_blank" rel="noopener">
              {<i.icon size={20} />}
            </a>
          ))}
        </span>
      </h2>
      <div class="about-hero__badges">
        {badges.map((i) => (
          <span class="about-hero__badge">{i}</span>
        ))}
      </div>
      <p class="about-hero__intro">{introText}</p>
      <div class="about-hero__timeline">
        <h4>Previously in my life:</h4>
        {previousWorkList}
      </div>
    </div>
  );
}
