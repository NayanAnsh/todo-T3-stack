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
export const updateTaskStatus = async ({
  status,
  value,
  taskId,
}: {
  status: "isPending" | "isDone";
  value: boolean;
  taskId: string;
}) => {
  try {
    let res;
    if (status === "isPending") {
      res = await db.task.update({
        where: { id: taskId },
        data: { isPending: value },
      });
    } else {
      res = await db.task.update({
        where: { id: taskId },
        data: { isDone: value },
      });
    }
    console.log("rtryu34567897656432245");
    console.log(res);
  } catch (error) {
    console.log("Error in handling update");
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
