import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/config";
import { toast, Toaster } from "react-hot-toast"; 
import { isAuthenticated } from "@/lib/config";

export default function Signup() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const router = useRouter();



  const handleChange = (e:any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/users/signup`, inputs);
      if (response.status == 200) {
        toast.success("Account Created SuccessFully");
        router.push("/");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-500 mt-3">
              Already have an account?
              <Link href="/signin" className="pl-2 underline">
                Sign in
              </Link>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="pt-2">
            <div>
              <label className="block mb-2 text-sm text-black font-bold pt-2">
                Username
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Dhruv Patel"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-black font-bold pt-2">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="dhruv156328@gmail.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-black font-bold pt-2">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="123456"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-black font-bold pt-2">
                Role
              </label>
              <select
                onChange={handleChange}
                name="role"
                value={inputs.role}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="admin">admin</option>
                <option value="alumni">alumni</option>
                <option value="student">student</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
