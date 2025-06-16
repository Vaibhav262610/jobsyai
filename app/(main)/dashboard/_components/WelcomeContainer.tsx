"use client"

import { useUser } from '@/app/provider'
import Image from 'next/image';
import React from 'react'


const WelcomeContainer = () => {

    const { user }= useUser(); 

  return (
    <div>
        <div className='flex justify-between bg-white p-5 rounded-2xl items-center'>
            <div>
                <h2 className='text-lg font-bold'>Welcome Back, {user?.user_metadata?.name} </h2>
                <h2 className='text-gray-500'>AI-Driven Interviews, Hassel-Free Hiring  </h2>
            </div>
       {user?.user_metadata?.picture?.trim() ? (
           <Image
            src={user.user_metadata.picture}
            alt="pfp"
            width={40}
            height={40}
            className="rounded-full object-cover"
            />
        ) : null}
        </div>
    </div>
  )
}

export default WelcomeContainer