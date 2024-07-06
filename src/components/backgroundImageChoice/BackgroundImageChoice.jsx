import React from "react";
import styles from "./BackgroundImageChoice.module.scss";

const BackgroundImageChoice = ({ image, alt, id }) => {
  return (
    <div className={styles.backgroundImageChoiceWrapper}>
      <p>{alt}</p>
      <img src={image} alt={alt} />
    </div>
  );
};

export default BackgroundImageChoice;
