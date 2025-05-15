import { useState } from "react";
import { Download } from "lucide-react";

const TransactionReports = () => {
  const [dateRange, setDateRange] = useState({
    start: "2024-03-01",
    end: "2024-03-20",
  });

  const reports = [
    {
      id: 1,
      name: "March 2024 Sales Report",
      date: "2024-03-20",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "February 2024 Sales Report",
      date: "2024-02-28",
      size: "3.1 MB",
    },
    {
      id: 3,
      name: "January 2024 Sales Report",
      date: "2024-01-31",
      size: "2.8 MB",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Transaction Reports
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Generate and download transaction reports.
        </p>
      </div>

      {/* Generate Report */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-sm font-medium text-gray-700">
            Generate New Report
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-200 border focus:border-main-bg focus:ring-1 focus:ring-main-bg sm:text-sm px-4 p-2 outline-0"
              />
            </div>
          </div>
          <div className="mt-4">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-main-text hover:bg-main-text/90 cursor-pointer">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Previous Reports */}
      <div>
        <h3 className="text-sm font-medium text-gray-700">Previous Reports</h3>
        <div className="mt-4">
          <div className="overflow-hidden shadow ring-1 ring-gray-200 ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Report Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Size
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Download</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {report.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {report.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {report.size}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="text-main-text hover:text-main-text">
                        <Download className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionReports;
