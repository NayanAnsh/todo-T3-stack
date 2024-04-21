"use client";
import { updateTaskStatus } from "@/actions/tasks";
import React, { useState, useTransition } from "react";
import { Checkbox } from "./ui/checkbox";

const TaskCheckBox = ({
  taskId,
  status,
  targetStatus,
}: {
  targetStatus: "isPending" | "isDone";
  taskId: string;
  status: boolean;
}) => {
  const [isPending, startTransion] = useTransition();
  const [checkboxValue, setCheckBoxValue] = useState(status);
  console.log("sdf");
  const handleCheckBoxClick = () => {
    console.log("dsfsf");
    setCheckBoxValue(!checkboxValue);
    startTransion(async () => {
      console.log(checkboxValue);
      await updateTaskStatus({
        status: targetStatus,
        value: !checkboxValue,
        taskId: taskId,
      });
    });
  };
  return (
    <div className="flex rounded-lg items-center max-h-5 p-4 ps-4 border border-gray-200  dark:border-gray-700">
      <Checkbox
        disabled={isPending}
        id={`bordered-checkbox-${targetStatus}`}
        checked={checkboxValue}
        onCheckedChange={handleCheckBoxClick}
        name={`bordered-checkbox-${targetStatus}`}
        className="w-4 cursor-pointer h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />

      <label
        htmlFor={`bordered-checkbox-${targetStatus}`}
        className="w-full cursor-pointer py-4 ms-2 text-[8px] md:text-sm font-medium text-testhighLight-500 "
      >
        {targetStatus == "isDone" ? "Done" : "Ongoing"}
      </label>
    </div>
  );
};

export default TaskCheckBox;
