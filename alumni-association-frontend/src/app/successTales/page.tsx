"use client"
import Signin from "@/components/auth/Signin";
import { useState,useEffect } from "react";

export default function successTales(){

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