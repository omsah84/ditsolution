export default function Page() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-sm font-medium text-gray-500">Total Courses</h2>
          <p className="mt-2 text-2xl font-bold text-gray-900">128</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-sm font-medium text-gray-500">Active Students</h2>
          <p className="mt-2 text-2xl font-bold text-gray-900">2,342</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-sm font-medium text-gray-500">Revenue</h2>
          <p className="mt-2 text-2xl font-bold text-green-600">$12,450</p>
        </div>
      </div>

      {/* Recent Courses Table */}
      <div className="bg-white shadow rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Recent Courses</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-gray-600">Course Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Instructor</th>
              <th className="px-4 py-2 text-left text-gray-600">Enrollments</th>
              <th className="px-4 py-2 text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">React Basics</td>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">120</td>
              <td className="px-4 py-2 text-green-600 font-semibold">Active</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">Next.js Advanced</td>
              <td className="px-4 py-2">Jane Smith</td>
              <td className="px-4 py-2">75</td>
              <td className="px-4 py-2 text-yellow-600 font-semibold">
                Pending
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">TailwindCSS UI</td>
              <td className="px-4 py-2">Mike Johnson</td>
              <td className="px-4 py-2">45</td>
              <td className="px-4 py-2 text-red-600 font-semibold">Draft</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
