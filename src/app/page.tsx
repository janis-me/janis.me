import {
  ContentSlider,
  ContentSliderItem,
} from "$/components/ui/ContentSlider";
import { Timeline } from "$/components/ui/Timeline";

import styles from "./page.module.scss";

import licensephobiaPreview from "../../public/images/licensephobia-preview.webp";
import caddlyPreview from "../../public/images/caddly-preview.webp";
import r3fPreview from "../../public/images/react-three-cae.webp";
import thumbnailWebassemblyVideo from "../../public/images/thumbnails/webassembly-thumbnail.webp";
import thumbnailReactComponents from "../../public/images/thumbnails/dynamic-react-components-thumbnail.webp";
import thumbnailTs1 from "../../public/images/thumbnails/typescript-1-thumbnail.webp";
import thumbnailTs2 from "../../public/images/thumbnails/typescript-2-thumbnail.webp";

export const runtime = "edge";

const HOME = {
  TITLE: "Janis Jansen",
  TAGS: ["webdev", "design", "youtube", "music"],
} as const;

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.intro}>
        <h1 className={styles.title}>{HOME.TITLE}</h1>
        <ul className={styles.tags}>
          {HOME.TAGS.map((i) => (
            <span className={styles.tag} key={i}>
              {i}
            </span>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        <section className={styles.introText}>
          <p>
            Hey, I&apos;m Janis! I&apos;ve been a developer for the last 8
            years, coding apps, UIs, websites, APIs, statistical models and
            more.
          </p>
          <p>
            I share my knowledge through this website, YouTube videos and as a
            speaker in my area. Check out some of my...
          </p>
        </section>

        <section className={styles.contentSliders}>
          <h2>Projects...</h2>
          <ContentSlider>
            <ContentSliderItem
              label="Licensephobia"
              imageSrc={licensephobiaPreview}
              url="https://licensephobia.com"
            />
            <ContentSliderItem
              label="Caddly"
              imageSrc={caddlyPreview}
              url="https://caddly.roulz.com"
            />
            <ContentSliderItem
              label="react/threejs CAE showcase"
              imageSrc={r3fPreview}
              url="https://r3f-cae.pages.dev/"
            />
          </ContentSlider>

          <h2>Youtube videos...</h2>

          <ContentSlider>
            <ContentSliderItem
              label="Webassembly & WebDevelopment"
              imageSrc={thumbnailWebassemblyVideo}
              url="https://youtu.be/5LhGMq5wvmk"
            />
            <ContentSliderItem
              label="Generic React components in TS"
              imageSrc={thumbnailReactComponents}
              url="https://youtu.be/Dw3qYGAcpZA"
            />
            <ContentSliderItem
              label="Ultimate typescript course #1"
              imageSrc={thumbnailTs1}
              url="https://youtu.be/MhYNyfgrCjg"
            />
            <ContentSliderItem
              label="Ultimate typescript course #2"
              imageSrc={thumbnailTs2}
              url="https://youtu.be/uHedP8B0_Z4"
            />
          </ContentSlider>
        </section>

        <section className={styles.resume}>
          <div className={styles.resumeHeader}>
            <h1>About me</h1>
          </div>
          <div className={styles.resumeItems}>
            <p>
              Non exercitation exercitation sunt duis irure eu id deserunt magna
              tempor et. Qui enim tempor laboris adipisicing dolor amet aliquip.
              Sunt aliqua aliquip excepteur culpa esse magna exercitation id non
              nostrud. Nulla exercitation duis in reprehenderit fugiat culpa
              dolore. Non exercitation exercitation sunt duis irure eu id
              deserunt magna tempor et. Qui enim tempor laboris adipisicing
              dolor amet aliquip. Sunt aliqua aliquip excepteur culpa esse magna
              exercitation id non nostrud. Nulla exercitation duis in
              reprehenderit fugiat culpa dolore. Non exercitation exercitation
              sunt duis irure eu id deserunt magna tempor et. Qui enim tempor
              laboris adipisicing dolor amet aliquip. Sunt aliqua aliquip
              excepteur culpa esse magna exercitation id non nostrud. Nulla
              exercitation duis in reprehenderit fugiat culpa dolore.
            </p>
            <Timeline></Timeline>
          </div>
        </section>
      </div>
    </div>
  );
}
