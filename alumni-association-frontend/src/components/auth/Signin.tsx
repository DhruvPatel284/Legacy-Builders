// pages/signin.tsx
import { useState, useRef } from 'react';
import Link from 'next/link';
import { BACKEND_URL } from '@/lib/config';
import axios from 'axios';
import { toast } from "react-hot-toast"; 
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  // Refs to handle focus
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/users/signin`,inputs);

      if (response.status == 200) {
        toast.success("Login Successfully");
        router.push("/");
      } else {
        toast.error('Signin failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signin:', error);
      alert('An error occurred during signin. Please try again later.');
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Sign In</div>
            <div className="text-slate-500 mt-3">
              Dont have an account
              <Link href="/signup" className="pl-2 underline">
                Sign up
              </Link>
            </div>
          </div>
          <div className="pt-2">
            <div>
              <label className="block mb-2 text-sm text-black font-bold pt-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="dhruv156328@gmail.com"
                value={inputs.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && passwordInputRef.current) {
                    passwordInputRef.current.focus(); // Move to the next input field
                  }
                }}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-black font-bold pt-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                ref={passwordInputRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="123456"
                value={inputs.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(); // Submit the form
                  }
                }}
                required
              />
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
