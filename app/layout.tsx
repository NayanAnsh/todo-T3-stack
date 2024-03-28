"use client";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";

import { createFolder, getFoldersByUser } from "@/actions/folder";
import { getAuth } from "@/actions/getAuth";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderSchema } from "@/schemas/folderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BsPlusCircleDotted } from "react-icons/bs";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [session, setSession] = useState<any>();
  const [folders, setFolder] = useState<any>();
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isFolderAddFormOpen, setFolderAddForm] = useState(false);
  const [isPending, startTransion] = useTransition();
  const [isFolderUpdated, setFolderUpdated] = useState(false);

  useEffect(() => {
    const func = async () => {
      const data = await getAuth();
      setSession(data);
    };
    func();
    return;
  }, [auth]);
  useEffect(() => {
    const func = async () => {
      if (!session) return;
      const data = await getFoldersByUser(session.user.id);
      setFolder(data);
    };
    func();
    return;
  }, [session, isFolderUpdated]);

  const handleAddFolderClick = () => {
    console.log("clikec");

    console.log(session);
    setFolderAddForm(true);
  };
  const Folderform = useForm<z.infer<typeof FolderSchema>>({
    resolver: zodResolver(FolderSchema),
    defaultValues: {
      name: " ",
      userId: "fdfdg",
    },
  });
  const onSubmit = (values: z.infer<typeof FolderSchema>) => {
    console.log("324567890");
    values.userId = session.user.id;
    const data = createFolder(values);

    setFolderAddForm(false);
    setFolderUpdated(!isFolderUpdated);
    if (!data) return;
  };

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className="w-full flex   ">
        <MantineProvider>
          <div className="flex w-full ">
            <div className="w-1/3 border-r-2 h-screen ">
              <div id="Profile" className=" border-b-2 m-2 flex space-x-4 p-8">
                <Avatar radius="lg" src={session?.user?.image} size="lg" />
                <div className="flex  justify-center flex-col">
                  <p>{session ? session.user?.name : "Guest"}</p>
                  <p>Premium</p>
                </div>
              </div>
              <div className="relative   ">
                <div className="flex overflow-y-auto overflow-x-hidden  space-y-2 items-center w-full flex-col ">
                  <Link className="w-full flex justify-center  px-2" href={"/"}>
                    <Button variant={"sidebar"}>Tasks</Button>
                  </Link>
                  <Link
                    className="w-full px-2 flex  justify-center"
                    href={"calender"}
                  >
                    <Button variant={"sidebar"}>Calender</Button>
                  </Link>
                  {folders &&
                    folders?.map((folder: any, index: number) => {
                      return (
                        <Link
                          key={index}
                          className="w-full px-2"
                          href={`../folder/${folder.name.trim()}`}
                        >
                          {" "}
                          <Button
                            className="w-full"
                            key={index}
                            variant={"sidebar"}
                          >
                            {folder.name}
                          </Button>{" "}
                        </Link>
                      );
                    })}

                  <Button
                    variant={"sidebar"}
                    className="transition-all"
                    onClick={handleAddFolderClick}
                  >
                    <BsPlusCircleDotted size={30} />
                  </Button>
                  <div
                    className={`${
                      !isFolderAddFormOpen ? "hidden transition-all m-4" : ""
                    }`}
                  >
                    <Form {...Folderform}>
                      <form
                        onSubmit={Folderform.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        <div className="space-y-4">
                          <FormField
                            control={Folderform.control}
                            name="name"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <FormLabel>Folder name</FormLabel>
                                  <FormControl>
                                    <Input
                                      disabled={isPending}
                                      {...field}
                                      placeholder="Folder name"
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        {/* <FormError message={error} />
          <FormSuccess message={success} /> */}
                        <Button type="submit" className="w-full">
                          Add
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full">{children}</div>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
};
export default RootLayout;
