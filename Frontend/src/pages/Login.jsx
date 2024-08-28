// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { IconButton, TextField, Button, Divider, Typography, MenuItem } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import GitHub from '@mui/icons-material/GitHub';
// import Google from '@mui/icons-material/Google';
// import { API_BASE_URL } from '../constants/ApiConstants';
// import { mainContext } from '../context/mainContex';

// export default function Login() {
//   const [step, setStep] = useState('enterMobile'); // 'enterMobile' or 'verifyOtp'
//   const [mobile, setMobile] = useState('');
//   const [otp, setOtp] = useState('');
//   const { token } = useContext(mainContext);
//   const [name, setName] = useState('');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [country, setCountry] = useState('US'); // Default country set to 'US'
//   const [isVerifiedUser, setIsVerifiedUser] = useState(false); // New state for verified user
//   const navigate = useNavigate();

//   // Combine country code with mobile number
//   const getFormattedMobile = () => {
//     const countryCodeMap = {
//       US: '+1',
//       IN: '+91',
//       GB: '+44',
//       AU: '+61',
//     };
//     const countryCode = countryCodeMap[country] || '';
//     return `${countryCode}${mobile}`;
//   };

//   const handleSendOtp = async () => {
//     setLoading(true);
//     try {
//       const formattedMobile = getFormattedMobile();
//       const response = await axios.post(`${API_BASE_URL}auth/send-otp`, { mobile: formattedMobile });

//       if (response.data.keyword === "USER_VERIFIED") {
//         setIsVerifiedUser(true); // Set verified user to true
        
//       } else {
//         setIsVerifiedUser(false); // Set verified user to false
//       }
    

//       setStep('verifyOtp');
//     } catch (error) {
//       setError(error.response?.data?.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     setLoading(true);
//     try {
//       const formattedMobile = getFormattedMobile();
//       const response = await axios.post(`${API_BASE_URL}auth/verify-otp`, { name, mobile: formattedMobile, otp });
//       const { token, user } = response.data;
//       const response1 = await axios.get('http://localhost:8080/api/auth/userDetails', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(response1.data.user));
//       // localStorage.setItem('user', JSON.stringify(user));
//       navigate('/'); // Redirect to home or dashboard
//     } catch (error) {
//       setError(error.response?.data?.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCountryChange = (e) => {
//     setCountry(e.target.value);
//   };

//   // Placeholder for mobile based on country
//   const mobilePlaceholder = country === 'US' ? '123-456-7890' : 'Enter mobile number';

//   return (
//     <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
//       {/* Left section */}
//       <div className="flex flex-col items-start justify-center bg-white p-6 lg:p-10">
//         <div className="mx-auto w-full max-w-md space-y-6">
//           {/* Logo and menu button */}
//           <div className="flex items-center justify-between">
//             <a href="#" className="inline-flex items-center gap-2">
//               <img src="/The-mentor-logo.png" alt="The Mentor Logo" style={{ width: '100px', height: '40px' }} />
//             </a>
//             <IconButton>
//               <MenuIcon />
//             </IconButton>
//           </div>
//           {/* Header */}
//           <div className="space-y-2 text-left">
//             <Typography variant="h4" className="font-bold">
//               {step === 'enterMobile' ? 'Enter Mobile Number' : 'Verify OTP'}
//             </Typography>
//             <Typography className="text-gray-500">
//               {step === 'enterMobile' ? 'Enter your mobile number to receive an OTP.' : 'Enter the OTP sent to your mobile number.'}
//             </Typography>
//           </div>
//           {/* Form fields */}
//           <div className="space-y-4">
//             <TextField
//               id="country"
//               select
//               label="Country"
//               value={country}
//               onChange={handleCountryChange}
//               fullWidth
//               required
//             >
//               {/* Add more country options as needed */}
//               <MenuItem value="US">United States (+1)</MenuItem>
//               <MenuItem value="IN">India (+91)</MenuItem>
//               <MenuItem value="GB">United Kingdom (+44)</MenuItem>
//               <MenuItem value="AU">Australia (+61)</MenuItem>
//             </TextField>

//             {step === 'enterMobile' ? (
//               <>
//                 <TextField
//                   id="mobile"
//                   label="Mobile Number"
//                   type="tel"
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                   placeholder={mobilePlaceholder}
//                   fullWidth
//                   required
//                 />
//                 <Button type="button" variant="contained" onClick={handleSendOtp} fullWidth disabled={loading}>
//                   {loading ? 'Sending OTP...' : 'Send OTP'}
//                 </Button>
//               </>
//             ) : (
//               <>
//                 {/* Only show OTP field if user is verified */}
//                 {isVerifiedUser ? (
//                   <>
//                     <TextField
//                       id="otp"
//                       label="OTP"
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       fullWidth
//                       required
//                     />
//                     <Button type="button" variant="contained" onClick={handleVerifyOtp} fullWidth disabled={loading}>
//                       {loading ? 'Verifying OTP...' : 'Verify OTP'}
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <TextField
//                       id="otp"
//                       label="OTP"
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       fullWidth
//                       required
//                     />
//                     <TextField
//                       id="name"
//                       label="Name"
//                       type="text"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       fullWidth
//                       required
//                     />
//                     <Button type="button" variant="contained" onClick={handleVerifyOtp} fullWidth disabled={loading}>
//                       {loading ? 'Verifying OTP...' : 'Verify OTP'}
//                     </Button>
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//           {/* Divider */}
//           <div className="relative">
//             <Divider>
//               <Typography variant="caption" className="bg-gray-100 px-2">
//                 Or sign in with
//               </Typography>
//             </Divider>
//           </div>
//           {/* Social buttons */}
//           <div className="grid grid-cols-2 gap-4">
//             <Button variant="outlined" startIcon={<GitHub />}>
//               GitHub
//             </Button>
//             <Button variant="outlined" startIcon={<Google />}>
//               Google
//             </Button>
//           </div>
//           {/* Sign in link */}
//           <div className="text-center text-sm">
//             Continue With{' '}
//             <a href="/emaillogin" className="underline text-blue-600">
//               Email
//             </a>
//           </div>
//         </div>
//       </div>
//       {/* Right section for image */}
//       <div className="flex items-start justify-center bg-gray-100 lg:hidden">
//         <img
//           src="/signup.jpg"
//           alt="Sign up image"
//           height="1080"
//           className="h-full"
//           style={{ aspectRatio: '', objectFit: 'cover' }}
//         />
//       </div>
//       <div className="hidden lg:flex items-start justify-start h-full">
//         <img
//           src="/signup.jpg"
//           alt="Sign up image"
//           className="h-full object-cover"
//           style={{ aspectRatio: 'auto', width: 'auto' }}
//         />
//       </div>
//     </div>
//   );
// }













// // import React, { useContext, useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { mainContext } from '../context/mainContex';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import AnimateName from '../context/animateName';
// // import { API_BASE_URL } from '../constants/ApiConstants';
// // import { IconButton, TextField, Button, Divider, Typography } from '@mui/material';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import GitHub from '@mui/icons-material/GitHub';
// // import Google from '@mui/icons-material/Google';

// // export default function Login() {
// //   const [loading, setLoading] = useState(false);  // State for loading
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState(null);
// //   const { setToken } = useContext(mainContext);
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true)
// //     try {
// //       const response = await axios.post(`${API_BASE_URL}auth/login`, { email, password });
// //       const { token, user } = response.data;
      
// //       // Save token and user to localStorage
// //       localStorage.setItem('token', token);
// //       localStorage.setItem('user', JSON.stringify(user));
      
// //       // Update context with token
// //       setToken(token);
  
     
// //         navigate('/'); // Redirect regular users to the home page
   
// //     } catch (error) {
// //       setError(error.response?.data?.msg || 'An error occurred');
// //       console.log(error);
// //     }
// //     finally {
// //       setLoading(false);  // Stop loading
// //     }
// //   };
  

// //   return (
  
// //     <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
// // {/* Left section */}
// // <div className="flex flex-col items-start justify-center bg-white p-6 lg:p-10">
// //   <div className="mx-auto w-full max-w-md space-y-6">
// //     {/* Logo and menu button */}
// //     <div className="flex items-center justify-between">
// //       <Link href="#" prefetch={false}>
// //         <a className="inline-flex items-center gap-2">
// //         <img src="/The-mentor-logo.png" alt="The Mentor Logo" style={{ width: '100px', height: '40px' }} />

// //           {/* <Typography variant="h6" component="span" className="font-bold">
// //             The Mentor
// //           </Typography> */}
// //         </a>
// //       </Link>
// //       <IconButton>
// //         <MenuIcon />
// //       </IconButton>
// //     </div>
// //     {/* Header */}
// //     <div className="space-y-2 text-left">
// //       <Typography variant="h4" className="font-bold">
// //       Sign in to your account
// //       </Typography>
// //       <Typography className="text-gray-500">
// //       Enter your email and password below to access your account.
// //       </Typography>
// //     </div>
// //     {/* Form fields */}
// //     <div className="space-y-4">
// //       <TextField
// //         id="email"
// //         label="Email"
// //         type="email"
// //         value={email}
// //          onChange={(e) => setEmail(e.target.value)}
// //         placeholder="m@example.com"
// //         fullWidth
// //         required
// //       />
// //       <TextField
// //         id="password"
// //         label="Password"
// //         type="password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //         fullWidth
// //         required
// //       />
// //        <Button type="submit" variant="contained" onClick={handleSubmit} fullWidth disabled={loading}>
// //             {loading ? 'Signing Up...' : 'Sign Up'}
// //           </Button>
// //     </div>
// //     {/* Divider */}
// //     <div className="relative">
// //       <Divider>
// //         <Typography variant="caption" className="bg-gray-100 px-2">
// //           Or sign up with
// //         </Typography>
// //       </Divider>
// //     </div>
// //     {/* Social buttons */}
// //     <div className="grid grid-cols-2 gap-4">
// //       <Button variant="outlined" startIcon={<GitHub />}>
// //         GitHub
// //       </Button>
// //       <Button variant="outlined" startIcon={<Google />}>
// //         Google
// //       </Button>
// //     </div>
// //     {/* Sign in link */}
// //     <div className="text-center text-sm">
// //       Don't have An account?{' '}
// //       <Link to="/register" prefetch={false}>
// //         <a className="underline">Sign Up</a>
// //       </Link>
// //     </div>
// //   </div>
// // </div>
// // {/* Right section for image */}
// // <div className="flex items-start justify-center bg-gray-100 lg:hidden">
// //   <img
// //     src="/signup.jpg"
// //     alt="Sign up image"
// //     // width="1920"
// //     height="1080"
// //     className="h-full "
// //     style={{ aspectRatio: '', objectFit: 'cover' }}
// //   />
// // </div>
// // <div className="hidden  lg:flex items-start justify-start  h-full">
// //   <img
// //     src="/signup.jpg"
// //     alt="Sign up image"
    
// //     className="h-full object-cover"
// //     style={{ aspectRatio: 'auto' ,width: 'auto' }}
// //   />
// // </div>
// // </div>
// //   );
// // }
