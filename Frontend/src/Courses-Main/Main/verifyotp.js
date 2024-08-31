'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/public/ui/button"
import { Input } from "@/public/ui/input"
import { Label } from "@/public/ui/label"
import toast from "react-hot-toast";
import { Loader2, CheckCircle2 } from 'lucide-react'
import Layout from './layout'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import { verifyOTP, resendOTP } from '@/redux/slices/authSlice'

export default function OtpVerificationForm() {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isResend, setIsResend] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setOtp(e.target.value.replace(/\D/g, '')) // Allow only digits
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate OTP
    if (otp.length !== 4) {
      toast("Please enter a 4-digit OTP.");
      return
    }

    setIsLoading(true)
    const response = await dispatch(verifyOTP({otp}))
    if (response.payload?.data?.statusCode === 200) {
      setOtp('');
      setIsVerified(true);
      router.push('/dash-admin/tests');
    }
    setIsVerified(false)
    setIsLoading(false)
  }

  const handleSendOTP = async() => {
    
  }

  const handleResendSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter a valid email.")
      return
    }
    const response = await dispatch(resendOTP({email}))
    console.log(response.payload?.data, "user data")
    if(response.payload?.data?.statusCode === 200) {
      toast.success("OTP resent successfully!")
      setIsResend(false)
      return
    }
    toast.error("Failed to resend OTP.")
    setIsResend(false)
  }

  return (
    <Layout>
      <Head>
        <title>Verify OTP</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-700">OTP Verification</h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <Label htmlFor="otp" className="block text-gray-700">One-Time Password</Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={otp}
                onChange={handleChange}
                placeholder="Enter 4-digit OTP"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={isLoading || isVerified}
                aria-invalid={otp.length > 0 && otp.length !== 4}
                aria-describedby="otp-error"
              />
              {otp.length > 0 && otp.length !== 4 && (
                <p id="otp-error" className="mt-1 text-sm text-red-600">Please enter a 4-digit OTP.</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoading || isVerified || otp.length !== 4}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : isVerified ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Verified
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>
          </form>

          <Button 
            onClick={() => setIsResend(true)}
            className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Resend OTP
          </Button>

          {isResend && (
            <form onSubmit={handleResendSubmit} className="mt-6">
              <div className="mb-4">
                <Label htmlFor="email" className="block text-gray-700">Enter your email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send OTP
              </Button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  )
}
