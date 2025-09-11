import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/logoimg.png";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => (document.body.style.overflow = prev || "");
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img className={styles.logo} src={logo} alt="Travelly" />
        <span className={styles.brand}>TRAVELLY</span>
      </div>
      <nav className={styles.nav} aria-label="Primary">
        <a href="#">How it works</a>
        <a href="#">Popular destination</a>
        <a href="#">Testimonials</a>
      </nav>
      <a href="#" className={styles.ctaLink}>Contact Us</a>
      <button
        className={styles.menuBtn}
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span /><span /><span />
      </button>
      {open && <div className={styles.backdrop} onClick={() => setOpen(false)} />}

      <aside className={`${styles.panel} ${open ? styles.show : ""}`} aria-modal="true" role="dialog">
        <div className={styles.panelHead}>
          <div className={styles.left}>
            <img className={styles.logo} src={logo} alt="" />
            <span className={styles.brand}>TRAVELLY</span>
          </div>
          <button className={styles.closeBtn} aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
        </div>

        <nav className={styles.mobileNav}>
          <a href="#" onClick={() => setOpen(false)}>How it works</a>
          <a href="#" onClick={() => setOpen(false)}>Popular destination</a>
          <a href="#" onClick={() => setOpen(false)}>Testimonials</a>
          <a href="#" className={styles.mobileCta} onClick={() => setOpen(false)}>Contact Us</a>
        </nav>
      </aside>
    </header>
  );
}
