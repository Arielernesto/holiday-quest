import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { initSessionToken } from "@/app/actions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function IdentifyUser(){
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const visitorId = result.visitorId;
      const token = await initSessionToken()
      const verify = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quest/verify/${visitorId}`,  {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const isVerified = await verify.json()
      if(isVerified && isVerified.status === true){
        localStorage.setItem("dev-survey-2025-completed", "true")
      }
      return visitorId;
      console.log("Visitor ID:", visitorId);
}