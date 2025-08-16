"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Curriculum {
  title: string;
  topics: string[];
  resources: (string | File)[]; // allow both
}

interface Course {
  _id: string;
  title: string;
  image: string;
  curriculum: Curriculum[];
}

const defaultCurriculum: Curriculum = {
  title: "",
  topics: [""],
  resources: [""],
};

export default function CoursesCurriculumDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // track index for edit
  const [curriculumForm, setCurriculumForm] =
    useState<Curriculum>(defaultCurriculum);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
        const data = await res.json();
        const fixedData = data.map((c: Course) => ({
          ...c,
          curriculum: c.curriculum || [],
        }));
        setCourses(fixedData);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };
    fetchCourses();
  }, []);

  // Open modal for add/edit
  const handleOpenForm = (course: Course, index: number | null = null) => {
    setSelectedCourse(course);
    setSelectedIndex(index);
    if (index !== null) {
      setCurriculumForm(course.curriculum[index]);
    } else {
      setCurriculumForm({ ...defaultCurriculum });
    }
  };

  const handleChange = (
    field: "title" | "topics" | "resources",
    value: string,
    subIndex?: number
  ) => {
    const updated = { ...curriculumForm };
    if (field === "title") {
      updated.title = value;
    } else if (field === "topics" && subIndex !== undefined) {
      updated.topics[subIndex] = value;
    } else if (field === "resources" && subIndex !== undefined) {
      updated.resources[subIndex] = value;
    }
    setCurriculumForm(updated);
  };

  const addSubField = (field: "topics" | "resources") => {
    const updated = { ...curriculumForm };
    updated[field].push("");
    setCurriculumForm(updated);
  };

  const handleSubmit = async () => {
    if (!selectedCourse) return;
    setLoading(true);

    try {
      const url =
        selectedIndex !== null
          ? `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/curriculum`
          : `${process.env.NEXT_PUBLIC_API_URL}/courses/${selectedCourse._id}/add-curriculum`;

      const method = selectedIndex !== null ? "PUT" : "POST";

      const formData = new FormData();
      formData.append("title", curriculumForm.title);
      formData.append(
        "index",
        selectedIndex !== null ? String(selectedIndex) : ""
      );

      curriculumForm.topics.forEach((t, i) =>
        formData.append(`topics[${i}]`, t)
      );
      curriculumForm.resources.forEach((r, i) => {
        if (r instanceof File) formData.append(`resources`, r); // append file
        else formData.append(`resources[${i}]`, r); // keep text if any
      });

      const res = await fetch(url, {
        method,
        body: formData, // send FormData instead of JSON
      });

      if (!res.ok) throw new Error("Failed to save curriculum");

      const updated = await res.json();
      setCourses((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c))
      );
      setSelectedCourse(null);
      setSelectedIndex(null);
      setCurriculumForm(defaultCurriculum);
      alert("✅ Curriculum saved!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save curriculum");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Courses Curriculum Dashboard</h1>

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
                  width={80} // corresponds to w-20 (20 * 4 = 80px in Tailwind)
                  height={80} // corresponds to h-20
                  className="object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-sm text-gray-400">
                    Curriculum sections: {course.curriculum.length}
                  </p>
                </div>
                <button
                  onClick={() => handleOpenForm(course)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  + Add Section
                </button>
              </div>

              {course.curriculum.length > 0 && (
                <div className="mt-3 space-y-2">
                  {course.curriculum.map((section, idx) => (
                    <div
                      key={idx}
                      className="p-3 border rounded-md bg-gray-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold">{section.title}</p>
                        <p className="text-xs text-gray-500">
                          Topics: {section.topics.join(", ")}
                        </p>
                        <p className="text-xs text-gray-500">
                          Resources: {section.resources.length - 1}
                        </p>
                      </div>
                      <button
                        onClick={() => handleOpenForm(course, idx)}
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

      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">
              {selectedIndex !== null ? "Edit Section" : "Add Section"} -{" "}
              {selectedCourse.title}
            </h2>

            <input
              type="text"
              placeholder="Section Title"
              value={curriculumForm.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border px-2 py-1 rounded mb-2"
            />

            <div className="mb-2">
              <p className="font-semibold text-sm">Topics:</p>
              {curriculumForm.topics.map((t, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Topic ${idx + 1}`}
                  value={t}
                  onChange={(e) => handleChange("topics", e.target.value, idx)}
                  className="w-full border px-2 py-1 rounded mb-1"
                />
              ))}
              <button
                onClick={() => addSubField("topics")}
                className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                + Add Topic
              </button>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-sm">Resources:</p>
              {curriculumForm.resources.map((r, idx) => (
                <input
                  key={idx}
                  type="file"
                  accept=".pdf,.zip,.doc,.docx,.ppt,.pptx" // restrict file types
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const updated = { ...curriculumForm };
                      updated.resources[idx] = e.target.files[0]; // store the File object
                      setCurriculumForm(updated);
                    }
                  }}
                  className="w-full border px-2 py-1 rounded mb-1"
                />
              ))}
              <button
                onClick={() => addSubField("resources")}
                className="px-2 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                + Add Resource
              </button>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setSelectedIndex(null);
                  setCurriculumForm(defaultCurriculum);
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
