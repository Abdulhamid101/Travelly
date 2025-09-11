import styles from './Hero.module.css';


export default function Hero() {
return (
<section className={styles.hero}>
<div className={styles.overlay} />


<div className={styles.center}>
<h1 className={styles.title}>
Explore the <span className={styles.accentUnderline}>World</span> with
<span className={styles.accent}> Budget</span>
<br />
Friendly Travel Options
</h1>
<p className={styles.sub}>
Get personalized travel bundles based on your budget, passport, and travel dates in
seconds. We will find affordable, visa‑friendly trips tailored just for you.
</p>


<button className={styles.cta}>Start Planning</button>
</div>
</section>
);
}