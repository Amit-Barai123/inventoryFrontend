
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

// Register required components
ChartJS.register(
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ChartComponent = ({ data, labels, type }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Inventory Data",
        data,
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options with adjustable height
  const options = {
    maintainAspectRatio: false, // Allow custom height
    responsive: true,
    aspectRatio: 2, // Adjust aspect ratio (width-to-height ratio)
  };

  return (
    <div style={{ height: "350px", width: "100%" }}> {/* Set custom height */}
      {type === "bar" && <Bar data={chartData} options={options} />}
      {type === "line" && <Line data={chartData} options={options} />}
      {type === "pie" && <Pie data={chartData} options={options} />}
      {type === "doughnut" && <Doughnut data={chartData} options={options} />}
    </div>
  );
};

export default ChartComponent;
