import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import OffersStrip from "./components/OffersStrip";
import WhatWeBuilding from "./components/WhatWeBuilding";
import TechAudit from "./components/TechAudit";
import RoiCalculator from "./components/RoiCalculator";
import FreePoc from "./components/FreePoc";
import AboutContact from "./components/AboutContact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <OffersStrip />
        <WhatWeBuilding />
        <TechAudit />
        <RoiCalculator />
        <FreePoc />
        <AboutContact />
      </main>
      <Footer />
    </>
  );
}
