import React, { useState } from "react";
import styles from "./PromoSubscribe.module.css";

export default function PromoSubscribe() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className={styles.subscribeSection}>
      <div className={styles.overlay}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={styles.kicker}>LET'S EMBARK ON YOUR NEXT ADVENTURE</p>
            <h2 className={styles.heading}>
              Get exclusive offers <br />
              delivered to your inbox!
            </h2>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}
