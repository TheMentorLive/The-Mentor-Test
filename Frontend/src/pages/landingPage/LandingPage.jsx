import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { mainContext } from "../../context/mainContex";
import Banner from "../../components/userComponent/Banner";
import Subject from "../../components/userComponent/landingpageComponents/SubjectComponent";
import axios from "axios";
// import Dashboard from "../../components/userComponent/landingpageComponents/UserDashboard";

const Landingpage = () => {
  const [animateName, setAnimateName] = useState(false);
  const servicesRef = useRef(null);
  const { user ,token,fetchUserDetails} = useContext(mainContext); // Context to get user info
  
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