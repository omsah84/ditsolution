"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Testimonial {
  name: string;
  title?: string;
  quote: string;
  photo?: string;
}

interface Course {
  _id: string;
  title: string;
  image: string;
  testimonials: Testimonial[];
}

export default function CoursesTestimonialsDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({});
  const [file, setFile] = useState<File | null>(null);

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

  // Open form for add/edit testimonial
  const handleEdit = (course: Course, index: number | null) => {
    setSelectedCourse(course);
    setSelectedIndex(index);
    if (index !== null) {
      setFormData(course.testimonials[index]);
    } else {
      setFormData({ name: "", title: "", quote: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

const handleSubmit = async () => {
  if (!selectedCourse) return;
  setLoading(true);

  try {
    const data = new FormData();
    if (selectedIndex !== null) data.append("index", String(selectedIndex));
    if (formData.name) data.append("name", formData.name);
    if (formData.title) data.append("title", formData.title);
    if (formData.quote) data.append("quote", formData.quote);
    if (file) data.append("photo", file); // <-- must match multer field

    const url =
      selectedIndex !== null
        ? `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/testimonial`
        : `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/add-testimonial`;

    const method = selectedIndex !== null ? "PUT" : "POST";

    const res = await fetch(url, { method, body: data }); // no headers, browser sets correct multipart
    if (!res.ok) throw new Error("Failed to save testimonial");

    const updated = await res.json();

    setCourses((prev) =>
      prev.map((c) => (c._id === updated._id ? updated : c))
    );

    setSelectedCourse(null);
    setSelectedIndex(null);
    setFormData({});
    setFile(null);
    alert("✅ Testimonial saved!");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to save testimonial");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Courses Testimonials</h1>

      {courses.length === 0 ? (
        <p>Loading courses...</p>
      ) : (
        <div className="grid gap-6">
          {courses.map((course) => (
            <div key={course._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-4">
               <Image
  src={course.image}
  alt={course.title}
  width={80}   // corresponds to w-20 (20 * 4 = 80px in Tailwind)
  height={80}  // corresponds to h-20
  className="object-cover rounded"
/>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-sm text-gray-500">
                    {course.testimonials.length} testimonial(s)
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(course, null)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  + Add Testimonial
                </button>
              </div>

              {/* Show testimonials */}
              {course.testimonials.length > 0 && (
                <div className="mt-3 space-y-2">
                  {course.testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="p-3 border rounded-md bg-gray-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.title}</p>
                        <p className="italic">&quot;{t.quote}&quot;</p>
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
              {selectedIndex !== null ? "Edit Testimonial" : "Add Testimonial"}
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
              <textarea
                name="quote"
                value={formData.quote || ""}
                onChange={handleChange}
                placeholder="Quote"
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setSelectedIndex(null);
                  setFormData({});
                  setFile(null);
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
