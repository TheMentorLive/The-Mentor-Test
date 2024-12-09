import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import AppRoutes from './routes/Routes';
import AdminRoutes from './routes/AdminRoutes';
import Sidebar from './components/adminComponent/Sidebar';
import AdminHeader from './components/adminComponent/AdminHeader';
import Register from './pages/Register';
import { mainContext } from './context/mainContex';
import AdminFooter from './components/adminComponent/AdminFooter';
import Header from './components/Header';

import Login from './pages/EmailLogin';
import TermsAndConditions from './components/TAC';
import Aboutmain from './pages/About/Main';
import RefundPolicy from './components/RRP';
import PrivacyPolicy from './components/PP';

import Userdash from './pages/testing/User/dash';

import VideoSection from './pages/user/courses/main';
import {Admindash} from './components/adminComponent/admindash';
import Main from './pages/Live/Main';
import CartMain from './pages/Learn/Cart/Cart';
import Payment from './pages/Learn/Payment/Payment';
import Support from './pages/support';
import LearnMain from './pages/testing/Learn/main';
import HomepgMain from './pages/testing/homepg/main';
import TestdetailpgMain from './pages/testing/testdetailpg/main';
import { Product } from './pages/Learn/Product/Product';
import AuthCallback from './hooks/AuthCallback';
import ResetPassword from './pages/ResetPassword';
import JobsMain from './pages/jobs/Jobs-main';
import TestMain from './pages/Test/Main';





function App() {

// const {user}= useContext(mainContext)
const user = JSON.parse(localStorage.getItem('user'))
  return (
    <>
      
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
       
        <Routes>
          {/* Route for admin section */}
          <Route path="/register" element={<Register/>} />
          <Route path="/auth/callback" element={<AuthCallback/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/live" element={<Main />} />
          <Route path="/HomepgMain" element={<HomepgMain/>} />
          <Route path="/Testdetails" element={<TestdetailpgMain/>} />
          <Route path="/learn" element={<LearnMain />} />
          <Route path="/main" element={<VideoSection />} />
          <Route path="/Cart" element={<CartMain />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/details" element={<Product/>} />
          <Route path="/Dashboard" element={< Userdash/>} />

          <Route path="/jobs" element={<JobsMain />} />
          <Route path="/tests" element={<TestMain />} />
          <Route path="/TaC" element={<TermsAndConditions />} />
          <Route path="/about" element={<Aboutmain />} />

          <Route path="/RefundPolicy" element={<RefundPolicy />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

          
          

          
          <Route path="/admin/*" element={<AdminLayout />} />
          
          {/* Route for non-admin section */}
          <Route path="*" element={<DefaultLayout />} />

          
        </Routes>
      </div>
    </>
  );
}


// Layout for admin section 
// Layout for admin section
function AdminLayout() {
  // For local development, we'll always assume the user is an admin.
  const localUser = JSON.parse(localStorage.getItem('user')) || {};
  const role =  localUser.role;
  // const role = process.env.NODE_ENV === 'development' ? 'admin' : localUser.role;

  return (
    <>
      {role === 'admin' ? (
        <div className="flex flex-col w-full min-h-screen">
          {/* AdminHeader */}
          {/* <AdminHeader /> */}

          {/* Admin Routes */}
          <div className="overflow-auto">
            <Admindash />
          </div>

          <div className="overflow-auto">
            {/* Sidebar */}
            {/* <AdminFooter /> */}
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}



// Layout for non-admin section (with header and footer)
function DefaultLayout() {
  const { user } = useContext(mainContext);
  const localUser = JSON.parse(localStorage.getItem('user')) || {};
  const role =  localUser.role;


  return (
    <>
     
      {role !== 'admin' ? (
        <>
       
         
          <main>
            
            <AppRoutes />
          </main>
         
        </>
      ) : (
        <Navigate to="/admin" />
      )}
    </>
  );
}


export default App;
