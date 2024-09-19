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
import EmailOtpLogin from './pages/EmailLogin';
// import { UserDashboard1 } from './pages/Loginn';
import Main from './pages/Live/Main';
import AuthCallback from './hooks/AuthCallback';
import ResetPassword from './pages/ResetPassword';
// import Sidebar1 from './pages/login';




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
          {/* <Route path="/login" element={<Login/>} /> */}
          <Route path="/register" element={<Register/>} />
          <Route path="/auth/callback" element={<AuthCallback/>} />
          <Route path="/login" element={<EmailOtpLogin/>} />
          <Route path="/live" element={<Main />} />
          {/* <Route path="/loginn" element={<Sidebar1/>} /> */}
          <Route path="/reset-password" element={<ResetPassword/>} />
          

          
          <Route path="/admin/*" element={<AdminLayout />} />
          
          {/* Route for non-admin section */}
          <Route path="*" element={<DefaultLayout />} />

          
        </Routes>
      </div>
    </>
  );
}


// Layout for admin section 
function AdminLayout() {
  // const { user } = useContext(mainContext);
  const localUser = JSON.parse(localStorage.getItem('user')) || {};
  const role =  localUser.role;

  return (
    <>
     {role === 'admin' ? (
      
        
        <div className="flex flex-col w-full min-h-screen">
          {/* AdminHeader */}
          <AdminHeader/>

          {/* Admin Routes */}
          <div className="flex-1 p-4 overflow-auto ">
            <AdminRoutes />
          </div>

          <div className=" overflow-auto ">
         {/* Sidebar */}
         <AdminFooter />

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
