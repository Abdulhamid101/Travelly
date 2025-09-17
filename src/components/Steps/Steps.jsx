import React from "react";
import { FaClipboardCheck, FaSearch, FaMapMarkedAlt } from "react-icons/fa";
import styles from "./Steps.module.css";
import image1 from "../../assets/Stepsimg.png";
import image2 from "../../assets/Step2img.png";
import image3 from "../../assets/Stepsimg3.png";

export default function Steps({
  id = "Steps", 
  kicker = "HOW IT WORKS",
  title = "PLAN YOUR TRIP IN 3 SIMPLE STEPS",
  blurb = "We simplify travel by finding visa-friendly destinations and ready-to-go trip bundles instantly.",
  images = [image1, image2, image1, image3],
}) {
  const steps = [
    {
      icon: <FaClipboardCheck size={18} />,
      h: "Tell Us About Your Travel Plans",
      p: "Enter your budget, passport, country and travel dates. We’ll use them to unlock travel options that fit you perfectly.",
    },
    {
      icon: <FaSearch size={18} />,
      h: "We Find What Works For You",
      p: "Our smart system scans flights, stays and visa requirements to find trips you can actually take—no guess work.",
    },
    {
      icon: <FaMapMarkedAlt size={18} />,
      h: "Get Instantly Matched with Trips You Can Take",
      p: "We match trips that fit your reality, budget, visa and timing—all in one place without the stress.",
    },
  ];

  return (
    <div className={styles.containerWrapper}>
      {/* ✅ Add the id here so navbar links can scroll to this section */}
      <section
        id={id}
        className={styles.section}
        aria-labelledby="trip-steps-title"
      >
        <div className={styles.shell}>
          <div className={styles.textCol}>
            <p className={styles.kicker}>{kicker}</p>
            <h2 id="trip-steps-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.blurb}>{blurb}</p>

            <ul className={styles.steps} role="list">
              {steps.map((s, i) => (
                <li className={styles.step} key={i}>
                  <span className={styles.iconWrap}>{s.icon}</span>
                  <div className={styles.stepText}>
                    <h3 className={styles.stepH}>{s.h}</h3>
                    <p className={styles.stepP}>{s.p}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.mediaCol} aria-hidden>
            <div className={styles.grid}>
              {images.slice(0, 4).map((src, idx) => (
                <div className={styles.cell} key={idx}>
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
