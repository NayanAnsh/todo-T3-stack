import * as z from "zod";

export const FolderSchema = z.object({
    userId: z.string(),
    name: z.string().min(1,{
        message:"folder name too short"
    }).max(10,{
        message:"folde name too long"
    })
   
  });
