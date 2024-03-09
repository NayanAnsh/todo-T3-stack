import { auth, signOut } from "@/auth";
import Button from "@/components/Button";
import MenuButton from "@/components/menuButton";
import Image from "next/image";
import Link from "next/link";
const handleSignOut = async ()=>{
  "use server";
  console.log("clicked")
  await signOut();
  console.log("Sign out successful")
}
 const Home= async() => {
  const session = await auth();
  console.log("444")
  console.log(session)
 
  return (
    <main className="h-full">
      <div className=" h-full">
        <div className="w-full flex space-y-4 flex-col items-center  ">
          <div className=" flex w-full " >

          <h2 className="p-2 w-10/12 text-3xl  text-center border-b-2  ">
            Plan Your Day
          </h2>
          <div  className=" ">

          {session ? 
          <form className="cursor-pointer" action={handleSignOut}   >
            <button type="submit"    >Sign out</button>
            </form>
           :<div>
           <Link href="/login"  >Login </Link>
           </div>
           }
          </div>
          
          </div>
          <div className="flex w-full px-4  space-x-2 items-center    ">
            <p>Filter:</p>
            <div className="flex space-x-2">
              <MenuButton label="All" />
              <MenuButton label="H.W" />
              <MenuButton label="Study" />
              <MenuButton label="Health" />
            </div>
          </div>
        </div>

        <div className="h-full">
          <div className="flex p-8 w-full text-center justify-between ">
            <div className="w-full">
              <p>Pending</p>
              <div className="h-full  w-full ">
                <Button label="df" />
              </div>
            </div>
            <div className="w-full">
              <p>Ongoing</p>
            </div>
            <div className="w-full">
              <p>Done</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Home

