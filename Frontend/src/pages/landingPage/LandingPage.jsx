import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { mainContext } from "../../context/mainContex";
import Banner from "../../components/userComponent/Banner";
import Subject from "../../components/userComponent/landingpageComponents/SubjectComponent";
import axios from "axios";
// import Dashboard from "../../components/userComponent/landingpageComponents/UserDashboard";

const Landingpage = () => {
  const [animateName, setAnimateName] = useState(false);
  const servicesRef = useRef(null);
  const navigate = useNavigate();
  const { user ,token,fetchUserDetails} = useContext(mainContext); // Context to get user info


  useEffect(() => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const id = params.get('id');
    const role = params.get('role');

    if (token && id && role) {
      // Store the token and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', id);
      localStorage.setItem('userRole', role);

      // Redirect to the desired page, like the dashboard
      navigate('/subject'); // Use navigate instead of history.push
    } else {
      console.error('Missing token or user information in URL');
      // Optionally, redirect to an error page or login page
      navigate('/login'); // Use navigate instead of history.push
    }
  }, [navigate]);
  
    
  useEffect(() => {
    fetchUserDetails();
  }, []);

 
  useEffect(() => {
    // Trigger animation after a short delay when component mounts
    const timer = setTimeout(() => {
      setAnimateName(true);
    }, 500); // Adjust delay as needed

    // Clean up timeout on component unmount
    return () => clearTimeout(timer);
  }, []);



  const scrollToSection = () => {
    // Scroll to the top of Services section when button is clicked
    servicesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
     
      <main className="flex-1">
    
        
        <Banner/>
        <Subject/>
        {/* <Dashboard/> */}

        
      </main>
    </div>
  );
};

export default Landingpage;