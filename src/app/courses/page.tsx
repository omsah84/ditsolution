
import CoursesList from '@/components/academic/courses/CourseList'
import AcademicTestimonials from '@/components/academic/home/Testimonials'
import React from 'react'

export default function Page() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-10 space-y-16">
      <CoursesList />
      <AcademicTestimonials/>
    </main>
  )
}
