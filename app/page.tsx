import { getAllTaskOfUser } from "@/actions/tasks";
import { auth, signOut } from "@/auth";
import Button from "@/components/Button";
import MenuButton from "@/components/menuButton";
import PaginationComponent from "@/components/pagination";
import Pagination from "@/components/pagination";
import TasksDnd from "@/components/tasksDnd";
import { TaskFormSchema, TaskSchema, TasksSchema } from "@/schemas/TaskSchema";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
const handleSignOut = async () => {
  "use server";
  console.log("clicked");
  await signOut();
  console.log("Sign out successful");
};
const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await auth();
  const tasks = await getAllTaskOfUser(session?.user?.id);

  console.log(tasks);

  return (
    <main className="h-full ">
      <div className=" h-full ">
        <div className="w-full flex space-y-4 flex-col items-center  ">
          <div className=" flex w-full ">
            <h2 className="p-2 w-10/12 text-3xl text-center border-b-2  ">
              Plan Your Day
            </h2>
            <div className=" ">
              {session ? (
                <form className="cursor-pointer" action={handleSignOut}>
                  <button type="submit">Sign out</button>
                </form>
              ) : (
                <div>
                  <Link href="/login">Login </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {session?.user?.id && <TasksDnd userUid={session?.user?.id} />}
      </div>
    </main>
  );
};
export default Home;
