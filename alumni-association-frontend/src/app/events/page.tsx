"use client"
import EventPage from "@/components/events/EventPage";
import { useState,useEffect } from "react";

export default function events(){

  return (
    <div>
        <div className="flex justify-center">
            <div>
                <EventPage />
            </div>
        </div>
    </div>
  )
}