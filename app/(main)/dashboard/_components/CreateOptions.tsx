import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CreateOptions = () => {
  return (
    <div className='grid grid-cols-2 gap-5'>
        <Link href="/dashboard/create-interview">
          <div className='cursor-pointer bg-white border border-gray-200 rounded-lg p-5'>
              <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
              <h2 className='font-bold'>Create New Interview</h2>
              <p className='text-gray-500'>Create AI Interviews and schedule them with Candidates.</p>
          </div>
      </Link >
        <div className='bg-white border border-gray-200 rounded-lg p-5'>
            <Phone className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
            <h2 className='font-bold'>Create Phine Screening Call</h2>
            <p className='text-gray-500'>Schedule phone screening call with Candidates.</p>
        </div>
    </div>
  )
}

export default CreateOptions