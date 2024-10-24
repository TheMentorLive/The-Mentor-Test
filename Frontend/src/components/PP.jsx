import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>

        {/* Privacy Policy Content */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Who we are</h2>
        <p className="text-gray-600 mb-4">
          Our website address is: <a href="https://www.genailearning.in" className="text-blue-600 hover:underline">https://www.genailearning.in</a>.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          What personal data we collect and why we collect it
        </h2>

        {/* Comments Section */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Comments</h3>
        <p className="text-gray-600 mb-4">
          When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.
        </p>

        <p className="text-gray-600 mb-4">
          An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: <a href="https://automattic.com/privacy/" className="text-blue-600 hover:underline">https://automattic.com/privacy/</a>. After approval of your comment, your profile picture is visible to the public in the context of your comment.
        </p>

        {/* Media Section */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Media</h3>
        <p className="text-gray-600 mb-4">
          If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
        </p>

        {/* Contact Forms */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Forms</h3>

        {/* Cookies */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Cookies</h3>
        <p className="text-gray-600 mb-4">
          If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
        </p>

        <p className="text-gray-600 mb-4">
          If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
        </p>

        <p className="text-gray-600 mb-4">
          When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
        </p>

        {/* Embedded Content */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Embedded Content from Other Websites</h3>
        <p className="text-gray-600 mb-4">
          Articles on this site may include embedded content (e.g., videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
        </p>

        {/* Analytics */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics</h3>

        {/* Data Sharing and Retention */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Who we share your data with & How long we retain your data</h3>
        <p className="text-gray-600 mb-4">
          If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
        </p>

        {/* User Rights */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">What rights you have over your data</h3>
        <p className="text-gray-600 mb-4">
          If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
        </p>

        {/* Where We Send Your Data */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Where we send your data</h3>
        <p className="text-gray-600 mb-4">
          Visitor comments may be checked through an automated spam detection service.
        </p>

        {/* Contact Information */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Your contact information</h3>
        <p className="text-gray-600 mb-4">For further information, please contact us at info@genailearning.in</p>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Additional Information</h3>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
