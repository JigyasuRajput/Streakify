import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format, getDaysInMonth } from "date-fns";
import { PlatformSubmission } from "../types/submission";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SubmissionGraphProps {
  submissions: PlatformSubmission[];
}

const SubmissionGraph: React.FC<SubmissionGraphProps> = ({ submissions }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear] = useState(currentYear);

  const daysInMonth = getDaysInMonth(new Date(selectedYear, selectedMonth));
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const submissionsByDate = new Map<number, number>();
  submissions.forEach((sub) => {
    const date = new Date(sub.date);
    if (
      date.getFullYear() === selectedYear &&
      date.getMonth() === selectedMonth
    ) {
      const day = date.getDate();
      submissionsByDate.set(day, (submissionsByDate.get(day) || 0) + sub.count);
    }
  });

  const data = {
    labels: days,
    datasets: [
      {
        label: "Problems Solved",
        data: days.map((day) => submissionsByDate.get(day) || 0),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        tension: 0.4,
      },
    ],
  };

  console.log("SubmissionGraph submissions:", submissions);
  console.log("Submissions by date:", submissionsByDate);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Problems Solved - ${format(
          new Date(selectedYear, selectedMonth),
          "MMMM yyyy"
        )}`,
        color: "white",
        font: {
          size: 16,
          weight: "bold" as "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <div className="flex justify-end mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="bg-gray-800 text-white px-3 py-1 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {format(new Date(2000, i), "MMMM")}
            </option>
          ))}
        </select>
      </div>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SubmissionGraph;
