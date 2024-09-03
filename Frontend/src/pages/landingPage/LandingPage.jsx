import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { mainContext } from "../../context/mainContex";
import Banner from "../../components/userComponent/Banner";
// import Subject from "../../components/userComponent/landingpageComponents/SubjectComponent";
import axios from "axios";
import More from "../../components/userComponent/landingpageComponents/More";
import { API_BASE_URL } from "../../constants/ApiConstants";
// import Analytics from "../../components/userComponent/landingpageComponents/analytics";
// import Dashboard from "../../components/userComponent/landingpageComponents/UserDashboard";

const Landingpage = () => {
  const [animateName, setAnimateName] = useState(false);
  const servicesRef = useRef(null);
  const navigate = useNavigate();
  const { user ,token,fetchUserDetails} = useContext(mainContext); // Context to get user info

  const handleAuthResponse = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}auth/google/callback`, {
        withCredentials: true,
      });
      const { token, user } = response.data;
  
      // Store the token and user details in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userRole', user.role);
  
      navigate('/'); // Redirect to home or dashboard
    } catch (error) {
      console.error('Authentication Error:', error);
      // setError('An error occurred during authentication');
    }
  };
  
  useEffect(() => {
    handleAuthResponse(); // Call this function when the component mounts if needed
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
        {/* <Subject/> */}
        {/* <Analytics/> */}
        {/* <Dashboard/> */}
        
        <More/>

        
      </main>
    </div>
  );
};

export default Landingpage;