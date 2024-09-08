"use client"
import Signup from "@/components/auth/Signup";
import { useState,useEffect } from "react";

export default function signup(){

  return (
    <div>
        <div className="flex justify-center">
            <div>
                <Signup />
            </div>
        </div>
    </div>
  )
}