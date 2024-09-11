import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants/ApiConstants';

// Button component
function Button({ variant = "default", size = "medium", children, ...props }) {
  const baseStyles = "py-2 px-4 rounded focus:outline-none";
  const variantStyles = variant === "ghost"
    ? "bg-transparent border border-gray-300"
    : "bg-[#2563EB] text-white";

  const sizeStyles = size === "icon"
    ? "p-2"
    : size === "small"
      ? "py-1 px-3"
      : "py-2 px-4";

  return (
    <button className={`${baseStyles} ${variantStyles} ${sizeStyles}`} {...props}>
      {children}
    </button>
  );
}

// Label component
function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

// Input component
function Input({ id, type = "text", placeholder, required, value, onChange }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
      className="block w-full border border-gray-300 rounded-md p-2"
    />
  );
}

// Icons
function ChromeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 326667 333333"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path
        d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
        fill="#4285f4"
      />
      <path
        d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
        fill="#34a853"
      />
      <path
        d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
        fill="#fbbc04"
      />
      <path
        d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
        fill="#ea4335"
      />
    </svg>
  );
};

const LinkedinIcon = (props) => {
  return (
    <svg
      {...props}
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 122.31"
    >
      <defs>
        <style>
          {`.cls-1{fill:#0a66c2;}.cls-1,.cls-2{fill-rule:evenodd;}.cls-2{fill:#fff;}`}
        </style>
      </defs>
      <title>linkedin-app</title>
      <path
        className="cls-1"
        d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z"
      />
      <path
        className="cls-2"
        d="M49.19,47.41H64.72v8h.22c2.17-3.88,7.45-8,15.34-8,16.39,0,19.42,10.2,19.42,23.47V98.94H83.51V74c0-5.71-.12-13.06-8.42-13.06s-9.72,6.21-9.72,12.65v25.4H49.19V47.41ZM40,31.79a8.42,8.42,0,1,1-8.42-8.42A8.43,8.43,0,0,1,40,31.79ZM23.18,47.41H40V98.94H23.18V47.41Z"
      />
    </svg>
  );
};


// Login Component
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [linkedInLoading, setLinkedInLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    toast.info('Logging in...', { autoClose: 3000 });

    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, { email, password });
      console.log("datatatta", response.data); // Log response data to check its structure

      if (response.data) {
        // Store token and user details in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Ensure user object exists

        toast.success('Login successful!');
        navigate('/'); // Redirect to dashboard or another page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Error during login:', error);
    }
  };


  // Handle Google login
  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    try {
      // Redirect to backend Google OAuth route
      window.location.href = `${API_BASE_URL}auth/google`;
    } catch (error) {
      toast.error('Google Login Error:', error);
      toast('An error occurred during Google login');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handle LinkedIn login
  const handleLinkedinLogin = () => {
    setLinkedInLoading(true);
    try {
      window.location.href = `${API_BASE_URL}auth/linkedin`;
    } catch (error) {
      console.error('linkedin Login Error:', error);
      setError('An error occurred during linkein login');
    } finally {
      setLinkedInLoading(false);
    }
  };

  return (
    <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-start justify-center bg-muted p-6 lg:p-10">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="flex items-center  justify-between">
            <Link to="/" className="inline-flex  items-center gap-2">
              <img src="/logo.webp" alt="Logo" className=" -mt-52  md:mt-auto lg:mt-auto h-12" />
            </Link>
            {/* <Button variant="ghost" size="icon">
              <MenuIcon className="h-6 w-6" />
            </Button> */}
          </div>
          <br />
          <br />
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold">Sign in to your account</h1>
            <p className="text-muted-foreground">Enter your email and password below to access your account.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/reset-password" className="text-sm text-primary underline-offset-4 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <br />
            <Button variant="outline" className="flex w-full items-center text-white h-10 rounded-md bg-[#2563EB] hover:bg-blue-400 justify-center" onClick={handleLogin}>
              Sign in
            </Button>
          </div>
          <div className="relative">

            <div className="relative flex justify-center rounded-md text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or sign in with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleLinkedinLogin} className="flex items-center text-black  h-10 rounded-md hover:bg-slate-100 bg-white border border-blue-500 justify-center">
              <LinkedinIcon className="mr-2 h-4 w-4" />
              Linkedin
            </Button>
            <Button variant="outline" onClick={handleGoogleLogin} className="flex items-center text-black  h-10 rounded-md hover:bg-slate-100 bg-white border border-blue-500 justify-center">
              <ChromeIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="flex justify-center mt-4"> {/* Center the text */}
            <p className="text-center">
              Don't have an account?
              <Link to="/register" className="text-[#2563EB] hover:underline"> Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="flex items-start justify-center bg-muted lg:hidden">
        <img
          src="/Signin.png"
          alt="Sign in image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div> */}
      <div className="hidden bg-muted lg:flex items-start justify-start">
        <img
          src="/Signin.png"
          alt="Sign in image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
