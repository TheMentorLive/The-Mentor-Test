// Importing necessary React and icon components
import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

// Reusable SocialIcon component with hover effect
const SocialIcon = ({ icon: Icon }) => (
  <Icon className="social-icon hover:text-[#3d6ec3]" size={30} />
);

// Footer component
const Footer = () => {
  // Array defining the content and structure of the footer
  const items = [
    // Social media icons
    { type: 'icon', icon: FaFacebookSquare },
    { type: 'icon', icon: FaInstagram },
    { type: 'icon', icon: FaTwitterSquare },
    { type: 'icon', icon: FaGithubSquare },
    { type: 'icon', icon: FaDribbbleSquare },
    // Footer sections
    
    { type: 'section', title: 'Support', items: ['Pricing', 'Documentation', 'Guides'] },
    { type: 'section', title: 'Company', items: ['About', 'Blog', 'Jobs', 'Careers'] },
    { type: 'section', title: 'Legal', items: [ 'Policy', 'Terms'] },
  ];

  // JSX structure of the footer
  return (
    
    <footer className="bg-[#2952d6] py-16 px-4 items-center justify-center flex text-white">
      <div className="items-center flex justify-center">
      <div className="container mx-auto grid gap-8 md:ml-56 md:grid-cols-2 lg:grid-cols-3">
        {/* Left section with brand and social icons */}
        <div className="flex flex-col items-start">
          <img
            src="/The-mentor-logo.png"
            alt="Brand Logo"
            className="mb-4"
          />
          <p className="py-4 text-sm mr-2  md:text-base">
          Our platform provides comprehensive resources and tools to help you prepare for the JEE exam with confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            {/* Mapping over social icons and rendering the SocialIcon component */}
            {items.filter(item => item.type === 'icon').map((item, index) => (
              <SocialIcon key={index} icon={item.icon} />
            ))}
          </div>
        </div>
        {/* Right section with footer content organized in sections */}
        <div className="flex  gap-20 mr-4 md:flex-row md:justify-between">
          {/* Mapping over sections and rendering content */}
          {items.filter(item => item.type === 'section').map((item, index) => (
            <div key={index} className="flex-1">
              <h6 className="font-medium text-gray-100 text-lg md:text-xl mb-4">{item.title}</h6>
              <ul>
                {/* Mapping over items in each section */}
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className="py-1 text-sm">{subItem}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      </div>
    </footer>
    
  );
};

export default Footer;
