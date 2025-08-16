'use client'

import React from 'react'
import AboutUs from '@/components/AboutUs'

import AcademicHero from '@/components/academic/home/Hero'
import TechHero from '@/components/tech/home/Hero'
import { useMode } from '@/context/mode/useMode'

export default function Page() {
  const { mode } = useMode()

  return (
    <div>
      {/* Mode-based Hero section */}
      {mode === 'academic' ? <AcademicHero /> : <TechHero />}

      {/* Shared About Us section */}
      <AboutUs />

   
    </div>
  )
}
