'use client'

import React from 'react'
import PrivacyPolicy from '@/components/PrivacyPolicy'
import AcademicHero from '@/components/academic/home/Hero'
import TechHero from '@/components/tech/home/Hero'

import { useMode } from '@/context/mode/useMode'

export default function Page() {
  const { mode } = useMode()

  return (
    <div>
      {/* Hero Section */}
      {mode === 'academic' ? <AcademicHero /> : <TechHero />}

      {/* Main Privacy Policy Content */}
      <PrivacyPolicy />

      
    </div>
  )
}
