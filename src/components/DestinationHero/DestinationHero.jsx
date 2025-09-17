import React, { useEffect, useMemo, useState } from "react";
import styles from "./DestinationHero.module.css";
import image1 from "../../assets/Dheroimg1.png";
import image2 from "../../assets/Dheroimg2.png";

export default function DestinationHero({
  id = "Destinations",
  kicker = "POPULAR DESTINATIONS",
  title = "THAILAND",
  blurb = "Plan, book and embark on your dream adventures with our expert guidance and tailored experience.",
  ctaText = "Explore Now",
  onCta = () => {},
  images = [
    image1,
    image2,
    "https://images.unsplash.com/photo-1487730116645-74489c95b41b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1600&auto=format&fit=crop",
  ],
  slideInterval = 3500,
  fadeMs = 700,
}) {
  const [roll, setRoll] = useState(() => (images.length ? images.slice() : []));
  const trio = useMemo(() => roll.slice(0, 3), [roll]);

  const [bgCurr, setBgCurr] = useState(trio[0]);
  const [bgPrev, setBgPrev] = useState(trio[0]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (trio[0] && trio[0] !== bgCurr) {
      setBgPrev(bgCurr);
      setBgCurr(trio[0]);
      setFading(true);
      const t = setTimeout(() => setFading(false), fadeMs);
      return () => clearTimeout(t);
    }
  }, [trio, bgCurr, fadeMs]);

  useEffect(() => {
    if (roll.length < 3) return;
    const idTimer = setInterval(() => {
      setRoll((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, slideInterval);
    return () => clearInterval(idTimer);
  }, [roll.length, slideInterval]);

  if (trio.length < 3) return null;

  return (
    <section id={id} className={styles.hero}>
      {" "}
      <div className={styles.bg}>
        <div
          className={`${styles.bgImg} ${fading ? styles.fadeOut : ""}`}
          style={{ backgroundImage: `url(${bgPrev})` }}
          aria-hidden
        />
        <div
          className={`${styles.bgImg} ${fading ? styles.fadeIn : ""}`}
          style={{ backgroundImage: `url(${bgCurr})` }}
          aria-hidden
        />
        <div className={styles.vignette} aria-hidden />
      </div>
      <div className={styles.shell}>
        <div className={styles.left}>
          <p className={styles.kicker}>{kicker}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.blurb}>{blurb}</p>
          <button className={styles.cta} onClick={onCta}>
            {ctaText}
          </button>
        </div>

        <div className={styles.cards}>
          <Card src={trio[0]} className={styles.cardTall} />
          <Card src={trio[1]} className={styles.cardMid} />
          <Card src={trio[2]} className={styles.cardShort} />
        </div>
      </div>
    </section>
  );
}

function Card({ src, className }) {
  return (
    <div className={`${styles.card} ${className}`}>
      <img src={src} alt="" loading="lazy" />
      <span className={styles.edge} aria-hidden />
    </div>
  );
}
