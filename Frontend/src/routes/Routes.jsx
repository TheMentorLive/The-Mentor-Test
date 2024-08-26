// src/Routes.js
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from '../pages/landingPage/LandingPage';

import NotFound from '../pages/PageNotFound';
import Feed from '../pages/post/Feed';
import Header from '../components/Header';


const AppRoutes = () => {
  // const {user} = useContext(mainContext)
  return (
    <>
    {/* {user.id && <test />} */}
    <Header />
    <main className="pt-[80px]"> {/* Adjust pt-20 or pt-[80px] based on your header height */}
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
  </>
);
};

export default AppRoutes;
