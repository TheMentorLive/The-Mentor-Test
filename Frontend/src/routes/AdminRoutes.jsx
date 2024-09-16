import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { mainContext } from '../context/mainContex';

import Users from '../pages/list/UserList';
import Userprofile from '../pages/Userprofile';
import PageInProgres from '../pages/Progress';
import AddSubject from '../pages/admin/AddSubject';
import AddQuestionPage from '../pages/admin/test/AddQuestions';
import AdminLandingPage from '../pages/admin/Admin-landing';
import GoogleDocsQuestionComponent from '../pages/admin/Questions';


const AdminRoutes = () => {


  return (
    <Routes>
      
      <Route path="/users" element={<Users />} />
      <Route path="/my-account" element={<Userprofile />} />
      <Route path="/" element={<AdminLandingPage />} />
      <Route path="/questions" element={<GoogleDocsQuestionComponent />} />
      <Route path="/test/add-subject" element={<AddSubject />} />
      <Route path="/test/add-test" element={<AddQuestionPage />} />
     
      {/* Catch all unmatched routes */}
      <Route path="*" element={<PageInProgres />} />
    </Routes>
  );
};

export default AdminRoutes;
