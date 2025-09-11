import styles from "./NavBar.module.css";
import logo from "../../assets/logoimg.png";

export default function NavBar() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img className={styles.logo} src={logo} alt="Travelly" />
        <span className={styles.brand}>TRAVELLY</span>
      </div>

      <nav className={styles.nav}>
        <a href="#">How it works</a>
        <a href="#">Popular destination</a>
        <a href="#">Testimonials</a>
      </nav>

      <a href="#" className={styles.ctaLink}>
        Contact Us
      </a>
    </header>
  );
}
