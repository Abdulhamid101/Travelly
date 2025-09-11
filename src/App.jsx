import NavBar from './components/NavBar/NavBar.jsx';
import Hero from './components/Hero/Hero.jsx';
import styles from './App.module.css';
import Steps from './components/Steps/Steps.jsx';
import DestinationHero from './components/DestinationHero/DestinationHero.jsx';
import TestimonialMap from './components/TestimonialMap/TestimonialMap.jsx';
import PromoSubscribe from './components/PromoSubscribe/PromoSubscribe.jsx';
import Footer from './components/Footer/Footer.jsx';

export default function App() {
return (
<div className={styles.shell}>
<NavBar />
<Hero />
<Steps />
<DestinationHero />
<TestimonialMap />
<PromoSubscribe />
<Footer />
</div>
);
}