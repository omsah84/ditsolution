"use client";

import { useEffect, useState } from "react";

interface Meta {
  views: number;
  likes: number;
  shares: number;
}

const defaultMeta: Meta = { views: 0, likes: 0, shares: 0 };

interface Course {
  _id: string;
  title: string;
  image: string;
  meta: Meta;
}

export default function CoursesMetaDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [metaData, setMetaData] = useState<Meta>(defaultMeta);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        const data = await res.json();

        const fixedData = data.map((c: Course) => ({
          ...c,
          meta: c.meta || defaultMeta,
        }));

        setCourses(fixedData);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setMetaData(course.meta || defaultMeta);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetaData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async () => {
    if (!selectedCourse) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/meta`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(metaData),
        }
      );

      if (!res.ok) throw new Error("Failed to update meta");

      const updated = await res.json();

      setCourses((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );

      setSelectedCourse(null);
      setMetaData(defaultMeta);
      alert("✅ Meta updated!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update meta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Courses Meta Dashboard</h1>

      {courses.length === 0 ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid gap-6">
          {courses.map((course) => (
            <div key={course._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-sm text-gray-400">
                    Views: {course.meta.views} | Likes: {course.meta.likes} | Shares: {course.meta.shares}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(course)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Edit Meta
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Meta Edit Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Meta: {selectedCourse.title}</h2>
            <div className="space-y-3">
              <input
                type="number"
                name="views"
                value={metaData.views}
                onChange={handleChange}
                placeholder="Views"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="likes"
                value={metaData.likes}
                onChange={handleChange}
                placeholder="Likes"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="shares"
                value={metaData.shares}
                onChange={handleChange}
                placeholder="Shares"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
