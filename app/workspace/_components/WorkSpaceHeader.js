import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

function WorkSpaceHeader({fileName}) {
  return (
    <div className='p-4 shadow-md flex justify-between items-center'>
       <Image src="/logo.svg" width={170} height={120} alt="logo" />
       <h2 className='font-bold text-center mr-[8rem]'>{fileName}</h2>
       <div className='flex gap-2 items-center'>
        <Button size={"sm"}>Save</Button>
        <UserButton/>
       </div>
       
      
    </div>
  )
}

export default WorkSpaceHeader