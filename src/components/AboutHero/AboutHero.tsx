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
      - built the leading cloud-native CAE platform <i>dive</i>. Enabling users
      to set-up and analyze massive fluid simulations in the browser
    </li>
    <li>
      <b>
        <a href="https://licensephobia.com" target="_blank" rel="noopener">
          Licensephobia
        </a>
      </b>{" "}
      - never be afraid of OpenSource licenses again. Check your dependency
      files (npm, pip, cargo...) and know exactly what rights you have.
    </li>
    <li>
      <b>
        <a href="https://youtube.com/@roulzhq" target="_blank" rel="noopener">
          ROULZ (youtube)
        </a>
      </b>{" "}
      - Tech content, making easy to follow deep-dives into interesting topics.
    </li>
    <li>
      <b>
        <a href="https://sms-group.com" target="_blank" rel="noopener">
          SMS Group
        </a>
      </b>{" "}
      - enabled SMS's physical and mathmatical models to run in the cloud, built
      new ML-based prediction models for steel plants
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
      <div class="about-hero__pages">
        <a href="/imprint">Imprint</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  );
}
