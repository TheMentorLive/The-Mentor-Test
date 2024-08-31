'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from "next/link";
import Image from "next/image";
import { Label } from "@/public/ui/label";
import { Input } from "@/public/ui/input";
import Head from 'next/head';
import { Button } from "@/public/ui/button";
import Layout from './layout';
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { isEmail } from '@/utils/validations/emailValidator';
import { createAccount, googleSinup, linkedinSignup, verifyOTP } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const router = useRouter();

  async function handleGoogleSignup(e) {
    e.preventDefault();
    const response = await dispatch(googleSinup());
    if (response.payload?.data?.status === 200) {
      toast.success(response.payload.data.message);
    }
  }

  async function handleLinkedinSignup(e) {
    e.preventDefault();
    await dispatch(linkedinSignup());
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!email || !name || !password) {
      toast.error("Please fill all the details");
      return;
    }
    if (name.length < 5) {
      toast.error("Name should be length of 5 or greater");
      return;
    }
    if (!isEmail(email)) {
      toast.error("Email is invalid");
      return;
    }

    const response = await dispatch(createAccount({ name, email, password }));
    console.log(response.payload,"user data");
    if (response.payload?.statusCode === 201) {
      toast.success("OTP sent to your email. Please verify.");
      setShowOTP(true);
    } else {
      toast.error("Failed to create account. Please try again.");
    }
  }

  async function handleOTPVerification(e) {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    const response = await dispatch(verifyOTP({ otp }));
    console.log(response.payload,"otp data");
    if (response.payload?.data.statusCode === 200) {
      setEmail('');
      setName('');
      setPassword('');
      setOTP('');
      router.push('/dash-admin/tests');
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  }

  return (
    <Layout>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Link href="/Main" className="self-start flex items-center text-primary hover:underline" prefetch={false}>
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  <span>Back</span>
                </Link>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Create an Account</h1>
                <p className="text-gray-600 text-sm sm:text-base text-center">
                  Already have an account?{" "}
                  <Link href="/Main/signin" className="text-primary hover:underline" prefetch={false}>
                    Sign in
                  </Link>
                </p>
               
              </div>
              {!showOTP ? (
                <form className="space-y-4" onSubmit={handleRegister} noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary-dark"
                  >
                    Sign Up
                  </Button>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={handleOTPVerification} noValidate>
                  <div className='text-center'>
                    <p className="text-gray-600 text-sm sm:text-base text-center">
                      OTP sent to your email. Please verify.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      placeholder="Enter the OTP sent to your email"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary-dark"
                  >
                    Verify OTP
                  </Button>
                </form>
              )}
              {!showOTP && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or Sign Up with</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      onClick={handleGoogleSignup}
                      variant="outline"
                      className="py-2 px-4 flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <FcGoogle className="text-xl" />
                      <span>Google</span>
                    </Button>
                    <Button
                      onClick={handleLinkedinSignup}
                      variant="outline"
                      className="py-2 px-4 flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <FaLinkedin className="text-xl text-[#0A66C2]" />
                      <span>LinkedIn</span>
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base text-center mt-2">
                      <Link href="/Main/verifyotp" className="text-primary hover:underline">
                        Go to Verify OTP
                      </Link>
                </p>
                </>
              )}
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-15"></div>
              <Image
                src="/icons/dis.jpg"
                alt="Sign up illustration"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 flex justify-center p-6">
                <div className="text-white text-center">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
