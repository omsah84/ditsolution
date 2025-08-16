"use client";

import { useEffect, useState } from "react";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Course {
  _id: string;
  title: string;
  image: string;
  reviews: Review[];
}

export default function CoursesReviewsDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Review>>({});

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

  // Open add/edit form
  const handleEdit = (course: Course, index: number | null) => {
    setSelectedCourse(course);
    setSelectedIndex(index);
    if (index !== null) {
      setFormData(course.reviews[index]);
    } else {
      setFormData({ user: "", rating: 0, comment: "" });
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
        user: formData.user,
        rating: formData.rating,
        comment: formData.comment,
        index: selectedIndex !== null ? selectedIndex : undefined,
      };

      const url =
        selectedIndex !== null
          ? `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/review`
          : `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/add-review`;

      const method = selectedIndex !== null ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save review");

      const updated = await res.json();

      setCourses((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );

      setSelectedCourse(null);
      setSelectedIndex(null);
      setFormData({});
      alert("✅ Review saved!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Courses Reviews Dashboard</h1>

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
                    {course.reviews.length} review(s)
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(course, null)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  + Add Review
                </button>
              </div>

              {/* Show reviews */}
              {course.reviews.length > 0 && (
                <div className="mt-3 space-y-2">
                  {course.reviews.map((r, i) => (
                    <div
                      key={i}
                      className="p-3 border rounded-md bg-gray-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold">{r.user}</p>
                        <p className="text-xs text-gray-500">Rating: {r.rating}</p>
                        <p className="italic">&quot;{r.comment}&quot;</p>
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
              {selectedIndex !== null ? "Edit Review" : "Add Review"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                name="user"
                value={formData.user || ""}
                onChange={handleChange}
                placeholder="Name"
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
              <textarea
                name="comment"
                value={formData.comment || ""}
                onChange={handleChange}
                placeholder="Comment"
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
