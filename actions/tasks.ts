"use server";
import { db } from "@/lib/db";
import { TaskFormSchema, TaskSchema } from "@/schemas/TaskSchema";
import { z } from "zod";

export const getTasksByFolderName = async (folderName: string) => {
  try {
    const res = await db.task.findMany({ where: { folderName: folderName } });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addTastToUser = async (values: z.infer<typeof TaskSchema>) => {
  const validatedFields = TaskSchema.safeParse(values);
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    console.log("Type script failed");

    return { error: "Type script failed" };
  }
  const data = validatedFields.data;
  console.log("----------");
  console.log(data);
  try {
    const res = await db.task.create({
      data: {
        description: data.description,
        endDate: data.endDate,
        name: data.name,
        repeat: data.repeat,
        startDate: data.startDate,
        userUid: data.userid,
        createdDate: data.createdDate,
        folderName: data.folderName,
        tags: data.tags ?? undefined,
        timesDone: 0,
      },
    });
    console.log("task added");
  } catch (error) {
    console.log(error);
  }
};
