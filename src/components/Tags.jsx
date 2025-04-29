import styles from "./Tags.module.css";

const Tags = ({ type }) => {
  return <div className={styles.tag}>{type}</div>;
};

export default Tags;
