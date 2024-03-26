"use server"

import { auth } from "@/auth";

 export  const getAuth =   ()=>{
    
    const data =  auth();
    return data
  }
