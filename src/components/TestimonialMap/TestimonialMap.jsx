import React from "react";
import styles from "./TestimonialMap.module.css";
import image1 from "../../assets/mapimg1.webp";
import image2 from "../../assets/mapimg2.webp";
import image3 from "../../assets/mapimg3.png";
import image4 from "../../assets/mapimg4.webp";
import image5 from "../../assets/mapimg5.webp";
import image6 from "../../assets/mapimg5.webp";
import map from "../../assets/mapimg.jpeg";

export default function TestimonialMap({ id = "Testimonials" }) {
  return (
    <section id={id} className={styles.testimonialSection}>
      {" "}
      <div className={styles.content}>
        <p className={styles.kicker}>REVIEWS</p>
        <h2 className={styles.heading}>
          WHAT OUR PEOPLE SAYS ABOUT{" "}
          <span className={styles.brand}>TRAVELLY</span>
        </h2>
        <p className={styles.quote}>
          "I have always been frustrated in searching for destinations only to
          realize I need a difficult visa. With Tripmatch, it only shows trips I
          am eligible for based on my passport. It saved time and helped me feel
          confident planning a trip to Tanzania. Highly recommend it!"
        </p>
        <p className={styles.author}>- David Adeleke, Nigeria</p>
      </div>
      <div className={styles.mapContainer}>
        <img src={map} alt="World map" className={styles.map} />
        <Avatar src={image6} top="20%" left="10%" />
        <Avatar src={image1} top="10%" left="55%" />
        <Avatar src={image2} top="40%" left="30%" />
        <Avatar src={image3} top="55%" left="70%" />
        <Avatar src={image4} top="70%" left="50%" />
        <Avatar src={image5} top="25%" left="80%" />
      </div>
    </section>
  );
}

function Avatar({ src, top, left }) {
  return (
    <div className={styles.avatar} style={{ top, left }}>
      <img src={src} alt="User" />
    </div>
  );
}
