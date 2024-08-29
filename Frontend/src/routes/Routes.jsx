// src/Routes.js
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from '../pages/landingPage/LandingPage';
import NotFound from '../pages/PageNotFound';
import Header from '../components/Header';
import ProfileComponent from '../pages/user/Profile';
import Settings from '../pages/user/Settings';
import SubjectComponent from '../pages/user/Subject';
import TestLandingPage from '../pages/user/test/TestLandingPage';
import TestPage from '../pages/user/test/TestPage';
import TestResultsPage from '../pages/user/test/TestResultPage';



const AppRoutes = () => {
  // const {user} = useContext(mainContext)
  return (
    <>
    {/* {user.id && <test />} */}
    <Header />
    <main className="pt-[80px]"> {/* Adjust pt-20 or pt-[80px] based on your header height */}
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/subjects" element={<SubjectComponent />} />
          <Route path="/start-test" element={<TestLandingPage />} />
          <Route path="/test" element={<TestPage/>} />
          <Route path="/result" element={<TestResultsPage/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
  </>
);
};

export default AppRoutes;
