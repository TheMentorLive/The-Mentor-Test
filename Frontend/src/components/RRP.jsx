import React from 'react';
import { useNavigate } from 'react-router-dom';

const RefundPolicy = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-100 py-8 px-4 lg:px-16">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        {/* Back to Home Button */}
        <button
          onClick={handleBackToHome}
          className="mb-6 text-blue-600 hover:underline flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </button>

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Returns & Refund Policy
        </h1>

        {/* Content Section */}
        <p className="text-gray-600 mb-4">
          GenAi Learning currently offers the following services:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Mentor Training Program</li>
          <li>
            Profile Builder – Resume Making, Cover letters, Mock Interviews, Psychometric tests, LinkedIn Profile revamp
          </li>
          <li>Mentor Direct Placement Program</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          Mentor Training Program – MTP
        </h2>
        <p className="text-gray-600 mb-4">
          In order to avail of the placement assurance, candidates need to follow all the guidelines and terms provided below:
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Course Guidelines</h3>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Attend all classes as per the schedule with prior intimation for leaves.</li>
          <li>Complete all assignments and tasks within the stipulated timelines.</li>
          <li>Continuous evaluation via specialized tests and assignments.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Refund Conditions</h3>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Pre-booking fee for the first week is non-refundable.</li>
          <li>Discontinuation post 10 days of commencement qualifies for a 50% refund.</li>
          <li>Post-placement, a 5% payout of CTC to GenAi Learning is required within 2 months of placement.</li>
          <li>Non-attendance or non-participation invalidates job placement liability.</li>
          <li>Final semester students only are eligible for placements.</li>
          <li>Incorrect details at the time of enrolment may disqualify placements.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Profile Builder – Revision Policy</h3>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>One free revision is offered within 3 days of resume delivery.</li>
          <li>Changes can be requested in one mail as one revision.</li>
          <li>For new templates, purchase from the website is required.</li>
          <li>Refund can be requested within 48 hours of service delivery.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Rights of Mentor</h3>
        <p className="text-gray-600 mb-4">
          GenAi Learning reserves the right to deny refunds and take strict action against fraudulent activities. Once the refund is initiated, users cannot access the platform and any further access will result in penalties.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Refund Process</h3>
        <p className="text-gray-600 mb-4">
          Refunds are initiated via Razorpay within 7 days after approval. Requests are reviewed within 3 working days of submission.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Late or Missing Refunds</h3>
        <p className="text-gray-600 mb-4">
          If you haven’t received your refund yet, please check with your bank and credit card company. If the issue persists, contact us at <a href="mailto:livethementor@gmail.com" className="text-blue-600 hover:underline">livethementor@gmail.com</a> or <a href="mailto:support@genailearning.in" className="text-blue-600 hover:underline">support@genailearning.in</a>.
        </p>
      </div>
    </div>
  );
};

export default RefundPolicy;
