import { notFound } from "next/navigation";
import Image from "next/image";
import courses from "@/context/data/data.json";
import {
  Star,
  Clock,
  Monitor,
  Award,
  BookOpen,
  Users,
  Tag,
  ChevronRight,
} from "lucide-react";
import AcademicTestimonials from "@/components/academic/home/Testimonials";
import UpcomingClassCard from "@/components/academic/courses/UpcomingClassCard";


// Workaround for Next.js type conflict
type PageParams = {
  id: string;
};

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const course = courses.find((c) => c.id === id);

//   return {
//     title: course?.title || "Course Not Found",
//   };
// }

// Page component with proper typing
export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) return notFound();

  const relatedCourses = courses
    .filter(
      (c) =>
        c.id !== course.id &&
        c.category?.some((cat) => course.category?.includes(cat))
    )
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header with gradient */}
      <div className="mb-8 md:mb-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-3">
            {course.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {course.title}
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            {course.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
            <div className="flex items-center">
              <Star className="fill-yellow-400 stroke-yellow-400 w-5 h-5" />
              <span className="ml-1 font-medium">{course.rating}</span>
              <span className="text-indigo-200 ml-1">
                ({course.reviewCount})
              </span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-indigo-200" />
              <span className="ml-1 text-indigo-200">
                {course.enrollmentCount}+ Students
              </span>
            </div>
            <div className="flex items-center">
              <Tag className="w-5 h-5 text-indigo-200" />
              <span className="ml-1 text-indigo-200">
                {course.discountPrice
                  ? `$${course.discountPrice}`
                  : `$${course.price}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Image Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-white/50 backdrop-blur-sm">
            <div className="relative aspect-video">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <p className="text-white font-medium text-lg">
                  Complete Project-Based Learning
                </p>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              Course Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Curriculum Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <ChevronRight className="w-6 h-6 text-indigo-600" />
              </div>
              Curriculum Overview
            </h3>
            <div className="space-y-6">
              {Array.isArray(course.curriculum) ? (
                course.curriculum.map((section, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 border-indigo-200 pl-4 py-1"
                  >
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {section.title}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {Array.isArray(section.topics) ? (
                        section.topics.map((topic, i) => (
                          <li key={i} className="flex items-start">
                            <div className="bg-indigo-100 rounded-full p-1 mt-1 mr-2">
                              <ChevronRight className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="text-gray-600">{topic}</span>
                          </li>
                        ))
                      ) : (
                        <li>No topics available</li>
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No curriculum data available.</p>
              )}
            </div>
          </div>

          {/* Requirements Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Requirements
            </h3>

            <div className="flex flex-wrap gap-6">
              {/* Audience */}
              <div className="flex-1 min-w-[250px]">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="bg-indigo-100 p-1 rounded">
                    <Users className="w-5 h-5 text-indigo-600" />
                  </div>
                  Who is this for?
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Anyone interested in learning this topic.
                </p>
              </div>

              {/* Prerequisites */}
              <div className="flex-1 min-w-[250px]">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <div className="bg-indigo-100 p-1 rounded">
                    <Award className="w-5 h-5 text-indigo-600" />
                  </div>
                  Prerequisites
                </h4>

                {Array.isArray(course.prerequisites) &&
                course.prerequisites.length > 0 ? (
                  <ul className="text-gray-600 text-sm space-y-1">
                    {course.prerequisites.map((req, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-indigo-100 rounded-full p-1 mt-1 mr-2">
                          <ChevronRight className="w-3 h-3 text-indigo-600" />
                        </div>
                        {req}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No prerequisites required.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Demo Video */}
          {course.courseUrl && (
            <div className="mt-10">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-800">
                  🎬 Demo Video
                </span>
                <span className="text-xs text-white bg-indigo-600 px-2 py-0.5 rounded-full">
                  Preview
                </span>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <iframe
                  src={course.courseUrl}
                  title="Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-[350px] sm:h-[400px] lg:h-[450px]"
                ></iframe>
              </div>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="lg:w-96 space-y-6">
          {/* Pricing Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/10"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Enroll Now</h3>

              <div className="mb-6">
                {course.discountPrice ? (
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold">
                      ${course.discountPrice}
                    </span>
                    <span className="line-through text-indigo-200">
                      ${course.price}
                    </span>
                    <span className="ml-auto bg-amber-400 text-gray-900 px-2 py-1 rounded-full text-sm font-bold">
                      SAVE ${course.price - course.discountPrice}
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold">${course.price}</span>
                )}
              </div>

              <button className="w-full py-3.5 rounded-xl bg-white text-indigo-700 font-bold text-lg hover:bg-gray-100 transition-all transform hover:-translate-y-0.5 shadow-lg">
                Add to Cart
              </button>

              <div className="mt-6 pt-4 border-t border-white/20">
                <ul className="space-y-3 text-indigo-100">
                  <li className="flex items-center gap-3">
                    <Clock className="w-5 h-5" />
                    <span>Lifetime Access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Monitor className="w-5 h-5" />
                    <span>Online & Self-Paced</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="w-5 h-5" />
                    <span>Certificate of Completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Instructor Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              About Instructor
            </h3>
            <div className="flex items-center gap-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <div>
                <h4 className="font-bold text-lg">{course.instructor}</h4>
                <p className="text-gray-600 text-sm">
                  {course.instructorTitle}
                </p>
                <div className="flex mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 4
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "fill-gray-300 stroke-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-4 text-gray-600 text-sm">
              With over 10 years of industry experience and 5 years of teaching,
              {course.instructor.split(" ")[0]} brings real-world expertise to
              this course.
            </p>
          </div>

          {/* Course Details Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Course Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs">DURATION</h4>
                  <p className="font-medium">{course.duration}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Monitor className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs">FORMAT</h4>
                  <p className="font-medium">{course.format}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs">CERTIFICATE</h4>
                  <p className="font-medium">
                    {course.certificate ? "Included" : "Not Included"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <UpcomingClassCard />

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Related Courses
              </h3>
              <ul className="space-y-4">
                {relatedCourses.map((rel) => (
                  <li key={rel.id}>
                    <a
                      href={`/courses/${rel.id}`}
                      className="group flex items-start gap-3"
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                          {rel.title}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {rel.subtitle}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className="text-amber-600 font-bold text-sm">
                            {rel.rating}
                          </span>
                          <Star className="fill-amber-400 stroke-amber-400 w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <AcademicTestimonials />
    </section>
  );
}
