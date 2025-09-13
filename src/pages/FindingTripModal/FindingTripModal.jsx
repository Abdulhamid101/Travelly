import React from "react";
import styles from "../TripPlanner/TripPlanner.module.css";
import image1 from "../../assets/aroundimg.png"

export default function FindingTripModal({ open, onCancel }) {
  if (!open) return null;

  return (
    <div className={styles.findOverlay} role="dialog" aria-modal="true">
      <div className={styles.findCard}>
        <div className={styles.findIcon} aria-hidden>
          <img src={image1} alt="" />
        </div>

        <p className={styles.findText}>Finding the best trip for you...</p>

        <button type="button" className={styles.findCancel} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
