import React from 'react'

// About page components
import AboutHero from './AboutHero'
import AboutIntro from './Aboutntro'
import AboutBanner from './AboutBanner'
import Mission from './Mission'
import Pillars from './Pillars'

export default function AboutPage() {
  return (
    <>
      <AboutHero/>
      <AboutBanner />
      <AboutIntro />
      <Mission />
      <Pillars />
      <AboutBanner />
    </>
  );
}