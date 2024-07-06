import React from "react";
import styles from "./ColorPalette.module.scss";

const ColorPalette = ({
  colorName,
  shade1,
  shade2,
  shade3,
  shade4,
  shade5,
}) => {
  return (
    <div className={styles.colorPaletteWrapper}>
      <div className={styles.colorPaletteName}>
        <p>{colorName}</p>
      </div>
      <div className={styles.colorPaletteColors}>
        <div className={styles.colorBlock} style={{ background: shade1 }}></div>
        <div className={styles.colorBlock} style={{ background: shade2 }}></div>
        <div className={styles.colorBlock} style={{ background: shade3 }}></div>
        <div className={styles.colorBlock} style={{ background: shade4 }}></div>
        <div className={styles.colorBlock} style={{ background: shade5 }}></div>
      </div>
    </div>
  );
};

export default ColorPalette;
