"use client";

import { useState } from "react";
import axios from "axios";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Improved Zod schema with better error messages
const CourseFormSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  duration: z.string().optional(),
  format: z.string().min(1, "Format is required"),
  level: z.string().min(1, "Level is required"),
  price: z.number().min(0, "Price must be positive"),
  discountPrice: z
    .number()
    .min(0, "Discount price must be positive")
    .optional(),
  rating: z.number().min(0).max(5, "Rating must be between 0-5").optional(),
  reviewCount: z.number().min(0, "Review count must be positive").optional(),
  badge: z.string().optional(),
  category: z.array(z.string()).min(1, "At least one category is required"),
  subcategory: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  language: z.array(z.string()).min(1, "At least one language is required"),
  publishedDate: z.string().optional(),
  updatedDate: z.string().optional(),
  enrollmentCount: z
    .number()
    .min(0, "Enrollment count must be positive")
    .optional(),
  prerequisites: z.array(z.string()).optional(),
  certificate: z.boolean().optional(),
  courseUrl: z.string().url("Invalid URL format").optional(),
  features: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  topRated: z.boolean().optional(),
  status: z.enum(["active", "inactive"]),
});

type CourseFormInputs = z.infer<typeof CourseFormSchema>;

// Define array field names for type safety
type ArrayFieldNames = 
  | "category"
  | "subcategory"
  | "tags"
  | "language"
  | "prerequisites"
  | "features";

export default function CourseForm() {
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
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
      language: [""],
      certificate: false,
      isFeatured: false,
      topRated: false,
      status: "active",
      enrollmentCount: 0,
      subcategory: [],
      tags: [],
      prerequisites: [],
      features: [],
    },
  });

  // Field arrays for dynamic inputs with proper typing
  const categoryArray = useFieldArray({ control, name: "category" as ArrayFieldNames });
  const subcategoryArray = useFieldArray({ control, name: "subcategory" as ArrayFieldNames });
  const tagsArray = useFieldArray({ control, name: "tags" as ArrayFieldNames });
  const languageArray = useFieldArray({ control, name: "language" as ArrayFieldNames });
  const prerequisitesArray = useFieldArray({ control, name: "prerequisites" as ArrayFieldNames });
  const featuresArray = useFieldArray({ control, name: "features" as ArrayFieldNames });

  const onSubmit = async (data: CourseFormInputs) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("data", JSON.stringify(data));

    try {
      await axios.post("http://localhost:8000/api/v1/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Failed to create course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced dynamic field renderer with type safety
  const renderArrayField = (
    fields: { id: string }[],
    append: () => void,
    remove: (index: number) => void,
    fieldName: ArrayFieldNames,
    label: string,
    placeholder: string,
    minItems: number = 0
  ) => (
    <div className="mb-4">
      <label className="block font-semibold mb-2">{label}</label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <input
            {...register(`${fieldName}.${index}` as const)}
            placeholder={`${placeholder} ${index + 1}`}
            className="border p-2 flex-1 rounded"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            disabled={fields.length <= minItems}
            className={`bg-red-500 text-white px-3 rounded ${
              fields.length <= minItems ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append("")}
        className="bg-gray-200 px-3 py-1 rounded text-sm mt-1 hover:bg-gray-300"
      >
        + Add {label}
      </button>
      {errors[fieldName] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[fieldName] as any)?.message?.toString()}
        </p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h2>

      {/* Submission Status Feedback */}
      {submitSuccess && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md">
          Course created successfully!
        </div>
      )}
      {submitError && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md">
          {submitError}
        </div>
      )}

      <div className="space-y-6">
        {/* Basic Information Section */}
        <section className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "slug", placeholder: "Unique Slug*", required: true },
              { name: "title", placeholder: "Course Title*", required: true },
            ].map((field) => (
              <div key={field.name}>
                <input
                  {...register(field.name as keyof CourseFormInputs)}
                  placeholder={field.placeholder}
                  className={`border p-2 w-full rounded ${
                    errors[field.name as keyof CourseFormInputs]
                      ? "border-red-500"
                      : ""
                  }`}
                  required={field.required}
                />
                {errors[field.name as keyof CourseFormInputs] && (
                  <p className="text-red-500 text-sm mt-1">
                    {(errors[field.name as keyof CourseFormInputs] as any)?.message?.toString()}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <input
              {...register("subtitle")}
              placeholder="Subtitle"
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="mt-4">
            <textarea
              {...register("description")}
              placeholder="Course Description*"
              className={`border p-2 w-full rounded ${
                errors.description ? "border-red-500" : ""
              }`}
              rows={4}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </section>

        {/* Media Section */}
        <section className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Media
          </h3>
          
          <div>
            <label className="block font-semibold mb-2">Course Image*</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="border p-2 w-full rounded"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Recommended size: 1200x600 pixels
            </p>
          </div>
        </section>

        {/* Course Details Section */}
        <section className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Course Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Duration</label>
              <input
                {...register("duration")}
                placeholder="e.g., 10 weeks"
                className="border p-2 w-full rounded"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2">Format*</label>
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
              {errors.format && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.format.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block font-semibold mb-2">Level*</label>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`border p-2 w-full rounded ${
                      errors.level ? "border-red-500" : ""
                    }`}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                )}
              />
              {errors.level && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.level.message}
                </p>
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Price ($)*</label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className={`border p-2 w-full rounded ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block font-semibold mb-2">
                Discount Price ($)
              </label>
              <input
                type="number"
                {...register("discountPrice", { valueAsNumber: true })}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
        </section>

        {/* Categories & Tags Section */}
        <section className="border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Categorization
          </h3>
          
          {renderArrayField(
            categoryArray.fields,
            () => categoryArray.append(""),
            categoryArray.remove,
            "category",
            "Categories*",
            "Category",
            1
          )}

          {renderArrayField(
            subcategoryArray.fields,
            () => subcategoryArray.append(""),
            subcategoryArray.remove,
            "subcategory",
            "Subcategories",
            "Subcategory"
          )}

          {renderArrayField(
            tagsArray.fields,
            () => tagsArray.append(""),
            tagsArray.remove,
            "tags",
            "Tags",
            "Tag"
          )}

          {renderArrayField(
            languageArray.fields,
            () => languageArray.append(""),
            languageArray.remove,
            "language",
            "Languages*",
            "Language",
            1
          )}
        </section>

        {/* Additional Information Section */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Additional Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                {...register("rating", { valueAsNumber: true })}
                className="border p-2 w-full rounded"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2">Review Count</label>
              <input
                type="number"
                {...register("reviewCount", { valueAsNumber: true })}
                className="border p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-2">Badge</label>
            <input
              {...register("badge")}
              placeholder="e.g., 'Bestseller'"
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-2">Course URL</label>
            <input
              {...register("courseUrl")}
              placeholder="https://example.com/course"
              className={`border p-2 w-full rounded ${
                errors.courseUrl ? "border-red-500" : ""
              }`}
            />
            {errors.courseUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.courseUrl.message}
              </p>
            )}
          </div>

          {renderArrayField(
            prerequisitesArray.fields,
            () => prerequisitesArray.append(""),
            prerequisitesArray.remove,
            "prerequisites",
            "Prerequisites",
            "Prerequisite"
          )}

          {renderArrayField(
            featuresArray.fields,
            () => featuresArray.append(""),
            featuresArray.remove,
            "features",
            "Features",
            "Feature"
          )}

          <div className="flex flex-wrap gap-6 mt-4">
            <div>
              <label className="flex items-center gap-2">
                <Controller
                  name="certificate"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-5 w-5 text-blue-600"
                    />
                  )}
                />
                Certificate Included
              </label>
            </div>
            
            <div>
              <label className="flex items-center gap-2">
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-5 w-5 text-blue-600"
                    />
                  )}
                />
                Featured Course
              </label>
            </div>
            
            <div>
              <label className="flex items-center gap-2">
                <Controller
                  name="topRated"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-5 w-5 text-blue-600"
                    />
                  )}
                />
                Top Rated
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-2">Status*</label>
            <select
              {...register("status")}
              className="border p-2 w-full rounded md:w-1/3"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </section>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Creating Course..." : "Create Course"}
      </button>
    </form>
  );
}













































































// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// // Improved Zod schema with better error messages
// const CourseFormSchema = z.object({
//   slug: z.string().min(1, "Slug is required"),
//   title: z.string().min(1, "Title is required"),
//   subtitle: z.string().optional(),
//   description: z.string().min(1, "Description is required"),
//   duration: z.string().optional(),
//   format: z.string().min(1, "Format is required"), // Changed to single string
//   level: z.string().min(1, "Level is required"),    // Changed to single string
//   price: z.number().min(0, "Price must be positive"),
//   discountPrice: z
//     .number()
//     .min(0, "Discount price must be positive")
//     .optional(),
//   rating: z.number().min(0).max(5, "Rating must be between 0-5").optional(),
//   reviewCount: z.number().min(0, "Review count must be positive").optional(),
//   badge: z.string().optional(),
//   category: z.array(z.string()).min(1, "At least one category is required"),
//   subcategory: z.array(z.string()).optional(),
//   tags: z.array(z.string()).optional(),
//   language: z.array(z.string()).min(1, "At least one language is required"),
//   publishedDate: z.string().optional(),
//   updatedDate: z.string().optional(),
//   enrollmentCount: z
//     .number()
//     .min(0, "Enrollment count must be positive")
//     .optional(),
//   prerequisites: z.array(z.string()).optional(),
//   certificate: z.boolean().optional(),
//   courseUrl: z.string().url("Invalid URL format").optional(),
//   features: z.array(z.string()).optional(),
//   isFeatured: z.boolean().optional(),
//   topRated: z.boolean().optional(),
//   status: z.enum(["active", "inactive"]),
// });

// type CourseFormInputs = z.infer<typeof CourseFormSchema>;

// export default function CourseForm() {
//   const [image, setImage] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState<string | null>(null);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CourseFormInputs>({
//     resolver: zodResolver(CourseFormSchema),
//     defaultValues: {
//       format: "Self-paced",
//       level: "Beginner",
//       price: 0,
//       discountPrice: 0,
//       rating: 0,
//       reviewCount: 0,
//       category: [""],
//       language: [""],
//       certificate: false,
//       isFeatured: false,
//       topRated: false,
//       status: "active",
//       enrollmentCount: 0,
//       subcategory: [],
//       tags: [],
//       prerequisites: [],
//       features: [],
//     },
//   });

//   // Field arrays for dynamic inputs
//   const categoryArray = useFieldArray({ control, name: "category" });
//   const subcategoryArray = useFieldArray({ control, name: "subcategory" });
//   const tagsArray = useFieldArray({ control, name: "tags" });
//   const languageArray = useFieldArray({ control, name: "language" });
//   const prerequisitesArray = useFieldArray({ control, name: "prerequisites" });
//   const featuresArray = useFieldArray({ control, name: "features" });


//   const onSubmit = async (data: CourseFormInputs) => {
//     setIsSubmitting(true);
//     setSubmitError(null);
//     setSubmitSuccess(false);
    
//     const formData = new FormData();
//     if (image) formData.append("image", image);
//     formData.append("data", JSON.stringify(data));

//     try {
//       await axios.post("http://localhost:8000/api/v1/courses", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setSubmitSuccess(true);
//     } catch (err) {
//       console.error("Submission error:", err);
//       setSubmitError("Failed to create course. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Improved dynamic field renderer with type safety
//   const renderArrayField = (
//     fields: { id: string }[],
//     append: () => void,
//     remove: (index: number) => void,
//     fieldName: keyof CourseFormInputs,
//     label: string,
//     placeholder: string,
//     minItems: number = 0
//   ) => (
//     <div className="mb-4">
//       <label className="block font-semibold mb-2">{label}</label>
//       {fields.map((field, index) => (
//         <div key={field.id} className="flex gap-2 mb-2">
//           <input
//             {...register(`${fieldName}.${index}` as const)}
//             placeholder={`${placeholder} ${index + 1}`}
//             className="border p-2 flex-1 rounded"
//           />
//           <button
//             type="button"
//             onClick={() => remove(index)}
//             disabled={fields.length <= minItems}
//             className={`bg-red-500 text-white px-3 rounded ${
//               fields.length <= minItems ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             ×
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() => append("")}
//         className="bg-gray-200 px-3 py-1 rounded text-sm mt-1 hover:bg-gray-300"
//       >
//         + Add {label}
//       </button>
//       {errors[fieldName] && (
//         <p className="text-red-500 text-sm mt-1">
//           {errors[fieldName]?.message?.toString()}
//         </p>
//       )}
//     </div>
//   );

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Course</h2>

//       {/* Submission Status Feedback */}
//       {submitSuccess && (
//         <div className="bg-green-100 text-green-700 p-3 rounded-md">
//           Course created successfully!
//         </div>
//       )}
//       {submitError && (
//         <div className="bg-red-100 text-red-700 p-3 rounded-md">
//           {submitError}
//         </div>
//       )}

//       <div className="space-y-6">
//         {/* Basic Information Section */}
//         <section className="border-b pb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             Basic Information
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[
//               { name: "slug", placeholder: "Unique Slug*", required: true },
//               { name: "title", placeholder: "Course Title*", required: true },
//             ].map((field) => (
//               <div key={field.name}>
//                 <input
//                   {...register(field.name as keyof CourseFormInputs)}
//                   placeholder={field.placeholder}
//                   className={`border p-2 w-full rounded ${
//                     errors[field.name as keyof CourseFormInputs]
//                       ? "border-red-500"
//                       : ""
//                   }`}
//                   required={field.required}
//                 />
//                 {errors[field.name as keyof CourseFormInputs] && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors[field.name as keyof CourseFormInputs]?.message?.toString()}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-4">
//             <input
//               {...register("subtitle")}
//               placeholder="Subtitle"
//               className="border p-2 w-full rounded"
//             />
//           </div>

//           <div className="mt-4">
//             <textarea
//               {...register("description")}
//               placeholder="Course Description*"
//               className={`border p-2 w-full rounded ${
//                 errors.description ? "border-red-500" : ""
//               }`}
//               rows={4}
//               required
//             />
//             {errors.description && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>
//         </section>

//         {/* Media Section */}
//         <section className="border-b pb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             Media
//           </h3>
          
//           <div>
//             <label className="block font-semibold mb-2">Course Image*</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files?.[0] || null)}
//               className="border p-2 w-full rounded"
//               required
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               Recommended size: 1200x600 pixels
//             </p>
//           </div>
//         </section>

//         {/* Course Details Section */}
//         <section className="border-b pb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             Course Details
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block font-semibold mb-2">Duration</label>
//               <input
//                 {...register("duration")}
//                 placeholder="e.g., 10 weeks"
//                 className="border p-2 w-full rounded"
//               />
//             </div>
            
//             <div>
//               <label className="block font-semibold mb-2">Format*</label>
//               <Controller
//                 name="format"
//                 control={control}
//                 render={({ field }) => (
//                   <select
//                     {...field}
//                     className={`border p-2 w-full rounded ${
//                       errors.format ? "border-red-500" : ""
//                     }`}
//                   >
//                     <option value="Self-paced">Self-paced</option>
//                     <option value="Live">Live Sessions</option>
//                     <option value="Hybrid">Hybrid</option>
//                   </select>
//                 )}
//               />
//               {errors.format && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.format.message}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <label className="block font-semibold mb-2">Level*</label>
//               <Controller
//                 name="level"
//                 control={control}
//                 render={({ field }) => (
//                   <select
//                     {...field}
//                     className={`border p-2 w-full rounded ${
//                       errors.level ? "border-red-500" : ""
//                     }`}
//                   >
//                     <option value="Beginner">Beginner</option>
//                     <option value="Intermediate">Intermediate</option>
//                     <option value="Advanced">Advanced</option>
//                   </select>
//                 )}
//               />
//               {errors.level && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.level.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Pricing Section */}
//           <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block font-semibold mb-2">Price ($)*</label>
//               <input
//                 type="number"
//                 {...register("price", { valueAsNumber: true })}
//                 className={`border p-2 w-full rounded ${
//                   errors.price ? "border-red-500" : ""
//                 }`}
//               />
//               {errors.price && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.price.message}
//                 </p>
//               )}
//             </div>
            
//             <div>
//               <label className="block font-semibold mb-2">
//                 Discount Price ($)
//               </label>
//               <input
//                 type="number"
//                 {...register("discountPrice", { valueAsNumber: true })}
//                 className="border p-2 w-full rounded"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Categories & Tags Section */}
//         <section className="border-b pb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             Categorization
//           </h3>
          
//           {renderArrayField(
//             categoryArray.fields,
//             () => categoryArray.append(""),
//             categoryArray.remove,
//             "category",
//             "Categories*",
//             "Category",
//             1
//           )}

//           {renderArrayField(
//             subcategoryArray.fields,
//             () => subcategoryArray.append(""),
//             subcategoryArray.remove,
//             "subcategory",
//             "Subcategories",
//             "Subcategory"
//           )}

//           {renderArrayField(
//             tagsArray.fields,
//             () => tagsArray.append(""),
//             tagsArray.remove,
//             "tags",
//             "Tags",
//             "Tag"
//           )}

//           {renderArrayField(
//             languageArray.fields,
//             () => languageArray.append(""),
//             languageArray.remove,
//             "language",
//             "Languages*",
//             "Language",
//             1
//           )}
//         </section>

//         {/* Additional Information Section */}
//         <section>
//           <h3 className="text-xl font-semibold text-gray-700 mb-4">
//             Additional Information
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block font-semibold mb-2">Rating (0-5)</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 min="0"
//                 max="5"
//                 {...register("rating", { valueAsNumber: true })}
//                 className="border p-2 w-full rounded"
//               />
//             </div>
            
//             <div>
//               <label className="block font-semibold mb-2">Review Count</label>
//               <input
//                 type="number"
//                 {...register("reviewCount", { valueAsNumber: true })}
//                 className="border p-2 w-full rounded"
//               />
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="block font-semibold mb-2">Badge</label>
//             <input
//               {...register("badge")}
//               placeholder="e.g., 'Bestseller'"
//               className="border p-2 w-full rounded"
//             />
//           </div>

//           <div className="mt-4">
//             <label className="block font-semibold mb-2">Course URL</label>
//             <input
//               {...register("courseUrl")}
//               placeholder="https://example.com/course"
//               className={`border p-2 w-full rounded ${
//                 errors.courseUrl ? "border-red-500" : ""
//               }`}
//             />
//             {errors.courseUrl && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.courseUrl.message}
//               </p>
//             )}
//           </div>

//           {renderArrayField(
//             prerequisitesArray.fields,
//             () => prerequisitesArray.append(""),
//             prerequisitesArray.remove,
//             "prerequisites",
//             "Prerequisites",
//             "Prerequisite"
//           )}

//           {renderArrayField(
//             featuresArray.fields,
//             () => featuresArray.append(""),
//             featuresArray.remove,
//             "features",
//             "Features",
//             "Feature"
//           )}

//           <div className="flex flex-wrap gap-6 mt-4">
//             <div>
//               <label className="flex items-center gap-2">
//                 <Controller
//                   name="certificate"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       type="checkbox"
//                       checked={field.value}
//                       onChange={field.onChange}
//                       className="h-5 w-5 text-blue-600"
//                     />
//                   )}
//                 />
//                 Certificate Included
//               </label>
//             </div>
            
//             <div>
//               <label className="flex items-center gap-2">
//                 <Controller
//                   name="isFeatured"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       type="checkbox"
//                       checked={field.value}
//                       onChange={field.onChange}
//                       className="h-5 w-5 text-blue-600"
//                     />
//                   )}
//                 />
//                 Featured Course
//               </label>
//             </div>
            
//             <div>
//               <label className="flex items-center gap-2">
//                 <Controller
//                   name="topRated"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       type="checkbox"
//                       checked={field.value}
//                       onChange={field.onChange}
//                       className="h-5 w-5 text-blue-600"
//                     />
//                   )}
//                 />
//                 Top Rated
//               </label>
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="block font-semibold mb-2">Status*</label>
//             <select
//               {...register("status")}
//               className="border p-2 w-full rounded md:w-1/3"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//         </section>
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className={`bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition w-full ${
//           isSubmitting ? "opacity-70 cursor-not-allowed" : ""
//         }`}
//       >
//         {isSubmitting ? "Creating Course..." : "Create Course"}
//       </button>
//     </form>
//   );
// }