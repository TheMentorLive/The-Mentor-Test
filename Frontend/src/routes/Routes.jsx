// src/Routes.js
import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landingpage from '../pages/landingPage/LandingPage';
import HomepgMain from '../pages/testing/homepg-old/main';
import HomepgMain1 from '../pages/testing/homepg-new/main';
import NotFound from '../pages/PageNotFound';
import Header from '../components/Header';
import ProfileComponent from '../pages/user/Profile';
import Settings from '../pages/user/Settings';
import Course from '../pages/user/courses/courses';
import TestLandingPage from '../pages/user/test/TestLandingPage';
import TestPage from '../pages/user/test/TestPage';
import TestResultsPage from '../pages/user/test/TestResultPage';
import UpcomingTestsPage from '../pages/user/test/UpcommingTest';
import TestHistoryPage from '../pages/user/test/TestHistory';
import { mainContext } from '../context/mainContex';
import UserDashboard from '../pages/user/Userdashboard';
import Sidebar from '../components/userComponent/Sidebar-login';
// import Sidebar from '../pages/testing/login';
import Footer from '../components/Footer';
import TestComponent from '../pages/user/Tests';
import Userdash from '../pages/testing/User/dash';
import AlltestspgMain from '../pages/testing/Alltests/main';
import ViewProfile from '../pages/user/ViewProfile';

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(mainContext);
  const location = useLocation();

  useEffect(() => {
        setIsLoggedIn(localStorage.getItem("user", JSON.stringify(user)));
      }, [user]);

      const isFullScreenPage = ['/start-test', '/test'].includes(location.pathname);

      return (
        <>
       {
  window.location.pathname !== "/home" && <Header />}

        {!isFullScreenPage &&
  !isLoggedIn &&
  window.location.pathname !== "/home" && <Header />}

          <div className={`layout ${isLoggedIn && !isFullScreenPage ? 'sidebar-visible' : ''}`}>
            {/* {!isFullScreenPage && isLoggedIn && <Sidebar className="sidebar" />} */}
            <main className={`content ${isFullScreenPage ? 'pt-0' : 'pt-[80px]'}`}>
              <Routes>
                {/* Public Routes */}
               
                {isLoggedIn ? (
                  <>
                 
                    <Route path="/" element={<HomepgMain />} />
                    <Route path="/upcoming-test" element={<UpcomingTestsPage />} />
                    {/* Redirect logged-in users to /user-dashboard */}
                    <Route path="/user-dashboard" element={<Navigate to="/" />} />
                    <Route path="/home" element={<Navigate to="/" />} />
                   
                    <Route path="/settings" element={<Navigate to="/" />} />
                    <Route path="/profile" element={<ProfileComponent />} />
                    <Route path="/subjects" element={<Navigate to="/" />} />
                    <Route path="/start-test" element={<TestLandingPage />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/result" element={<TestResultsPage />} />
                    <Route path="/dashboard" element={< Userdash/>} />
                    <Route path="/test-history" element={<Navigate to="/" />} />
                    <Route path="/All-Tests" element={< AlltestspgMain/>} />
                    <Route path="/view-profile" element={<ViewProfile/>} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Navigate to="/user-dashboard" />} />
                    <Route path="/user-dashboard" element={<HomepgMain />} />
                       <Route path="/home" element={<HomepgMain1 />} />
                   
                    <Route path="/profile" element={<Navigate to="/" />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/all-tests" element={<TestComponent />} />
                    <Route path="/courses" element={<Course />} />
                 
                    <Route path="/test" element={<Navigate to="/" />} />
                    {/* <Route path="/start-test" element={<Navigate to="/" />} /> */}
                   
                  
                   
                    <Route path="/test-history" element={<TestHistoryPage />} />
                  </>
                )}
                {/* Catch-all for undefined routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              {!isFullScreenPage &&
  !isLoggedIn &&
  window.location.pathname !== "/home" && <Footer />}

            </main>
          </div>
        </>
      );
    };
    
    export default AppRoutes;