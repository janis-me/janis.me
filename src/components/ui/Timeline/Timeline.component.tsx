import styles from "./Timeline.module.scss";

export function Timeline() {
  return (
    <div className={styles.timeline}>
      <div className={styles.beam}></div>
      <div className={styles.items}>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
      </div>
    </div>
  );
}

export default Timeline;
