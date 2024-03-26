import React from 'react'
import { Image } from '@mantine/core';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import PlaySvgComponent from './assets/svg/playbutton';
  //https://placehold.co/600x400
const CardComponent = () => {
  return (
    <div>

<Card >
  <CardHeader> 
    <CardTitle>01</CardTitle>
    <CardDescription>something </CardDescription>
  </CardHeader>
  <CardContent>
    <Image  className=' h-[250px] lg:h-[400px]'  radius={"md"}  src={"https://placehold.co/200x200"} />
    <h1 className='font-bold text-2xl  my-2  ' >Project Name</h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam necessitatibus reprehenderit quo molestiae quia impedit quae adipisci totam ab delectus.</p>
  </CardContent>
  <CardFooter>
    <div className='w-12 absolute -bottom-6  '  >

    <PlaySvgComponent/>
    </div>
  </CardFooter>
</Card>

    </div>
  )
}

export default CardComponent