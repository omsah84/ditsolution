"use client";

import { useEffect, useState } from "react";

interface Course {
  _id: string;
  title: string;
  image: string;
  resources: string[];
}

export default function CoursesResourcesDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        const data = await res.json();
        const fixedData = data.map((c: Course) => ({
          ...c,
          resources: c.resources || [],
        }));
        setCourses(fixedData);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  // Open modal
  const handleOpenModal = (course: Course) => {
    setSelectedCourse(course);
    setFiles([]);
  };

  // Upload resources
  const handleSubmit = async () => {
    if (!selectedCourse || files.length === 0) return;
    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("resources", file));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/resources`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to upload resources");

      const updated = await res.json();
      setCourses((prev) =>
        prev.map((c) =>
          c._id === selectedCourse._id
            ? { ...c, resources: updated.resources }
            : c
        )
      );

      alert("✅ Resources uploaded successfully!");
      setSelectedCourse(null);
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload resources");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Courses Resources Dashboard</h1>

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
                    Resources: {course.resources.length}
                  </p>
                </div>
                <button
                  onClick={() => handleOpenModal(course)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  + Add Resources
                </button>
              </div>

              {course.resources.length > 0 && (
                <div className="mt-3 space-y-1">
                  {course.resources.map((res, idx) => (
                    <p
                      key={idx}
                      className="text-xs text-gray-500 truncate"
                      title={res}
                    >
                      📎 {res}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">
              Add Resources - {selectedCourse.title}
            </h2>

            <input
              type="file"
              accept=".pdf,.zip,.doc,.docx,.ppt,.pptx"
              multiple
              onChange={(e) => {
                if (e.target.files) {
                  setFiles(Array.from(e.target.files));
                }
              }}
              className="w-full border px-2 py-1 rounded mb-3"
            />

            {files.length > 0 && (
              <ul className="mb-3 text-sm list-disc pl-4 text-gray-600">
                {files.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setFiles([]);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
