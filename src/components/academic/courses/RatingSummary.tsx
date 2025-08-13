"use client";

import CoursesData from "@/context/data/data.json";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import React from "react";

export default function RatingSummary() {
  // Count courses per rounded rating
  const ratingCounts: Record<string, number> = {};
  CoursesData.forEach((course) => {
    const rounded = (Math.round(Number(course.rating) * 2) / 2).toFixed(1);
    if (!ratingCounts[rounded]) ratingCounts[rounded] = 0;
    ratingCounts[rounded]++;
  });

  const sortedRatings = Object.keys(ratingCounts)
    .sort((a, b) => Number(b) - Number(a));

  const maxCount = Math.max(...Object.values(ratingCounts));

  return (
    <section className="mb-16 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        📊 Course Ratings Breakdown
      </h2>

      <div className="max-w-xl mx-auto space-y-4">
        {sortedRatings.map((rating) => {
          const count = ratingCounts[rating];
          const filledStars = Math.floor(Number(rating));
          const halfStar = Number(rating) % 1 !== 0;
          const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

          return (
            <div key={rating} className="flex items-center space-x-4">
              {/* Star display */}
              <div className="flex min-w-[110px]">
                {Array(filledStars)
                  .fill(0)
                  .map((_, i) => (
                    <StarIcon key={`full-${i}`} className="w-5 h-5 text-yellow-500" />
                  ))}
                {halfStar && (
                  <StarIcon className="w-5 h-5 text-yellow-400 opacity-70" />
                )}
                {Array(emptyStars)
                  .fill(0)
                  .map((_, i) => (
                    <StarOutline key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
                  ))}
              </div>

              {/* Bar & count */}
              <div className="flex-1 h-3 bg-gray-100 rounded-full relative overflow-hidden">
                <div
                  className="h-full bg-indigo-500"
                  style={{
                    width: `${(count / maxCount) * 100}%`,
                  }}
                />
              </div>

              {/* Count */}
              <div className="min-w-[50px] text-sm text-gray-700 text-right">
                {count}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
