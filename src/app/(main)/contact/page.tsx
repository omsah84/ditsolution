'use client'

import React from 'react'
import ContactUs from '@/components/ContactUs'
import AcademicHero from '@/components/academic/home/Hero'
import TechHero from '@/components/tech/home/Hero'

import { useMode } from '@/context/mode/useMode'

export default function Page() {
  const { mode } = useMode()

  return (
    <div>
      {/* Mode-based Hero section */}
      {mode === 'academic' ? <AcademicHero /> : <TechHero />}

      {/* Contact Us content (shared or mode-specific if needed) */}
      <ContactUs />

     
    </div>
  )
}
