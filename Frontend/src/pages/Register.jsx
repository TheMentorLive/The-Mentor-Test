import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../constants/ApiConstants';
import axios from 'axios';

// Button component (reuse)
function Button({ variant = "default", size = "medium", children, ...props }) {
  const baseStyles = "py-2 px-4 rounded focus:outline-none";
  const variantStyles = variant === "ghost"
    ? "bg-transparent border border-gray-300"
    : "bg-blue-500 text-white";

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

// Label component (reuse)
function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

// Input component (reuse)
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

// Icons (reuse from previous code)
const LinkedinIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.31">
    <path fill="#0a66c2" d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z" />
    <path fill="#fff" d="M49.19,47.41H64.72v8h.22c2.17-3.88,7.45-8,15.34-8,16.39,0,19.42,10.2,19.42,23.47V98.94H83.51V74c0-5.71-.12-13.06-8.42-13.06s-9.72,6.21-9.72,12.65v25.4H49.19V47.41ZM40,31.79a8.42,8.42,0,1,1-8.42-8.42A8.43,8.43,0,0,1,40,31.79ZM23.18,47.41H40V98.94H23.18V47.41Z" />
  </svg>
);

const ChromeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326667 333333">
    <path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4" />
    <path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853" />
    <path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04" />
    <path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" fill="#ea4335" />
  </svg>
);

// Register Component with API Handling
export default function Register() {
  const [step, setStep] = useState(1); // Track registration step
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification
  const navigate = useNavigate();

  // Registration Form Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [contact, setContact] = useState('');
  const [qualification, setQualification] = useState('');

  // Error handling state
  const [error, setError] = useState(null);

  // Form validation
  const validateForm = () => {
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return false;
    }
    if (step === 3 && (!contact || !qualification)) {
      setError('Please complete all profile fields.');
      return false;
    }
    setError(null);
    return true;
  };

  // Register User
  const registerUser = async () => {
    if (!validateForm()) return;
    toast.info('Registering user...', { autoClose: false });
    try {
      const response = await axios.post(`${API_BASE_URL}auth/register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        setStep(2); // Move to OTP step
        toast.dismiss();
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Registration failed. Please try again.');
        toast.error(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!validateForm()) return;
    toast.info('Verifying OTP...', { autoClose: false });
    try {
      const response = await axios.post(`${API_BASE_URL}auth/verify-otp`, { email, otp });
      if (response.data.success) {
        setOtpVerified(true); // OTP verified, move to profile completion step
        toast.dismiss();
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      setError('OTP verification failed. Please try again.');
      toast.error('OTP verification failed. Please try again.');
    }
  };

  // Complete Profile
  const completeProfile = async () => {
    if (!validateForm()) return;

    // Check if user is attempting to complete the profile without additional data
    const isDataIncomplete = !contact || !qualification;

    // Display loading toast
    toast.info('Completing profile...', { autoClose: false });

    try {
      const response = await axios.post(`${API_BASE_URL}auth/complete-profile`, {
        email,
        name,
        contact,
        qualification,
      });

      if (response.data.success) {
        // Success scenario: check if data was incomplete
        if (isDataIncomplete) {
          // Prompt user to confirm completing registration without additional data
          if (window.confirm('You are completing the registration without providing additional details. Do you want to proceed?')) {
            toast.success('Profile completed successfully!');
            navigate("/login");
          } else {
            toast.dismiss(); // Dismiss the loading toast
          }
        } else {
          toast.success('Profile completed successfully!');
          navigate("/login");
        }
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      setError('Profile completion failed. Please try again.');
      toast.error('Profile completion failed. Please try again.');
    }
  };

  return (
    <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-start justify-center bg-muted p-6 lg:p-10">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src="/logo.webp" alt="Logo" className="-mt-56 md:mt-auto lg:mt-auto h-12" />
            </Link>
          </div>
          <br />
          <br />
          <div className="space-y-2 text-left">
            <h1 className="text-3xl font-bold">
              {step === 1 ? "Create an account" : otpVerified ? "Complete your profile" : "Verify OTP"}
            </h1>
            <p className="text-muted-foreground">
              {step === 1 ? "Enter your details below to create an account." : otpVerified ? "Provide additional details below." : "Enter the OTP sent to your email."}
            </p>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {/* Step 1: Email & Password Registration */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button variant="outline" className="flex w-full items-center text-white h-10 rounded-md bg-blue-500 hover:bg-blue-400 justify-center" onClick={registerUser}>
                Register
              </Button>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && !otpVerified && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP</Label>
                <Input id="otp" type="text" placeholder="Enter OTP" required value={otp} onChange={(e) => setOtp(e.target.value)} />
              </div>
              <Button variant="outline" className="flex w-full items-center text-white h-10 rounded-md bg-blue-500 hover:bg-blue-400 justify-center" onClick={verifyOtp}>
                Verify OTP
              </Button>
            </div>
          )}

          {/* Step 3: Fullname, Contact, and Qualification (if OTP verified) */}
          {otpVerified && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" type="text" placeholder="1234567890" required value={contact} onChange={(e) => setContact(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qualification">Highest Qualification</Label>
                <Input id="qualification" type="text" placeholder="Bachelor's, Master's, etc." required value={qualification} onChange={(e) => setQualification(e.target.value)} />
              </div>
              <Button variant="outline" className="flex w-full items-center text-white h-10 rounded-md bg-blue-500 hover:bg-blue-400 justify-center" onClick={completeProfile}>
                Complete Registration
              </Button>
            </div>
          )}

          <div className="relative">
            {!(step === 2 && !otpVerified) && ( // Only show when not in OTP phase
              <>
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div variant="outline" className="relative flex justify-center rounded-md text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or sign Up with</span>
                </div>
              
            
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="flex items-center text-white h-10 rounded-md hover:bg-slate-800 bg-black justify-center">
              <LinkedinIcon className="mr-2 h-4 w-4" />
              Linkedin
            </Button>
            <Button variant="outline" className="flex items-center text-white h-10 rounded-md hover:bg-slate-800 bg-black border justify-center">
              <ChromeIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          </>
             )}
          </div>
          <div className="flex justify-center mt-4"> {/* Center the text */}
            <p className="text-center">
              Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline"> Sign In</Link>
            </p>
          </div>

        </div>
      </div>

      <div className="hidden bg-muted lg:flex items-start justify-start">
        <img
          src="/signup.jpg"
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
