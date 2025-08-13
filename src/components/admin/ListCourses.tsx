// src/components/AddCourse.jsx
import { useState, useRef } from "react";

const initialCurriculumItem = { title: "", topics: [""] };

export default function AddCourse() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: null, // Changed to store file object
    imagePreview: "", // Added for preview
    instructor: "",
    instructorTitle: "",
    instructorRating: 0,
    instructorExperience: "",
    duration: "",
    format: "",
    price: 0,
    discountPrice: 0,
    rating: 0,
    reviewCount: 0,
    badge: "",
    category: [],
    subcategory: [],
    level: "",
    language: "",
    publishedDate: "",
    enrollmentCount: 0,
    studentCount: "",
    prerequisites: [],
    certificate: false,
    courseUrl: "",
    curriculum: [initialCurriculumItem],
    features: [],
    filters: [],
  });

  const fileInputRef = useRef(null);

  // Handle simple text / number inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle adding/removing items from array fields
  const handleArrayChange = (name, value, index) => {
    const arr = [...form[name]];
    arr[index] = value;
    setForm((prev) => ({ ...prev, [name]: arr }));
  };

  const addArrayItem = (name, defaultValue = "") => {
    setForm((prev) => ({ ...prev, [name]: [...prev[name], defaultValue] }));
  };

  const removeArrayItem = (name, index) => {
    const arr = [...form[name]];
    arr.splice(index, 1);
    setForm((prev) => ({ ...prev, [name]: arr }));
  };

  // Curriculum handlers
  const handleCurriculumTitleChange = (index, value) => {
    const curriculum = [...form.curriculum];
    curriculum[index].title = value;
    setForm((prev) => ({ ...prev, curriculum }));
  };

  const handleCurriculumTopicChange = (cIndex, tIndex, value) => {
    const curriculum = [...form.curriculum];
    curriculum[cIndex].topics[tIndex] = value;
    setForm((prev) => ({ ...prev, curriculum }));
  };

  const addCurriculumTopic = (cIndex) => {
    const curriculum = [...form.curriculum];
    curriculum[cIndex].topics.push("");
    setForm((prev) => ({ ...prev, curriculum }));
  };

  const removeCurriculumTopic = (cIndex, tIndex) => {
    const curriculum = [...form.curriculum];
    curriculum[cIndex].topics.splice(tIndex, 1);
    setForm((prev) => ({ ...prev, curriculum }));
  };

  const addCurriculumItem = () => {
    setForm((prev) => ({
      ...prev,
      curriculum: [...prev.curriculum, { title: "", topics: [""] }],
    }));
  };

  const removeCurriculumItem = (index) => {
    const curriculum = [...form.curriculum];
    curriculum.splice(index, 1);
    setForm((prev) => ({ ...prev, curriculum }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create FormData to handle file uploads
    const formData = new FormData();
    
    // Append all form data
    Object.entries(form).forEach(([key, value]) => {
      if (key === "curriculum") {
        // Stringify complex objects
        formData.append(key, JSON.stringify(value));
      } else if (key === "image") {
        // Append the image file
        if (value) formData.append("image", value);
      } else if (Array.isArray(value)) {
        // Append arrays as JSON strings
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    
    // For demo purposes, we'll log the formData entries
    // eslint-disable-next-line prefer-const
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    // In a real app, you would send formData to your API
    alert("Course data ready for upload. Check console for details.");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Create New Course</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Information Section */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Course Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter course title"
              />
            </div>

            {/* Subtitle */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter course subtitle"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={3}
                placeholder="Describe the course in detail..."
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Image</label>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                {/* Image Preview */}
                <div className="relative w-full sm:w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {form.imagePreview ? (
                    <img 
                      src={form.imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-2 text-sm">No image selected</p>
                    </div>
                  )}
                </div>
                
                {/* Upload Controls */}
                <div className="flex-1 space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Choose Image
                  </button>
                  
                  {form.image && (
                    <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">Selected file: {form.image.name}</p>
                      <p className="text-xs">{(form.image.size / 1024).toFixed(2)} KB</p>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    Recommended size: 800×450px (16:9 aspect ratio). 
                    Supports JPG, PNG formats up to 5MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Duration & Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 6 weeks"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
              <input
                type="text"
                name="format"
                value={form.format}
                onChange={handleChange}
                placeholder="e.g. Pre-recorded"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Level & Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <input
                type="text"
                name="language"
                value={form.language}
                onChange={handleChange}
                placeholder="e.g. English"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Category & Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category (comma separated)</label>
              <input
                type="text"
                name="category"
                value={form.category.join(", ")}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    category: e.target.value.split(",").map((c) => c.trim()),
                  }))
                }
                placeholder="Development, Design"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory (comma separated)</label>
              <input
                type="text"
                name="subcategory"
                value={form.subcategory.join(", ")}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    subcategory: e.target.value.split(",").map((c) => c.trim()),
                  }))
                }
                placeholder="AI, Machine Learning"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Ratings Section */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Pricing & Ratings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price & Discount Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price ($)</label>
              <input
                type="number"
                name="discountPrice"
                value={form.discountPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Rating & Review Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Rating (0-5)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <div className="text-yellow-500 text-xl">★</div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Review Count</label>
              <input
                type="number"
                name="reviewCount"
                value={form.reviewCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Badge */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
              <input
                type="text"
                name="badge"
                value={form.badge}
                onChange={handleChange}
                placeholder="e.g. Best Seller"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Enrollment & Student Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Count</label>
              <input
                type="number"
                name="enrollmentCount"
                value={form.enrollmentCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Count</label>
              <input
                type="text"
                name="studentCount"
                value={form.studentCount}
                onChange={handleChange}
                placeholder="e.g. 1200+"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Instructor Section */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Instructor Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instructor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
              <input
                type="text"
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
            
            {/* Instructor Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Title</label>
              <input
                type="text"
                name="instructorTitle"
                value={form.instructorTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Instructor Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Rating (0-5)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  name="instructorRating"
                  value={form.instructorRating}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <div className="text-yellow-500 text-xl">★</div>
              </div>
            </div>
            
            {/* Published Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
              <input
                type="date"
                name="publishedDate"
                value={form.publishedDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Instructor Experience */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Experience</label>
              <textarea
                name="instructorExperience"
                value={form.instructorExperience}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Course Details</h3>
          
          <div className="space-y-6">
            {/* Prerequisites */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prerequisites</label>
              {form.prerequisites.map((item, i) => (
                <div key={i} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange("prerequisites", e.target.value, i)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Prerequisite"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("prerequisites", i)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("prerequisites")}
                className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
              >
                + Add Prerequisite
              </button>
            </div>

            {/* Certificate */}
            <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
              <input
                type="checkbox"
                name="certificate"
                checked={form.certificate}
                onChange={handleChange}
                id="certificate"
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="certificate" className="text-sm font-medium text-gray-700">
                Certificate of Completion
              </label>
            </div>

            {/* Course URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Video URL (embed)</label>
              <input
                type="text"
                name="courseUrl"
                value={form.courseUrl}
                onChange={handleChange}
                placeholder="YouTube embed URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
              <input
                type="text"
                name="features"
                value={form.features.join(", ")}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    features: e.target.value.split(",").map((f) => f.trim()),
                  }))
                }
                placeholder="Lifetime Access, Online & Self-Paced, Certificate of Completion"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filters (comma separated)</label>
              <input
                type="text"
                name="filters"
                value={form.filters.join(", ")}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    filters: e.target.value.split(",").map((f) => f.trim()),
                  }))
                }
                placeholder="isFeatured, topRated"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Curriculum</h3>
          
          {form.curriculum.map((item, i) => (
            <div key={i} className="mb-6 border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                <h4 className="text-sm font-medium text-gray-500">Section {i + 1}</h4>
                {form.curriculum.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCurriculumItem(i)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition"
                  >
                    Remove Section
                  </button>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  placeholder="Section Title"
                  value={item.title}
                  onChange={(e) => handleCurriculumTitleChange(i, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topics</label>
                {item.topics.map((topic, tIndex) => (
                  <div key={tIndex} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder={`Topic ${tIndex + 1}`}
                      value={topic}
                      onChange={(e) =>
                        handleCurriculumTopicChange(i, tIndex, e.target.value)
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    {item.topics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCurriculumTopic(i, tIndex)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addCurriculumTopic(i)}
                  className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                >
                  + Add Topic
                </button>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addCurriculumItem}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            Add New Section
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            type="button"
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
}