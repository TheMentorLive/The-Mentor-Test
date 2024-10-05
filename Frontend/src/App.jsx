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
// import Userdash from './pages/testing/login';
import Login from './pages/EmailLogin';
// import Sidebar1 from './pages/testing/Loginn';
import VideoSection from './pages/user/courses/main';
import Admindash from './components/adminComponent/admindash';
import Main from './pages/Live/Main';
import { CartPage } from './pages/Learn/Cart/Cart';
import Payment from './pages/Learn/Payment/Payment';
import Support from './pages/support';
import LearnMain from './pages/Learn/Main';
// import Item from './pages/Learn/detail/item';
import { Product } from './pages/Learn/Product/Product';
import AuthCallback from './hooks/AuthCallback';
import ResetPassword from './pages/ResetPassword';





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
          <Route path="/login" element={<Login/>} />
          <Route path="/live" element={<Main />} />
          {/* <Route path="/livee" element={<Userdash />} /> */}
          <Route path="/learn" element={<LearnMain />} />
          {/* <Route path="/livee" element={<Sidebar1 />} /> */}
          <Route path="/main" element={<VideoSection />} />
          <Route path="/Cartpg" element={<CartPage />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route path="/support" element={<Support/>} />
          <Route path="/details" element={<Product/>} />
          

          
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
