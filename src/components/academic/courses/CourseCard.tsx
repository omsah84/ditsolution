import React from "react";
import Image from "next/image";

type Course = {
  image?: string;
  title: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  price: number;
  discountPrice?: number;
};

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }:CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer flex flex-col h-[300px] max-w-sm mx-auto">
      {/* Image + Badge */}
      <div className="relative h-36 overflow-hidden rounded-t-lg">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 300px"
            priority={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}

        {course.badge && (
          <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded select-none shadow-sm">
            {course.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 leading-snug">
          {course.title}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center text-yellow-500 mb-2 space-x-1">
          <svg
            className="w-3.5 h-3.5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.564-.955L10 0l2.946 5.955 6.564.955-4.755 4.635 1.123 6.545z" />
          </svg>
          <span className="font-semibold text-gray-800 text-xs">{course.rating.toFixed(1)}</span>
          <span className="text-gray-500 text-xs">({course.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          {course.discountPrice && course.discountPrice < course.price ? (
            <div className="flex items-center space-x-1">
              <span className="text-base font-bold text-indigo-600">${course.discountPrice}</span>
              <span className="line-through text-gray-400 text-xs">${course.price}</span>
            </div>
          ) : (
            <span className="text-base font-bold text-indigo-600">${course.price}</span>
          )}
        </div>

        {/* Enroll Button */}
        <button
         
          className=" bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded shadow transition"
          aria-label={`Enroll in ${course.title}`}
        >
          Enroll
        </button>
      </div>
    </div>
  );
}
