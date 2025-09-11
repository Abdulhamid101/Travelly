import React from "react";
import {FaTwitter,FaInstagram,FaLinkedin,FaFacebook} from "react-icons/fa"
import styles from "./Footer.module.css";
import logo from '../../assets/logoimg.png'

export default function Footert() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo} aria-hidden>
            <img src={logo} alt="" />
            <span className={styles.brandText}>TRAVELLY</span>
          </div>
          <p className={styles.copy}>Travelly 2025, All right reserved</p>
        </div>

        <nav className={styles.columns} aria-label="Footer navigation">
          <div className={styles.col}>
            <a href="#">How it’s works</a>
            <a href="#">About Us</a>
          </div>
          <div className={styles.col}>
            <a href="#">Popular destination</a>
            <a href="#">Contact Us</a>
          </div>
        </nav>

        <div className={styles.socials}>
          <a href="#" aria-label="X / Twitter">
          <FaTwitter />
          </a>
          <a href="#" aria-label="Instagram">
          <FaInstagram />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.rightLinks}>
          <a href="#">FAQ</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of service</a>
        </div>
      </div>
    </footer>
  );
}
