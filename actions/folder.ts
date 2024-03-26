"use server";
import { FolderSchema } from "@/schemas/folderSchema";
import { PrismaClient } from "@prisma/client";

import { db } from "@/lib/db";
import { z } from "zod";
import { error } from "console";

// Create a new folder
export const createFolder = async(values:z.infer<typeof FolderSchema>)=>{
        const validatedFields = FolderSchema.safeParse(values)
        console.log("-----234567890---------")
        console.log(validatedFields)
        if(!validatedFields.success){
            return {error:"Invalid fields"}
        } 
        try {
            const {userId,name} = validatedFields.data
            await db.folder.create({
                    data:{userId:userId,name:name}
            })
            
            console.log("created")
            return {success : "folder created"}
        } catch (error) {
            console.log(error)
            return {error : error}
        }
        


}
export const getFoldersByUser = async(userId:string)=>{
    try {
        const res = await db.folder.findMany({where:{
            userId:userId
        }})
        return res
    } catch (error) {
        console.log(error)
    }
}