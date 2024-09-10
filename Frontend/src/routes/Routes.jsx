// src/Routes.js
import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landingpage from '../pages/landingPage/LandingPage';
import NotFound from '../pages/PageNotFound';
import Header from '../components/Header';
import ProfileComponent from '../pages/user/Profile';
import Settings from '../pages/user/Settings';
import SubjectComponent from '../pages/user/Subject';
import TestLandingPage from '../pages/user/test/TestLandingPage';
import TestPage from '../pages/user/test/TestPage';
import TestResultsPage from '../pages/user/test/TestResultPage';
import UpcomingTestsPage from '../pages/user/test/UpcommingTest';
import TestHistoryPage from '../pages/user/test/TestHistory';
import { mainContext } from '../context/mainContex';
import UserDashboard from '../pages/user/Userdashboard';
import Sidebar from '../components/userComponent/Sidebar-login';
import Footer from '../components/Footer';

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useContext(mainContext);

  useEffect(() => {
        setIsLoggedIn(localStorage.getItem("user", JSON.stringify(user)));
      }, [user]);

      return (
        <>
          {!isLoggedIn&&<Header />}
          <div className={`layout ${isLoggedIn ? 'sidebar-visible' : ''}`}>
            {isLoggedIn && <Sidebar className="sidebar" />}
            <main className="content pt-[80px]"> {/* Adjust padding based on header height */}
              <Routes>
                {/* Public Routes */}
                {!isLoggedIn ? (
                  <>
                    <Route path="/" element={<Landingpage />} />
                    <Route path="/upcoming-test" element={<UpcomingTestsPage />} />
                    {/* Redirect logged-in users to /user-dashboard */}
                    <Route path="/user-dashboard" element={<Navigate to="/" />} />
                    <Route path="/profile" element={<Navigate to="/" />} />
                    <Route path="/settings" element={<Navigate to="/" />} />
                    <Route path="/subjects" element={<Navigate to="/" />} />
                    <Route path="/start-test" element={<Navigate to="/" />} />
                    <Route path="/test" element={<Navigate to="/" />} />
                    <Route path="/result" element={<Navigate to="/" />} />
                    <Route path="/test-history" element={<Navigate to="/" />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Navigate to="/user-dashboard" />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/profile" element={<ProfileComponent />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/subjects" element={<SubjectComponent />} />
                    <Route path="/start-test" element={<TestLandingPage />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/result" element={<TestResultsPage />} />
                    <Route path="/test-history" element={<TestHistoryPage />} />
                  </>
                )}
                {/* Catch-all for undefined routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              {!isLoggedIn&&<Footer/>}
            </main>
           
          
          </div>
        </>
      );
    };
    
    export default AppRoutes;






// // src/Routes.js
// import React, { useContext } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Landingpage from '../pages/landingPage/LandingPage';
// import NotFound from '../pages/PageNotFound';
// import Header from '../components/Header';
// import ProfileComponent from '../pages/user/Profile';
// import Settings from '../pages/user/Settings';
// import SubjectComponent from '../pages/user/Subject';
// import TestLandingPage from '../pages/user/test/TestLandingPage';
// import TestPage from '../pages/user/test/TestPage';
// import TestResultsPage from '../pages/user/test/TestResultPage';
// import UpcomingTestsPage from '../pages/user/test/UpcommingTest';
// import TestHistoryPage from '../pages/user/test/TestHistory';



// const AppRoutes = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//    // useEffect to update isLoggedIn based on user object
//    useEffect(() => {
//     setIsLoggedIn(localStorage.getItem("user", JSON.stringify(user)));
//   }, [user]);
//   return (
//     <>
//     {/* {user.id && <test />} */}
//     <Header />
//     <main className="pt-[80px]"> {/* Adjust pt-20 or pt-[80px] based on your header height */}
//         <Routes>
//           <Route path="/" element={<Landingpage />} />
//           <Route path="/profile" element={<ProfileComponent />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/subjects" element={<SubjectComponent />} />
//           <Route path="/start-test" element={<TestLandingPage />} />
//           <Route path="/test" element={<TestPage/>} />
//           <Route path="/result" element={<TestResultsPage/>} />
//           <Route path="/upcoming-test" element={<UpcomingTestsPage/>} />
//           <Route path="/test-history" element={<TestHistoryPage/>} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//   </>
// );
// };

// export default AppRoutes;



