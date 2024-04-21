import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string().optional(),

  name: z.string(),
  tags: z.array(z.string()).nullable(),
  description: z.string(),
  createdDate: z.date(),
  startDate: z.date(),
  endDate: z.date(),
  repeat: z.string(),
  timesDone: z.number().int().optional().default(0),
  isPending: z.boolean().optional().default(false),
  isDone: z.boolean().optional().default(false),
  userUid: z.string(),
  folderName: z.string(),
});
export const TasksSchema = z.array(TaskSchema);
export const TaskFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  tags: z.array(z.string()).optional(),
  description: z.string().default(""),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  repeat: z.enum(["never", "daily", "weekly", "monthly"]).optional(),
});
