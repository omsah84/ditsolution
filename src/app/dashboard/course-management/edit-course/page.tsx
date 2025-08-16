"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Full schema defined here
const CourseFormSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  format: z.enum(["Self-paced", "Live", "Hybrid"]),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  price: z.number().nonnegative(),
  discountPrice: z.number().nonnegative(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().nonnegative(),
  category: z.array(z.string().min(1)),
  subcategory: z.array(z.string().min(1)),
  tags: z.array(z.string().min(1)),
  language: z.array(z.string().min(1)),
  certificate: z.boolean(),
  isFeatured: z.boolean(),
  topRated: z.boolean(),
  status: z.enum(["active", "inactive"]),
  enrollmentCount: z.number().nonnegative(),
  prerequisites: z.array(z.string().min(1)),
  features: z.array(z.string().min(1)),
});

type CourseFormInputs = z.infer<typeof CourseFormSchema>;

export default function EditCourseModal() {
  const [courses, setCourses] = useState<CourseFormInputs[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<CourseFormInputs | null>(
    null
  );
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormInputs>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      format: "Self-paced",
      level: "Beginner",
      price: 0,
      discountPrice: 0,
      rating: 0,
      reviewCount: 0,
      category: [""],
      subcategory: [""],
      tags: [""],
      language: [""],
      certificate: false,
      isFeatured: false,
      topRated: false,
      status: "active",
      enrollmentCount: 0,
      prerequisites: [""],
      features: [""],
    },
  });

  // Dynamic arrays
  const categoryArray = useFieldArray({ control, name: "category" });
  const subcategoryArray = useFieldArray({ control, name: "subcategory" });
  const tagsArray = useFieldArray({ control, name: "tags" });
  const languageArray = useFieldArray({ control, name: "language" });
  const prerequisitesArray = useFieldArray({ control, name: "prerequisites" });
  const featuresArray = useFieldArray({ control, name: "features" });

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/courses"
        );
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  const openEditModal = (course: CourseFormInputs) => {
    setSelectedCourse(course);
    reset(course);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: CourseFormInputs) => {
    if (!selectedCourse) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("data", JSON.stringify(data));

    try {
      await axios.put(
        `http://localhost:8000/api/v1/courses/${selectedCourse._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSubmitSuccess(true);
      setIsModalOpen(false);

      setCourses((prev) =>
        prev.map((c) => (c.slug === selectedCourse.slug ? data : c))
      );
    } catch (err) {
      console.error("Update error:", err);
      setSubmitError("Failed to update course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Courses</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Slug</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.slug}>
              <td className="p-2 border">{course.title}</td>
              <td className="p-2 border">{course.slug}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => openEditModal(course)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50">
          <div className="bg-white w-full max-w-4xl p-6 rounded shadow-lg relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

            {submitSuccess && (
              <div className="bg-green-100 text-green-700 p-3 rounded-md mb-2">
                Course updated successfully!
              </div>
            )}
            {submitError && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md mb-2">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("slug")}
                  placeholder="Slug*"
                  className="border p-2 w-full rounded"
                  disabled
                />
                <input
                  {...register("title")}
                  placeholder="Title*"
                  className="border p-2 w-full rounded"
                  required
                />
              </div>

              <textarea
                {...register("description")}
                placeholder="Description*"
                className="border p-2 w-full rounded"
                rows={4}
                required
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="border p-2 w-full rounded"
              />

              <Controller
                name="format"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`border p-2 w-full rounded ${
                      errors.format ? "border-red-500" : ""
                    }`}
                  >
                    <option value="Self-paced">Self-paced</option>
                    <option value="Live">Live Sessions</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                )}
              />

              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <select {...field} className="border p-2 w-full rounded">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="Price"
                  className="border p-2 w-full rounded"
                />
                <input
                  type="number"
                  {...register("discountPrice", { valueAsNumber: true })}
                  placeholder="Discount Price"
                  className="border p-2 w-full rounded"
                />
              </div>

              {/* Dynamic Arrays Example */}
              <div>
                <h4 className="font-semibold">Categories</h4>
                {categoryArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <input
                      {...register(`category.${index}` as const)}
                      className="border p-2 w-full rounded"
                    />
                    <button
                      type="button"
                      onClick={() => categoryArray.remove(index)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => categoryArray.append("")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add Category
                </button>
              </div>

              {/* Repeat the same pattern for subcategory, tags, language, prerequisites, features */}
              {/* Example for tags: */}
              <div>
                <h4 className="font-semibold">Tags</h4>
                {tagsArray.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <input
                      {...register(`tags.${index}` as const)}
                      className="border p-2 w-full rounded"
                    />
                    <button
                      type="button"
                      onClick={() => tagsArray.remove(index)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => tagsArray.append("")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Add Tag
                </button>
              </div>

              {/* Checkbox fields */}
              <div className="flex gap-4 items-center">
                <label>
                  <input type="checkbox" {...register("certificate")} />
                  Certificate
                </label>
                <label>
                  <input type="checkbox" {...register("isFeatured")} />
                  Featured
                </label>
                <label>
                  <input type="checkbox" {...register("topRated")} />
                  Top Rated
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
              >
                {isSubmitting ? "Updating..." : "Update Course"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
