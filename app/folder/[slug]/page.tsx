import { getFoldersByUser } from "@/actions/folder";
import { getTasksByFolderName } from "@/actions/tasks";
import TaskCheckBox from "@/components/TaskCheckBox";
import TaskInput from "@/components/taskInputForm";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskSchema } from "@/schemas/TaskSchema";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

const Login_page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  let tasks;
  if (slug != null) {
    tasks = (await getTasksByFolderName(slug)) || [];
  }
  // useEffect(()=>{
  //     const func = async ()=>{

  //         console.log(data)
  //         setTask(data)
  //     }
  //     func()
  // },[])

  return (
    <div className="">
      {tasks && tasks?.length != 0 ? (
        tasks.map(
          (task: {
            name: string;
            createdDate: Date;
            startDate: Date;
            endDate: Date;
            tags: string[];
            description: string;
            id: string;
            isDone: boolean;
            isPending: boolean;
          }) => {
            console.log(task);

            return (
              <div className=" m-8 flex max-w-xl bg-gray-100 justify-between text-textmain-500 p-6 rounded-lg shadow-md">
                <div>
                  <h2 className="text-2xl font-bold mb-4">{task.name}</h2>
                  <p className="text-sm mb-2">
                    Created Date:{" "}
                    {new Date(task.createdDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm mb-2">
                    Start Date: {new Date(task.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm mb-2">
                    End Date: {new Date(task.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm mb-4">
                    Description: {task.description}
                  </p>
                  <div className="flex space-x-2">
                    {task.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-testhighLight-500 text-textmain-50 rounded-md text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <TaskCheckBox
                    targetStatus={"isDone"}
                    status={task.isDone}
                    taskId={task.id}
                  />
                  <TaskCheckBox
                    targetStatus={"isPending"}
                    status={task.isPending}
                    taskId={task.id}
                  />
                </div>
              </div>
            );
          }
        )
      ) : (
        <div className="bg-secodarybackground-500 mx-auto max-w-2xl m-8 text-textmain-50 p-6 rounded-lg shadow-md text-center">
          No tasks available.
        </div>
      )}
      {slug && <TaskInput folderName={slug.toString()} />}
    </div>
  );
};

export default Login_page;
