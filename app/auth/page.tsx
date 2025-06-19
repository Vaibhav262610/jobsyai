"use client"

import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import Image from 'next/image'
import React from 'react'

const page = () => {

 const signinWithGoogle = async () => {
  if (!supabase) {
    console.error('Database connection not available')
    return
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_HOST_URL+'/dashboard' // or your deployed URL
    }
  })

  if (error) {
    console.error("ERROR IN LOGGING", error.message)
  }
}



  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <div className='flex flex-col items-center border rounded-2xl p-8'>
            <Image src={'/logo.png'} alt='login' height={200} width={200} className='mb-2' />
          {/* <h1 className='text-3xl font-black uppercase '>AiCruiter</h1> */}
          <div className='flex flex-col items-center'>
            <Image src={'/login.png'} alt='login' height={400} width={400} className='rounded-2xl' />
            <h2 className='text-2xl text-center font-bold mt-5'>Welcome to AiCruiter</h2>
            <p className='text-gray-500 text-center'>Sign In With Google Authentication</p>
            <Button onClick={signinWithGoogle} className='mt-7 w-full'>Login with Google</Button>
          </div>
      </div>
    </div>
  )
}

export default page