"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { TaskFormSchema, TaskSchema } from "@/schemas/TaskSchema";
import { useEffect, useState } from "react";
import { addTastToUser } from "@/actions/tasks";
import { create } from "domain";
import { getAuth } from "@/actions/getAuth";
import { auth } from "@/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  data: z.string(),
});
const TaskInput = ({ folderName }: { folderName: string }) => {
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [tags, setTags] = useState<string[]>([""]);
  const [session, setSession] = useState<any>();
  const router = useRouter();

  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      name: "",
      description: "",
      endDate: new Date(new Date().toISOString().split("T")[0]),
      // folderName:" ",
      repeat: "never",
      startDate: new Date(new Date().toISOString().split("T")[0]),
      tags: tags,
    },
  });
  useEffect(() => {
    const func = async () => {
      const data = await getAuth();
      setSession(data);
    };
    func();
    return;
  }, [auth]);

  function onSubmit(values: z.infer<typeof TaskFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(tags);
    values.tags = tags;

    if (!values.repeat || !values.tags || !values.startDate || !values.endDate)
      return;
    const additionalData = {
      ...values,

      createdDate: new Date(new Date().toISOString().split("T")[0]),
      userid: session?.user.id as string,
      folderName: folderName as string,
    };
    // @ts-ignore //The code is wroking properly
    addTastToUser(additionalData);
  }
  return (
    <div className="p-16">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>task name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    placeholder={new Date().toISOString()}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target?.value)}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    placeholder={new Date().toISOString()}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target?.value)}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat</FormLabel>
                <FormControl>
                  <select className="px-4" {...field}>
                    <option value="never">Never</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    onChange={(e) => setTags(e.target?.value.split(","))}
                    placeholder="tags"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default TaskInput;
