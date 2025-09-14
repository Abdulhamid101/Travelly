import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../TripPlanner/TripPlanner.module.css";
import image1 from "../../assets/aroundimg.png";

export default function FindingTripModal({ open = true, onCancel }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        navigate("/trips", { replace: true }); // ✅ prevent back to /search
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, navigate]);

  if (!open) return null;

  const handleCancel = () => {
    if (onCancel) onCancel();
    else navigate("/", { replace: true }); // ✅ consistent behavior
  };

  return (
    <div className={styles.findOverlay} role="dialog" aria-modal="true">
      <div className={styles.findCard}>
        <div className={styles.findIcon} aria-hidden>
          <img src={image1} alt="Finding trip" />
        </div>
        <p className={styles.findText}>Finding the best trip for you...</p>
        <button type="button" className={styles.findCancel} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
