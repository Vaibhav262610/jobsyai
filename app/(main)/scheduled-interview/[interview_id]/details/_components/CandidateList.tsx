import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'

const CandidateList = ({details}) => {


  return (
    <div className='p-5'>
        <h2 className='font-bold my-5'>Candidates ({details?.length})</h2>
        {details?.map((item,index)=>(
            <div key={index} className='p-5 bg-white rounded-lg justify-between flex items-center gap-3'>
                <div className='flex gap-5 items-center'>
                    <h2 className='bg-primary rounded-full px-4.5 font-bold text-white p-3'>{item?.userName[0]}</h2>
                    <div>
                        <h2 className='font-bold'>{item?.userName}</h2>
                        <h2 className='text-sm text-gray-500'>Completed On: {moment(item?.created_at).format("MMM DD YYY")}</h2>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <h2 className='text-green-600'></h2>
                    <Button variant={'outline'} className='text-primary'>View Report</Button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default CandidateList