"use client";
import React, { useState, useEffect } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import { isAuthenticated } from '@/lib/config';

  const Avatar = ({ username }:{username:string}) => {
    const userInitial = username.charAt(0).toUpperCase();
  
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold cursor-pointer select-none">
        {userInitial}
      </div>
    );
  };
  enum Role{
    admin,
    alumni,
    student
  }
  interface userData{
    userId:string,
    username:string,
    email:string,
    role : Role,
  }
  
  const Appbar = () => {
    const [isUserExisted, setIsUserExisted] = useState(false);
    const [userData, setUserData] = useState<null|userData>();
    const router = useRouter();
    const pathname = usePathname(); // Use usePathname to get the current path
  
    useEffect(() => {
      const getUserData = async () => {
        const response = await isAuthenticated();
        if (!response || response.status !== 200) {
          return;
        }
        setIsUserExisted(true);
        setUserData(response.data);
      };
      getUserData();
    }, []);
  
    const getNavLinkClass = (path: string) => {
      return pathname === path
        ? "text-purple-600 border-b-2 border-purple-600 pb-1"
        : "text-gray-600";
    };
  
    return (
      <div>
        <header className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <i className="fas fa-heart text-purple-600 text-2xl"></i>
            <h1 className="text-xl font-bold">Legacy Builders</h1>
          </div>
  
          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            <div className={getNavLinkClass("/")}>Home</div>
            <button onClick={() => router.push("/events")} className={getNavLinkClass("/events")}>
              Events
            </button>
            <button onClick={() => router.push("/success-tales")} className={getNavLinkClass("/success-tales")}>
              Success Tales
            </button>
            <button onClick={() => router.push("/alumni-spotlight")} className={getNavLinkClass("/alumni-spotlight")}>
              Alumni Spotlight
            </button>
            <button onClick={() => router.push("/innovation-hub")} className={getNavLinkClass("/innovation-hub")}>
              Innovation Hub
            </button>
          </nav>
  
          {/* User Avatar and Icons */}
          <div className="flex items-center space-x-4">
            {isUserExisted && userData ? (
            
              <Avatar username={userData.username} />
            ) : (
              <button
                onClick={() => {
                  router.push("/signin");
                }}
                className="text-purple-600 border border-purple-600 py-1 px-3 rounded hover:bg-purple-50"
              >
                Login
              </button>
            )}
            <i className="fas fa-bell text-gray-600"></i>
            <i className="fas fa-envelope text-gray-600"></i>
            <i className="fas fa-user text-gray-600"></i>
          </div>
        </header>
      </div>
    );
  };
  
  export default Appbar;