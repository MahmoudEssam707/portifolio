import Hero from "../sections/Hero";
import Marquee from "../sections/Marquee";
import About from "../sections/About";
import Experience from "../sections/Experience";
import Work from "../sections/Work";
import Skills from "../sections/Skills";
import Papers from "../sections/Papers";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Papers />
      <Contact />
    </>
  );
}
