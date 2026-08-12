import { useState } from "react";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <>
      {!introFinished && (
        <Intro onComplete={() => setIntroFinished(true)} />
      )}

      <main>

        <Navbar/>

        <Hero />

        <About/>

        <Projects/>

        <Skills/>

        <Contact/>
      </main>
    </>
  );
}

export default App;