"use server";
import { db } from "@/lib/db";
import { stringError } from "@/schemas/ErrorsSchema";
import { TaskSchema, TasksSchema } from "@/schemas/TaskSchema";
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
export const getAllTaskOfUser = async (
  userUid: string | undefined
): Promise<z.infer<typeof TasksSchema> | z.infer<typeof stringError>> => {
  try {
    if (!userUid) return { error: "Please log in" };
    const res = await db.task.findMany({
      where: { userUid: userUid },
    });
    console.log(res);
    const response = TasksSchema.safeParse(res);
    if (!response.success) {
      return { error: "No tasks found" };
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: "Server error" };
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
export const updateTaskBothStatus = async ({
  doneVal,
  pendingVal,
  taskId,
}: {
  doneVal: boolean;
  pendingVal: boolean;
  taskId: string;
}) => {
  try {
    const res = await db.task.update({
      where: { id: taskId },
      data: { isPending: pendingVal, isDone: doneVal },
    });
    console.log("1234567");
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addTastToUser = async (values: z.infer<typeof TaskSchema>) => {
  const validatedFields = TaskSchema.safeParse(values);
  console.log("-------+++====");
  console.log(values);
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
        userUid: data.userUid,
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
