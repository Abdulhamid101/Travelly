import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../assets/logoimg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "../../utils/scrollToId";
import ContactPopover from "../../pages/Contact/Contact";

const PANEL_TRANSITION_MS = 280;

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const nav = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => (document.body.style.overflow = prev || "");
  }, [open]);

  const goto = async (hash) => {
    const id = hash.replace(/^#/, "");
    if (pathname !== "/") {
      nav("/" + hash, { replace: false });
      requestAnimationFrame(() => setTimeout(() => scrollToId(id), 0));
    } else {
      window.history.pushState({}, "", `/${hash}`);
      scrollToId(id);
    }
    setOpen(false);
    setContactOpen(false);
  };

  const openContact = (e) => {
    e?.preventDefault?.();
    if (open) {
      setOpen(false);
      setTimeout(() => setContactOpen(true), PANEL_TRANSITION_MS);
    } else {
      setContactOpen((s) => !s);
    }
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.left}>
          <img className={styles.logo} src={logo} alt="Travelly" />
          <span className={styles.brand}>TRAVELLY</span>
        </div>
      </Link>

      <nav className={styles.nav} aria-label="Primary">
        <Link
          to="/#Steps"
          onClick={(e) => {
            e.preventDefault();
            goto("#Steps");
          }}
        >
          How it works
        </Link>
        <Link
          to="/#Destinations"
          onClick={(e) => {
            e.preventDefault();
            goto("#Destinations");
          }}
        >
          Popular destination
        </Link>
        <Link
          to="/#Testimonials"
          onClick={(e) => {
            e.preventDefault();
            goto("#Testimonials");
          }}
        >
          Testimonials
        </Link>
      </nav>

      <button
        className={styles.ctaLink}
        onClick={openContact}
        aria-haspopup="dialog"
        aria-expanded={contactOpen}
      >
        Contact
      </button>

      <button
        className={styles.menuBtn}
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)} />
      )}

      <aside
        className={`${styles.panel} ${open ? styles.show : ""}`}
        aria-modal="true"
        role="dialog"
      >
        <div className={styles.panelHead}>
          <div className={styles.left}>
            <img className={styles.logo} src={logo} alt="" />
            <span className={styles.brand}>TRAVELLY</span>
          </div>
          <button
            className={styles.closeBtn}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <nav className={styles.mobileNav}>
          <Link
            to="/#Steps"
            onClick={(e) => {
              e.preventDefault();
              goto("#Steps");
            }}
          >
            How it works
          </Link>
          <Link
            to="/#Destinations"
            onClick={(e) => {
              e.preventDefault();
              goto("#Destinations");
            }}
          >
            Popular destination
          </Link>
          <Link
            to="/#Testimonials"
            onClick={(e) => {
              e.preventDefault();
              goto("#Testimonials");
            }}
          >
            Testimonials
          </Link>

          <button
            className={styles.mobileCta}
            onClick={openContact}
            aria-haspopup="dialog"
            aria-expanded={contactOpen}
            type="button"
          >
            Contact Us
          </button>
        </nav>
      </aside>

      {contactOpen && (
        <ContactPopover
          onClose={() => setContactOpen(false)}
          onGo={(hash) => goto(hash)}
        />
      )}
    </header>
  );
}
