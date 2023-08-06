"use client";

import Image, { StaticImageData } from "next/image";
import { PropsWithChildren, useEffect, useRef } from "react";

import styles from "./ContentSlider.module.scss";

export interface ContentSliderItemProps {
  label: string;
  imageSrc: StaticImageData;
  url: string;
}

export function ContentSliderItem({
  label,
  imageSrc,
  url,
}: ContentSliderItemProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className={styles.contentSliderItem}
    >
      <div className={styles.contentSliderItemOverlay} />
      <Image
        src={imageSrc}
        alt={label}
        className={styles.contentSliderItemImage}
      />
      <span className={styles.contentSliderItemLabel}>{label}</span>
    </a>
  );
}

export function ContentSlider({ children }: PropsWithChildren) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: WheelEvent) => {
    // Div not scrollable
    if(sliderRef.current?.scrollWidth === sliderRef.current?.clientWidth) return;
    
    if (sliderRef.current && e.deltaY !== 0) {
      e.preventDefault();
      sliderRef.current.scrollLeft += e.deltaY * 10; // arbitrary multiplier for smoother scrolling
    }
  };

  useEffect(() => {
    const div = sliderRef.current;
    if (!div) return;

    div.addEventListener("wheel", handleScroll);

    return () => {
      div.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className={styles.contentSlider} ref={sliderRef}>
      {children}
    </div>
  );
}
