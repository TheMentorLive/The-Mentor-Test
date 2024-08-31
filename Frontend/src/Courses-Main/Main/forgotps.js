'use client'

import Link from "next/link";
import Layout from "./layout";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/redux/slices/authSlice";
import Image from "next/image";
import Head from 'next/head';
import { useState } from "react";
import { Label } from "@/public/ui/label";
import { Input } from "@/public/ui/input";
import { Button } from "@/public/ui/button";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const response = await dispatch(forgotPassword({ email }));
    if (response) {
      setEmail(""); 
    }
  };

  return (
    <Layout>
      <Head>
        <title>Reset Password</title>
      </Head>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Left side */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <Link 
                href="/Main" 
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors" 
                prefetch={false}
              >
                <svg
                  className="w-4 h-4 mr-2"
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
                Back to Main
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6">
              <h1 className="text-3xl font-bold text-gray-900 text-center">Forgot Password</h1>
              <p className="text-gray-600 text-center">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
              <form className="space-y-6" onSubmit={handleResetPassword}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Reset Password
                </Button>
              </form>
              <div className="text-center">
                <span className="text-sm text-gray-600">Remember your password? </span>
                <Link 
                  href="/Main/login" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - full screen image */}
        <div className="hidden md:flex flex-1 bg-blue-100 items-center justify-center p-8">
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/forgotpass.jpg"
              alt="Forgot Password Illustration"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}