'use client'

import React from 'react'
import AcademicHero from '@/components/academic/home/Hero'
import TechHero from '@/components/tech/home/Hero'

import { useMode } from '@/context/mode/useMode'
import DownloadResources from '@/components/academic/downloads/DownloadResources'

export default function Page() {
  const { mode } = useMode()

  return (
    <div>
      {/* Hero Section */}
      {mode === 'academic' ? <AcademicHero /> : <TechHero />}

      <DownloadResources/>
    
      
    </div>
  )
}
