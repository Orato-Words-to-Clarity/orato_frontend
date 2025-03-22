'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EnterOtp() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false); // Track mount state

  // Ensure useEffect is only called client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call API to verify OTP
    setMessage('OTP verified successfully');
    
    // Navigate to the resetPassword page after a short delay to show the message
    setTimeout(() => {
      window.location.href = "/resetPassword"; // Redirect to resetPassword page
    }, 1000); // 1 second delay to allow the message to be shown
  };

  if (!mounted) {
    return null; // Ensure the component renders only after it has mounted
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <Label htmlFor="otp" className="mb-2">OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-black"
          >
            Verify OTP
          </Button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
}
