// AdminLandingPage.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the chart.js library

const AdminLandingPage = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Users */}
        <StatCard title="Total Users" value="2,540" />

        {/* Total Revenue */}
        <StatCard title="Total Revenue" value="$120,000" />

        {/* Monthly Sales */}
        <StatCard title="Monthly Sales" value="1,450" />

        {/* Total Sales */}
        <StatCard title="Total Sales" value="8,340" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded-lg h-[400px] flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Sales Bar Chart</h2>
          <div className="flex-1">
            <BarChart />
          </div>
        </div>
        <div className="p-4 bg-white shadow rounded-lg h-[400px] flex flex-col">
          <h2 className="text-xl font-semibold mb-4">Revenue Distribution</h2>
          <div className="flex-1 flex items-center justify-center">
            <DonutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="h-full">
      <Bar data={data} options={{ responsive: true, maintainAspectRatio: true }} />
    </div>
  );
};

const DonutChart = () => {
  const data = {
    labels: ['Group A', 'Group B', 'Group C', 'Group D'],
    datasets: [
      {
        data: [300, 50, 100, 40],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
    cutout: '70%', // Decrease the size of the center hole
  };

  return (
    <div className="w-full max-w-[300px] h-[300px]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default AdminLandingPage;
