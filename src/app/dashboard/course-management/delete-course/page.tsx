"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  image: string;
  category?: string[];
}

export default function CoursesDeleteDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  // Delete a course
  const handleDelete = async (id: string) => {
    if (!confirm("⚠️ Are you sure you want to delete this course?")) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete course");

      setCourses((prev) => prev.filter((c) => c._id !== id));
      alert("✅ Course deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Courses Delete Dashboard</h1>

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="grid gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-lg p-4 shadow-sm flex items-center gap-4"
            >
              <Image
                src={course.image}
                alt={course.title}
                width={80} // corresponds to w-20 (20 * 4 = 80px in Tailwind)
                height={80} // corresponds to h-20
                className="object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-500">
                  {course.category?.join(", ") || "Uncategorized"}
                </p>
              </div>
              <button
                onClick={() => handleDelete(course._id)}
                disabled={loading}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
