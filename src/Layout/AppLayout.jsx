import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar.jsx";
import Promosubscribe from "../components/PromoSubscribe/PromoSubscribe.jsx";
import Footer from "../components/Footer/Footer.jsx";


export default function AppLayout() {
  return (
    <div style={{minHeight:"100dvh", display:"grid", gridTemplateRows:"auto 1fr auto"}}>
      <Navbar />
      <main>
        <Outlet />
      </main>
        <Promosubscribe />
      <Footer />
    </div>
  );
}
