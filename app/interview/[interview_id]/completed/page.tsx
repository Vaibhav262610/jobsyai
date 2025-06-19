"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, Star, ThumbsUp, MessageSquare, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import Link from 'next/link'

const InterviewComplete = () => {
  const { interview_id } = useParams()



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-bold dark:text-white mb-2">Interview Completed!</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Thank you for completing the interview.
            </p>
            <Link href={'/dashboard'}>
              <Button variant={'outline'} className='mt-5'>Back To Dashboard</Button>
            </Link>
          </div>
        </motion.div>          
      </div>
    </div>
  )
}

export default InterviewComplete