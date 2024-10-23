import React from 'react';
import { FaLinkedin, FaFacebookSquare, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Reusable SocialIcon component with hover effect
const SocialIcon = ({ icon: Icon, link }) => (
  <a
    href={link}
    className="social-icon hover:text-[#3d6ec3] transition-colors duration-200"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon size={30} />
  </a>
);

// Footer component
const Footer = () => {
  // Array defining the content and structure of the footer
  const items = [
    // Social media icons with links
    { type: 'icon', icon: FaFacebookSquare, link: 'https://www.facebook.com/thementorlive/?eid=ARBOGFivL_1quwxYv2BbU2kCH330g3OpM8DLLQfHBIMzgCejc1tJzYvcfZrqFD1YLM4s7UT6ZUE4cwUT' },
    { type: 'icon', icon: FaInstagram, link: 'https://www.instagram.com/thementor.live' },
    { type: 'icon', icon: FaLinkedin, link: 'https://www.linkedin.com/company/thementorlive/posts/?feedView=all' },
    { type: 'icon', icon: FaEnvelope, link: 'mailto:admin@thementor.live' }, // Email link

    // Footer sections
    { type: 'section', title: 'Support', items: ['Pricing', 'Documentation', 'Guides'] },
    { type: 'section', title: 'Company', items: ['About Us', 'Blog', 'Jobs', 'Careers'] },
    { type: 'section', title: 'Legal', items: ['Privacy Policy', <Link to="/tac" className="text-white hover:text-[#3d6ec3] transition-colors duration-200">Terms and Conditions</Link>, 'Refund and Returns Policy'] },
  ];

  // JSX structure of the footer
  return (
    <footer className="bg-[#2952d6] py-10 px-5 text-white">
      <div className="mr-10 ml-10">
        <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:ml-32 md:mr-32 lg:mx-0">
          {/* Left section with brand and social icons */}
          <div className="flex flex-col items-start mb-8 md:mb-0 md:ml-4 md:mr-6">
            <img
              src="/The-mentor-logo.png"
              alt="Brand Logo"
              className="mb-1 w-36" // Adjust logo size
            />
            <p className="py-4 text-sm md:text-base">
              Our platform provides comprehensive resources and tools to <br /> help you prepare for the JEE exam with confidence.
            </p>
            <div className="flex gap-4">
              {/* Mapping over social icons and rendering the SocialIcon component */}
              {items.filter(item => item.type === 'icon').map((item, index) => (
                <SocialIcon key={index} icon={item.icon} link={item.link} />
              ))}
            </div>
          </div>

          {/* Right section with footer content organized in sections */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:mr-4 md:ml-2 lg:ml-0">
            {/* Mapping over sections and rendering content */}
            {items.filter(item => item.type === 'section').map((item, index) => (
              <div key={index} className="flex flex-col">
                <h6 className="font-medium text-gray-100 text-lg md:text-xl mb-2">{item.title}</h6>
                <ul className="text-sm md:text-base">
                  {/* Mapping over items in each section */}
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex} className="py-1 hover:text-[#3d6ec3] transition-colors duration-200">{subItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-5 text-sm">
          © {new Date().getFullYear()} The Mentor. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
