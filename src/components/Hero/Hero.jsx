// Hero.jsx
import React, { useState, useRef } from "react";
import styles from "./Hero.module.css";
import TripPlanner from "../../pages/TripPlanner/TripPlanner.jsx";
import FindingTripModal from "../../pages/FindingTripModal/FindingTripModal.jsx";

export default function Hero() {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [finding, setFinding] = useState(false);
  const abortRef = useRef(null);

  async function handlePlanSubmit(data) {
    // Close the planner and show the “finding” modal
    setPlannerOpen(false);
    setFinding(true);

    // Example pattern using AbortController if you fetch to your API
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      // Replace with your real request
      // const res = await fetch("/api/trips/search", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      //   signal: ctrl.signal,
      // });

      // Demo delay so you can see the modal:
      await new Promise((r) => setTimeout(r, 2000));

      // After success, hide the modal (and maybe navigate/show results)
      setFinding(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err);
      }
      setFinding(false);
    }
  }

  function handleCancelFinding() {
    abortRef.current?.abort?.();
    setFinding(false);
  }

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
            travel dates in seconds.
          </p>
          <button className={styles.cta} onClick={() => setPlannerOpen(true)}>
            Start Planning
          </button>
        </div>
      </section>

      <TripPlanner
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        onSubmit={handlePlanSubmit}
      />

      <FindingTripModal open={finding} onCancel={handleCancelFinding} />
    </>
  );
}
