import React, { useEffect, useRef } from "react";
import styles from "./Contact.module.css";

export default function ContactPopover({ onClose, onGo }) {
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    };
    const onEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  return (
    <div
      className={styles.pop}
      ref={ref}
      role="dialog"
      aria-label="Contact options"
    >
      <a
        className={styles.item}
        href="https://wa.me/2348148021249"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
      <a className={styles.item} href="tel:+2348148021249">
        Call
      </a>
      <a className={styles.item} href="mailto:kafidipeabdulhamid@gmail.com">
        Email
      </a>
      <button
        className={`${styles.item} ${styles.primary}`}
        onClick={() => onGo?.("#Contact")}
      >
        Contact form
      </button>
    </div>
  );
}
