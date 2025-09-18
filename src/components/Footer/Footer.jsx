import React, { useState } from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from "react-icons/fa";
import styles from "./Footer.module.css";
import logo from "../../assets/logoimg.png";
import { scrollToId } from "../../utils/scrollToId";
import ContactPopover from "../../pages/Contact/Contact";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const [contactOpen, setContactOpen] = useState(false);

  const goto = (hash) => {
    const id = hash.replace(/^#/, "");

    if (pathname !== "/") {
      nav("/" + hash, { replace: false });
      requestAnimationFrame(() => setTimeout(() => scrollToId(id), 0));
    } else {
      window.history.pushState({}, "", `/${hash}`);
      scrollToId(id);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      // Already on homepage: open popover directly
      setContactOpen(true);
    } else {
      // Navigate to home and scroll to Contact section
      goto("#Contact");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link to="/">
            <div className={styles.logo} aria-hidden>
              <img src={logo} alt="Travelly Logo" />
              <span className={styles.brandText}>TRAVELLY</span>
            </div>
          </Link>
          <p className={styles.copy}>© 2025 Travelly. All rights reserved.</p>
        </div>

        <nav className={styles.columns} aria-label="Footer navigation">
          <div className={styles.col}>
            <Link
              to="/#Steps"
              onClick={(e) => {
                e.preventDefault();
                goto("#Steps");
              }}
            >
              How it Works
            </Link>
            <Link
              to="/#About"
              onClick={(e) => {
                e.preventDefault();
                goto("#About");
              }}
            >
              About Us
            </Link>
          </div>
          <div className={styles.col}>
            <Link
              to="/#Destinations"
              onClick={(e) => {
                e.preventDefault();
                goto("#Destinations");
              }}
            >
              Popular Destinations
            </Link>

            {/* Updated Contact link */}
            <a href="/#Contact" onClick={handleContactClick}>
              Contact Us
            </a>
          </div>
        </nav>

        {/* Social Icons */}
        <div className={styles.socials}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
 
      <div className={styles.bottom}>
        <div className={styles.rightLinks}>
          <a href="/faq">FAQ</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>

      {contactOpen && (
        <ContactPopover
          onClose={() => setContactOpen(false)}
          onGo={(hash) => goto(hash)}
        />
      )}
    </footer>
  );
}
