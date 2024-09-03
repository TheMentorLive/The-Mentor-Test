
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social media icons

const Footer = () => {


  return (
    <div className="align-middle border-t border-gray-500 justify-center font-sans">
      <footer className="bg-[#fcfcfe] text-black py-6 px-4 sm:px-6 md:px-10">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-8">
            {/* Logo */}
            <div className="mb-6">
              <a href="/" className="flex items-center">
                <img
                  src="/logo.webp"
                  alt="GenAI Learning Logo"
                  width={150}
                  height={150}
                  className="mx-2"
                />
              </a>
            </div>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon].map(
                (Icon, index) => (
                  <div key={index} className="transform transition-transform hover:scale-110">
                    <a href="#">
                      <Icon className="h-6 w-6 text-black hover:text-blue-600 transition-colors" />
                    </a>
                  </div>
                )
              )}
            </div>
          </div>
          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 ml-5">
            {[
              { title: "Company", links: ["About us", "Our team", "Careers"] },
              { title: "Help", links: ["Support", "FAQs", "Contact us"] },
              { title: "Explore", links: ["Services", "Products", "Blog"] }
            ].map((section) => (
              <div key={section.title} className="flex flex-col space-y-2">
                <h3 className="font-bold text-lg">{section.title}</h3>
                {section.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-gray-900 hover:text-black transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-700">{`© ${new Date().getFullYear()} GenAI Learning. All rights reserved.`}</p>
        </div>
      </footer>
    </div>
  );
}







export default Footer;

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-2-.56 4.48 4.48 0 0 0-4.42 5.46A12.94 12.94 0 0 1 3 4.92a4.48 4.48 0 0 0-.61 2.25 4.48 4.48 0 0 0 2 3.74 4.48 4.48 0 0 1-2-.55v.06a4.48 4.48 0 0 0 3.6 4.4 4.48 4.48 0 0 1-2 .08 4.48 4.48 0 0 0 4.18 3.11 9 9 0 0 1-5.57 1.92A9 9 0 0 1 2 20.87 12.8 12.8 0 0 0 7 22c8.44 0 13-7 13-13.11 0-.2 0-.41-.02-.61A9.27 9.27 0 0 0 23 3z" />
    </svg>
  );
}


// import { Link } from "react-router-dom";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import social media icons

// const Footer = () => {
//   return (
//     <footer className="bg-blue-900 py-4"> {/* Changed py-8 to py-4 to decrease height */}
//       <div className="container flex flex-col items-center justify-between gap-4 px-4 sm:flex-row">
//         <div className="flex items-center">
//           {/* Logo Image */}
//           <img
//             src="/The-mentor-logo.png"
//             alt="mentor-logo"
//             className="h-9 w-auto"
//           />
//           {/* <span className="ml-2 text-lg font-bold">Trimahtech</span> */}
//         </div>
//         <nav className="flex gap-4">
//           <Link to="/" className="text-sm text-white font-medium hover:underline">
//             Home
//           </Link>
//           <Link to="/service" className="text-sm text-white font-medium hover:underline">
//             Subject
//           </Link>
//           <Link to="/contact" className="text-sm text-white font-medium hover:underline">
//             Test-
//           </Link>
//         </nav>
//         <div className="flex gap-4">
//           <a
//             href="https://facebook.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-white text-xl hover:text-violet-300"
//           >
//             <FaFacebook />
//           </a>
//           <a
//             href="https://twitter.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-white text-xl hover:text-violet-300"
//           >
//             <FaTwitter />
//           </a>
//           <a
//             href="https://instagram.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-white text-xl hover:text-violet-300"
//           >
//             <FaInstagram />
//           </a>
//           <a
//             href="https://linkedin.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-white text-xl hover:text-violet-300"
//           >
//             <FaLinkedin />
//           </a>
//         </div>
//         <p className="text-sm text-white">
//           &copy; {new Date().getFullYear()} The Mentor. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
