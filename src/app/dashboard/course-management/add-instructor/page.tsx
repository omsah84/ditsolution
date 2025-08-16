"use client";

import { useEffect, useState } from "react";

interface Instructor {
  _id?: string;
  name: string;
  title?: string;
  rating?: number;
  experience?: string;
  bio?: string;
}

interface Course {
  _id: string;
  title: string;
  image: string;
  instructor: Instructor[]; // singular in your data
}

export default function CoursesInstructorsDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Instructor>>({});

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        const data = await res.json();

        // Ensure `instructor` array exists
        const fixedData = data.map((c: Course) => ({
          ...c,
          instructor: c.instructor || [],
        }));

        setCourses(fixedData);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  // Open add/edit form
  const handleEdit = (course: Course, index: number | null) => {
    setSelectedCourse(course);
    setSelectedIndex(index);
    if (index !== null) {
      setFormData(course.instructor[index]);
    } else {
      setFormData({ name: "", title: "", rating: 0, experience: "", bio: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedCourse) return;
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        title: formData.title,
        rating: formData.rating,
        experience: formData.experience,
        bio: formData.bio,
        index: selectedIndex !== null ? selectedIndex : undefined,
      };

      const url =
        selectedIndex !== null
          ? `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/instructor`
          : `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/add-instructor`;

      const method = selectedIndex !== null ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save instructor");

      const updated = await res.json();

      setCourses((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );

      setSelectedCourse(null);
      setSelectedIndex(null);
      setFormData({});
      alert("✅ Instructor saved!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save instructor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Courses Instructors Dashboard</h1>

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
                  <p className="text-sm text-gray-500">
                    {course.instructor.length} instructor(s)
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(course, null)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  + Add Instructor
                </button>
              </div>

              {/* Show instructors */}
              {course.instructor.length > 0 && (
                <div className="mt-3 space-y-2">
                  {course.instructor.map((inst, i) => (
                    <div
                      key={i}
                      className="p-3 border rounded-md bg-gray-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold">{inst.name}</p>
                        <p className="text-xs text-gray-500">{inst.title}</p>
                        <p className="text-xs text-gray-500">Rating: {inst.rating}</p>
                        <p className="text-xs italic">{inst.experience}</p>
                        <p className="italic">"{inst.bio}"</p>
                      </div>
                      <button
                        onClick={() => handleEdit(course, i)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {selectedIndex !== null ? "Edit Instructor" : "Add Instructor"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="rating"
                value={formData.rating || 0}
                onChange={handleChange}
                placeholder="Rating (0-5)"
                min={0}
                max={5}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="experience"
                value={formData.experience || ""}
                onChange={handleChange}
                placeholder="Experience"
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setSelectedIndex(null);
                  setFormData({});
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
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
