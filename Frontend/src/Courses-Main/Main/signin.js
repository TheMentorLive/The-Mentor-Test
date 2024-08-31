'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from 'react'
import { toast } from "react-toastify"
import { Label } from "@/public/ui/label"
import { Input } from "@/public/ui/input"
import { Button } from "@/public/ui/button"
import Head from 'next/head'
import Layout from "./layout"
import { login, googleSinup, linkedinSignup } from "@/redux/slices/authSlice"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { FcGoogle } from "react-icons/fc"
import { FaLinkedin } from "react-icons/fa"

export default function Component() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlegoogleLogin = async () => {
    await dispatch(googleSinup())
  }

  const handleLinkedInLogin = async () => {
    await dispatch(linkedinSignup())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please fill all the details")
      return
    }
    const response = await dispatch(login({ email, password }))
    console.log(response)
    setEmail("")
    setPassword("")
    console.log("response", response)
    console.log("response", response.payload)
    if (response) {
      if(response.payload?.data?.data?.user?.role === 'admin'){
        router.push("/dash-admin/DashboardPage")
      } else if(response.payload?.data?.data?.user?.role === 'user') {
        router.push("/dash-admin/tests")
      }
    }
  }

  return (
    <Layout>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 space-y-6">
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
              <h1 className="text-3xl font-bold text-gray-900 text-center">Sign In</h1>
              <p className="text-gray-600 text-center">
                Don&apos;t have an account?{" "}
                <Link href="/Main/signup" className="text-primary hover:underline" prefetch={false}>
                  Create one
                </Link>
              </p>
              
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-dark">
                  Sign In
                </Button>
                <Link href="/Main/forgotps" className="text-primary hover:underline text-sm text-center" prefetch={false}>
                  Forgot Password?
                </Link>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or Sign In with</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                onClick={handlegoogleLogin}
                variant="outline"
                className="py-2 px-4 flex items-center justify-center gap-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="text-xl" />
                <span>Google</span>
              </Button>
              <Button
                onClick={handleLinkedInLogin}
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
          </div>
          <div className="hidden md:block w-1/2 relative">
            <Image
              src="/icons/signup.jpg"
              alt="Modern design illustration"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-10"></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}