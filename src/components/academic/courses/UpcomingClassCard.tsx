// components/UpcomingClasses.tsx
import { CalendarClock } from "lucide-react";

const upcomingClasses = [
  {
    id: "c1",
    title: "Live Python Workshop",
    date: "Aug 15, 2025",
    time: "6:00 PM - 8:00 PM",
    instructor: "Ms. Rachel Adams",
  },
  {
    id: "c2",
    title: "JavaScript Debugging Session",
    date: "Aug 18, 2025",
    time: "3:00 PM - 5:00 PM",
    instructor: "Mr. Alex Johnson",
  },
  {
    id: "c3",
    title: "Machine Learning Q&A",
    date: "Aug 20, 2025",
    time: "7:00 PM - 8:30 PM",
    instructor: "Dr. John Doe",
  },
];

export default function UpcomingClasses() {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <CalendarClock className="w-5 h-5 text-indigo-600" />
        Upcoming Classes
      </h3>
      <ul className="space-y-4">
        {upcomingClasses.map((cls) => (
          <li key={cls.id} className="flex items-start gap-3">
            <div className="bg-indigo-100 border rounded-xl w-14 h-14 flex items-center justify-center text-indigo-600 font-bold text-sm">
              {cls.date.split(" ")[0]}<br />{cls.date.split(" ")[1]}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{cls.title}</h4>
              <p className="text-gray-600 text-sm">{cls.time}</p>
              <p className="text-gray-500 text-sm">with {cls.instructor}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
