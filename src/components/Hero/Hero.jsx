// src/components/Hero/Hero.jsx
import React, { useState } from "react";
// import TripPlannerModal from "../../pages/TripPlanner/TripPlanner.jsx";
import styles from "./Hero.module.css";

export default function Hero() {
  const [plannerOpen, setPlannerOpen] = useState(false);

  return (
    <>
      <section className={styles.hero} id="hero">
        <span className={styles.overlay} aria-hidden />

        <div className={styles.center}>
          <h1 className={styles.title}>
            Explore the <span className={styles.accentUnderline}>World</span>{" "}
            with <span className={styles.accentUnderline}>Budget</span> Friendly
            Travel Options
          </h1>

          <p className={styles.sub}>
            Get personalized travel bundles based on your budget, passport, and
            travel dates in second. We will find affordable, visa-friendly trips
            tailored just for you.
          </p>

          <button className={styles.cta} onClick={() => setPlannerOpen(true)}>
            Start Planning
          </button>
        </div>
      </section>

      {/* <TripPlannerModal
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        onSubmit={(data) => {
          console.log("Trip planner data:", data);
          setPlannerOpen(false);
        }}
      /> */}
    </>
  );
}
