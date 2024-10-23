import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Redirect to homepage
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Terms and Conditions
        </h1>

        <p className="text-gray-600 mb-4">
          These terms and conditions (“Agreement”) set forth the general terms and conditions of your use of the <strong>thementor.live</strong> website (“Website” or “Service”) and any of its related products and services (collectively, “Services”). This Agreement is legally binding between you (“User”, “you” or “your”) and this Website operator (“Operator”, “we”, “us” or “our”).
        </p>

        <p className="text-gray-600 mb-4">
          If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such an entity to this agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services.
        </p>

        <p className="text-gray-600 mb-4">
          By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and the Operator, even though it is electronic and is not physically signed by you, and it governs your use of the Website and Services.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Academic Programme</h2>
        <p className="text-gray-600 mb-4">
          Team Mentor provides professional training courses. After the completion of the course, certificates shall be provided to the top 10% performers, provided their overall score is more than 85%. The certificate courses shall comprise of textual/video materials/exams and/or other components as decided by the course provider. Team Mentor shall provide the soft copy of learning content to the students during the duration of their course. The payment of the course shall be made fully or on an installment basis. The duration of the course and the access of content of the different courses shall be provided in the following manner:
        </p>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Training and Placement: 4 months</li>
          <li>Training: 2 months</li>
          <li>Placement: 2 months</li>
        </ul>

        <p className="text-gray-600 mb-4">
          The content is licensed only to the student of the course, and sharing of login details with any other person is not permitted. Any such attempt will lead to immediate removal from the course notwithstanding anything else in this agreement. In order to enroll for the courses, an entrance exam has to be given for the training course whereas an interview needs to be given for the placement course. The user needs to secure at least 65% marks. The class attendance shall be marked on a daily basis, and students must have at least 75% attendance to be eligible to participate in the placement offer. Missing 3 consecutive classes shall result in the payment of a penalty of Rs.500/-.
        </p>
        
        <p className="text-gray-600 mb-4">
          Students need to submit assignments within the deadlines given. Failing to submit 3 consecutive assignments shall result in the payment of a penalty of Rs.500/-.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Termination</h2>
        <p className="text-gray-600 mb-4">
          Team Mentor owns the rights to terminate the MTP program (without any refund) under the following conditions:
        </p>
        <ul className="list-disc ml-6 text-gray-600 mb-4">
          <li>Failure to attend classes without prior notice or communication for 2 consecutive classes.</li>
          <li>Failure to adhere to the decorum and timeliness of the class.</li>
          <li>Failure to solve any practice assignments or tests.</li>
        </ul>

        <p className="text-gray-600 mb-4">
          There will be continuous evaluation of students through specialized tests and assignments. Failing students may be recommended better career options or offered an extension of the course, which would be chargeable as per the duration of the extension.
        </p>
        <p className="text-gray-600 mb-4">
          The fees once paid are not refundable under any circumstances. Post placement, candidates would be liable for a 5% payout of their CTC to Team Mentor within 2 months of the confirmation of placement.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          To the fullest extent permitted by applicable law, in no event will the Operator, its affiliates, directors, officers, employees, agents, suppliers, or licensors be liable to any person for any indirect, incidental, special, punitive, or consequential damages, including, without limitation, damages for lost profits, revenue, or sales. To the maximum extent permitted by law, the aggregate liability of the Operator and its affiliates relating to the services will be limited to an amount no greater than one dollar or any amounts actually paid in cash by you to the Operator for the prior one month period.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Changes and Amendments</h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify this Agreement or its terms at any time. When we do, we will post a notification on the main page of the Website and may send you an email. An updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Jurisdiction</h2>
        <p className="text-gray-600 mb-4">
          All disputes arising out of these terms and conditions and use of MTP Services or Courses will be resolved exclusively by the courts in Bengaluru, excluding all other courts.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Disclaimer</h2>
        <p className="text-gray-600 mb-4">
          Team Mentor is not a university and is not affiliated with any recognized institution. Team Mentor offers various skill-based online courses as specified in the course details.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Acceptance of the Terms</h2>
        <p className="text-gray-600 mb-4">
          You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Website and Services, you agree to be bound by this Agreement.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions, concerns, or complaints regarding this Agreement, feel free to contact us via our website: <a href="https://thementor.live/contact/" className="text-blue-500">https://thementor.live/contact/</a> or by email at: <a href="mailto:support@thementor.live" className="text-blue-500">support@thementor.live</a>
        </p>

        <p className="text-gray-500 text-sm mt-8 text-center">Last updated: October 23, 2024</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
