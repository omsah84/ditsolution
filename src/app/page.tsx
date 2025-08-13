"use client";

import React from "react";
import { useMode } from "@/context/mode/useMode";
import AcademicHero from "@/components/academic/home/Hero";
import TechHero from "@/components/tech/home/Hero";
import AcademicFeatures from "@/components/academic/home/Features";
import AcademicTestimonials from "@/components/academic/home/Testimonials";
import AcademicAchievements from "@/components/academic/home/Achievements";
import AcademicCTA from "@/components/academic/home/CTA";
import AcademicFAQ from "@/components/academic/home/FAQ";
import AcademicNewsletter from "@/components/academic/home/Newsletter";

import TechFeatures from "@/components/tech/home/Features";
import TechCTA from "@/components/tech/home/CTA";
import CodeShowcase from "@/components/tech/home/CodeShowcase";
import TechIntegrations from "@/components/tech/home/Integrations";
import TechTestimonials from "@/components/tech/home/Testimonials";
import SuccessStory from "@/components/academic/home/SuccessStory";
import CoursesTabs from "@/components/academic/home/CoursesTabs";
import LevelCoursesFilter from "@/components/academic/home/LevelCoursesFilter";
import GenAICourseSection from "@/components/academic/home/GenAICourseSection";
import StudentPlacementCarousel from "@/components/academic/home/StudentPlacementCarousel";

export default function Home() {
  const { mode } = useMode();

  return (
    <>
      {mode === "academic" ? (
        <>
          <AcademicHero />
          <StudentPlacementCarousel />
          <GenAICourseSection />
          <AcademicFeatures />
          <CoursesTabs />
          <LevelCoursesFilter />
          <SuccessStory />
          <AcademicTestimonials />
          <AcademicCTA />
          <AcademicAchievements />
          <AcademicFAQ />
          <AcademicNewsletter />
        </>
      ) : (
        <>
          <TechHero />
          <TechFeatures />
          <CodeShowcase />
          <TechIntegrations />
          <TechTestimonials />
          <TechCTA />
        </>
      )}
    </>
  );
}
