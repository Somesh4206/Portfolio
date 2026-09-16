"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import PaperTexture from "@/components/PaperTexture";
import { CustomCursor, ScrollProgress } from "@/components/Chrome";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && (
        <LoadingScreen
          duration={2800}
          brandName="Somesh M"
          year="2026"
          role="AI Developer · Full Stack Engineer"
          onComplete={() => setReady(true)}
        />
      )}
      <PaperTexture />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main id="main">
        <Hero start={ready} />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
