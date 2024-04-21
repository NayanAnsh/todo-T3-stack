"use client";
import React, { useState } from "react";
import TaskInput from "./taskInputForm";
import { Button } from "./ui/button";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Modal } from "@mantine/core";

const AddTask = ({ folderName }: { folderName: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <div className="flex justify-center">
        <Button onClick={handleClick} variant={"sidebar"} className="max-w-32 ">
          {" "}
          Add Task
        </Button>
      </div>
      <div className={` ${isOpen ? "block" : "hidden"}   `}>
        {folderName && <TaskInput folderName={folderName} />}
      </div>
    </>
  );
};

export default AddTask;
