"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import MenuButton from "./menuButton";
import { z } from "zod";
import { TaskSchema, TasksSchema } from "@/schemas/TaskSchema";
import { stringError } from "@/schemas/ErrorsSchema";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Droppable from "./dragNDrop/Droppable";
import Draggable from "./dragNDrop/Draggable";
import {
  getAllTaskOfUser,
  updateTaskBothStatus,
  updateTaskStatus,
} from "@/actions/tasks";
const TasksDnd = ({
  userUid,
}: {
  //   data: z.infer<typeof TasksSchema> | z.infer<typeof stringError>;
  userUid: string;
}) => {
  const [tasks, setTasks] = useState<z.infer<typeof TasksSchema>>([]);
  const [todoTasks, setTodoTasks] = useState<z.infer<typeof TasksSchema>>([]);
  const [onGoingTasks, setOnGoingTasks] = useState<z.infer<typeof TasksSchema>>(
    []
  );
  const [isPending, startTransion] = useTransition();
  const [doneTasks, setDoneTasks] = useState<z.infer<typeof TasksSchema>>([]);
  useEffect(() => {}, []);
  useEffect(() => {
    const populateData = async () => {
      const data = await getAllTaskOfUser(userUid);
      const ValidatedTasks = TasksSchema.safeParse(data);
      if (!ValidatedTasks.success) {
        console.log("failed");
        return;
      }

      const tasks = ValidatedTasks.data;
      setTasks(tasks);
      const Todo = tasks.filter((task) => {
        if (!task.isPending && !task.isDone) return task;
      });
      const onGoing = tasks.filter((task) => {
        if (task.isPending && !task.isDone) return task;
      });
      const Done = tasks.filter((task) => {
        if (task.isDone) return task;
      });

      setTodoTasks(Todo);
      setOnGoingTasks(onGoing);
      setDoneTasks(Done);
    };
    populateData();
  }, []);
  const sortByEndDateFunc = (
    task1: z.infer<typeof TaskSchema>,
    task2: z.infer<typeof TaskSchema>
  ) => {
    const date1 = task1.endDate;
    const date2 = task2.endDate;
    if (date1.getTime() === date2.getTime()) {
      return 0;
    } else {
      return date1.getTime() < date2.getTime() ? -1 : 1;
    }
  };
  const adjustEndDate = (tasks: z.infer<typeof TasksSchema>) => {
    tasks.map((task) => {
      if (task.repeat == "daily") {
        task.endDate.setDate(task.endDate.getDate() + task.timesDone);
      } else if (task.repeat == "weekly") {
        task.endDate.setDate(task.endDate.getDate() + task.timesDone * 7);
      } else if (task.repeat == "monthly") {
        task.endDate.setMonth(task.endDate.getMonth() + task.timesDone);
      }
    });
    const temp = tasks;
    temp.sort(sortByEndDateFunc);

    return temp;
  };
  useEffect(() => {
    setTodoTasks(adjustEndDate(todoTasks));
    setOnGoingTasks(adjustEndDate(onGoingTasks));
    setDoneTasks(adjustEndDate(doneTasks));
  }, [todoTasks, onGoingTasks, doneTasks]);

  const transferTask = (addTo: string, taskId: string) => {
    startTransion(async () => {
      let doneVal;
      let pendingVal;
      if (addTo == "todo") {
        doneVal = false;
        pendingVal = false;
      } else if (addTo == "onGoing") {
        doneVal = false;
        pendingVal = true;
      } else if (addTo == "done") {
        doneVal = true;
        pendingVal = false;
      } else {
        //Default case
        console.log("Weired DND occoured ");
        doneVal = false;
        pendingVal = false;
      }
      await updateTaskBothStatus({
        doneVal: doneVal,
        pendingVal: pendingVal,
        taskId: taskId,
      });
    });
  };
  const addToDroppable = (task: z.infer<typeof TaskSchema>, id: string) => {
    if (id == "todo") {
      setTodoTasks([...todoTasks, task]);
      console.log(todoTasks);
    } else if (id == "onGoing") {
      setOnGoingTasks([...onGoingTasks, task]);
    } else if (id == "done") {
      setDoneTasks([...doneTasks, task]);
    }
  };

  function handleTodoDragEnd(event: DragEndEvent) {
    if (!event.over?.id) return;
    //active is what is object dragged id
    //over is on what the object was let go

    //From where object travelled
    const objectId = event.active.id;
    const fromOnGoing = onGoingTasks?.filter((task) => {
      if (task.id == objectId) return task;
    });
    const fromDone = doneTasks?.filter((task) => {
      if (task.id == objectId) return task;
    });
    const fromTodo = todoTasks?.filter((task) => {
      if (task.id == objectId) return task;
    });
    //Remove the Object from the travelled location
    //  and Add to target location
    if (fromOnGoing.length != 0) {
      if (event.over.id == "onGoing") return;
      addToDroppable(fromOnGoing[0], event.over.id.toString());
      setOnGoingTasks(
        onGoingTasks?.filter((task) => {
          if (task.id != objectId) return task;
        })
      );
    }
    if (fromTodo.length != 0) {
      if (event.over.id == "todo") return;
      setTodoTasks(
        todoTasks?.filter((task) => {
          if (task.id != objectId) return task;
        })
      );
      addToDroppable(fromTodo[0], event.over.id.toString());
    }
    if (fromDone.length != 0) {
      if (event.over.id == "done") return;
      setDoneTasks(
        doneTasks?.filter((task) => {
          if (task.id != objectId) return task;
        })
      );
      addToDroppable(fromDone[0], event.over.id.toString());
    }
    transferTask(event.over.id.toString(), objectId.toString());
  }
  let tempDateVariable: Date | undefined;
  let tempDateVariable2: Date | undefined;
  function formatDate(date: Date) {
    // Extract day, month, and year from the date object
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    // Concatenate day, month, and year with slashes
    return `${day}/${month}/${year}`;
  }
  return (
    <div>
      <div className="flex w-full px-4 py-4 space-x-2 items-center    ">
        <p>Filter:</p>
        <div className="flex space-x-2">
          <MenuButton label="All" />
          <MenuButton label="H.W" />
          <MenuButton label="Study" />
          <MenuButton label="Health" />
        </div>
      </div>

      <div className="h-full">
        <div className="flex p-8 w-full text-center justify-between ">
          <DndContext onDragEnd={handleTodoDragEnd}>
            <div className="w-full">
              <div className="flex  flex-col space-y-2 items-center">
                <p>Todo</p>

                <Droppable key={"todo"} id="todo">
                  <div className="flex min-h-24 min-w-24  flex-col">
                    {todoTasks &&
                      todoTasks.map((task) => {
                        let printEndDate: boolean = false;
                        if (
                          tempDateVariable == undefined ||
                          tempDateVariable?.getTime() != task.endDate.getTime()
                        ) {
                          tempDateVariable = task.endDate;
                          printEndDate = true;
                        }
                        return (
                          <Draggable
                            allowDrag={isPending}
                            id={task.id}
                            key={task.id}
                          >
                            {printEndDate && formatDate(tempDateVariable)}
                            <div className=" m-2 lg:w-96  p-4 border rounded shadow-md">
                              <h2 className="text-lg font-semibold mb-2">
                                {task.name}
                              </h2>
                              <p className="text-sm text-gray-600 mb-2">
                                {task.description.substring(0, 50)}
                                {task.description.length > 50 ? "..." : ""}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {task?.tags?.map((tag, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="border p-1 lg:text-md text-sm"
                                      >
                                        {tag}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">
                                Repeat: {task.repeat}
                              </p>
                            </div>
                          </Draggable>
                        );
                      })}
                  </div>
                </Droppable>
              </div>
            </div>
            <div className="w-full">
              <div className="flex  flex-col space-y-2 items-center">
                <Droppable key={"onGoing"} id="onGoing">
                  <p>OnGoing</p>
                  <div className="flex  min-h-24 lg:w-96  flex-col">
                    {onGoingTasks &&
                      onGoingTasks.map((task) => {
                        let printEndDate: boolean = false;
                        if (
                          tempDateVariable2 == undefined ||
                          tempDateVariable2?.getTime() != task.endDate.getTime()
                        ) {
                          tempDateVariable2 = task.endDate;
                          printEndDate = true;
                        }
                        return (
                          <Draggable
                            id={task.id}
                            allowDrag={isPending}
                            key={task.id}
                          >
                            {printEndDate && formatDate(tempDateVariable2)}

                            <div className=" m-2 p-4 border rounded shadow-md">
                              <h2 className="lg:text-lg text-sm font-semibold mb-2">
                                {task.name}
                              </h2>
                              <p className="text-sm text-gray-600 mb-2">
                                {task.description.substring(0, 50)}
                                {task.description.length > 50 ? "..." : ""}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-2">
                                {task?.tags?.map((tag, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="border p-1 lg:text-md text-sm"
                                    >
                                      {tag}
                                    </div>
                                  );
                                })}
                              </div>
                              <p className="text-sm text-gray-600">
                                Repeat: {task.repeat}
                              </p>
                            </div>
                          </Draggable>
                        );
                      })}
                  </div>
                </Droppable>
              </div>
            </div>
            <div className="w-full">
              <div className="flex   flex-col space-y-2 items-center">
                <Droppable key="done" id="done">
                  <p>Done</p>
                  <div className="flex  min-h-24 min-w-24  flex-col">
                    {doneTasks &&
                      doneTasks.map((task) => {
                        return (
                          <Draggable
                            allowDrag={isPending}
                            id={task.id}
                            key={task.id}
                          >
                            <div className=" m-2 p-4 lg:w-96 border rounded shadow-md">
                              <h2 className="text-lg font-semibold mb-2">
                                {task.name}
                              </h2>
                              <p className="text-sm text-gray-600 mb-2">
                                {task.description.substring(0, 50)}
                                {task.description.length > 50 ? "..." : ""}
                              </p>
                              {task.endDate.toString()}

                              <div className="flex flex-wrap gap-2 mb-2">
                                {task?.tags?.map((tag) => {
                                  return (
                                    <div className="border p-1">{tag}</div>
                                  );
                                })}
                              </div>
                              <p className="text-sm text-gray-600">
                                Repeat: {task.repeat}
                              </p>
                            </div>
                          </Draggable>
                        );
                      })}
                  </div>
                </Droppable>
              </div>
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default TasksDnd;
