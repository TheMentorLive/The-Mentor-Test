// import React from 'react';
// import { Bar, Radar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadarElement, PointElement, Tooltip, Legend } from 'chart.js';

// // Register necessary components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   RadarElement,
//   PointElement,
//   Tooltip,
//   Legend
// );

// // BarChart Component
// export const BarChartChart = (props) => {
//   const data = {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [
//       {
//         label: "Desktop",
//         data: [186, 305, 237, 73, 209, 214],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Bar data={data} options={options} {...props} />;
// };

// // RadarChart Component
// export const RadarChartChart = (props) => {
//   const data = {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [
//       {
//         label: "Desktop",
//         data: [186, 305, 237, 273, 209, 214],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         pointBackgroundColor: 'rgba(75, 192, 192, 1)',
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
//         },
//       },
//     },
//   };

//   return <Radar data={data} options={options} {...props} />;
// };
