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
  const items = [
    { type: 'icon', icon: FaFacebookSquare, link: 'https://www.facebook.com/thementorlive/?eid=ARBOGFivL_1quwxYv2BbU2kCH330g3OpM8DLLQfHBIMzgCejc1tJzYvcfZrqFD1YLM4s7UT6ZUE4cwUT' },
    { type: 'icon', icon: FaInstagram, link: 'https://www.instagram.com/thementor.live' },
    { type: 'icon', icon: FaLinkedin, link: 'https://www.linkedin.com/company/thementorlive/posts/?feedView=all' },
    { type: 'icon', icon: FaEnvelope, link: 'mailto:admin@thementor.live' },
    { type: 'section', title: 'Support', items: ['Pricing', 'Documentation', 'Guides'] },
    { type: 'section', title: 'Company', items: [
      <Link to="/AboutUs" className="text-black hover:text-[#3d6ec3] transition-colors duration-200">About Us</Link>,
      <Link to="/support" className="text-black hover:text-[#3d6ec3] transition-colors duration-200">Contact Us</Link>,
      <Link to="/" className="text-black hover:text-[#3d6ec3] transition-colors duration-200">Blog</Link>] },
    { type: 'section', title: 'Legal', items: [
      <Link to="/PrivacyPolicy" className="text-black hover:text-[#3d6ec3] transition-colors duration-200">Privacy Policy</Link>, 
      <Link to="/TaC" className="text-black hover:text-[#3d6ec3] transition-colors duration-200">Terms and Conditions</Link>, 
      <Link to="/RefundPolicy" className="text-black hover:text-[#3d6ec3] transition-colors duration-200">Refund and Returns Policy</Link>] },
  ];

  return (
    <footer className="bg-white py-10 px-5 text-black border-t">
      <div className="mr-10 ml-10 ">
        <div className="container mx-auto flex flex-col md:flex-row md:justify-between md:ml-32 md:mr-32 lg:mx-0">
          <div className="flex flex-col items-start mb-8 md:mb-0 md:ml-4 md:mr-6">
          <h2 className="text-5xl font-bold">Gen AI</h2>
            <p className="py-4 text-sm md:text-base">
              Our platform provides comprehensive resources and tools to <br /> help you prepare for the JEE exam with confidence.
            </p>
            <div className="flex gap-4">
              {items.filter(item => item.type === 'icon').map((item, index) => (
                <SocialIcon key={index} icon={item.icon} link={item.link} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:mr-4 md:ml-2 lg:ml-0">
            {items.filter(item => item.type === 'section').map((item, index) => (
              <div key={index} className="flex flex-col">
                <h6 className="font-medium text-gray-900 text-lg md:text-xl mb-2">{item.title}</h6>
                <ul className="text-sm md:text-base">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex} className="py-1 hover:text-[#3d6ec3] transition-colors duration-200">{subItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-5 text-sm">
          © {new Date().getFullYear()} GenAi Learning. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;