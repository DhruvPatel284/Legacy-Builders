"use client"
import Signin from "@/components/auth/Signin";
import { useState,useEffect } from "react";

export default function signup(){

  return (
    <div>
        <div className="flex justify-center">
            <div>
                <Signin />
            </div>
        </div>
    </div>
  )
}