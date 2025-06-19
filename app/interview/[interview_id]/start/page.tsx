"use client"

import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer, Volume2, VolumeX } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web'
import AlertConfirmation from './_components/AlertConfirmation'
import { toast } from 'sonner'
import axios from 'axios'
import { supabase } from '@/services/supabaseClient'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const StartInterview = () => {
  const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext)
  const vapi = new Vapi(process.env.NEXT_PUBLIC_API_KEY!)
  const [activeUser, setActiveUser] = useState(false)
  const [conversation, setConversation] = useState()
  const [isMuted, setIsMuted] = useState(false)
  const [timer, setTimer] = useState(0)
  const {interview_id} = useParams()
  const router = useRouter()

  useEffect(() => {
    interviewInfo && startCall()
  }, [interviewInfo])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeUser) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeUser])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startCall = () => {
    let questionList;
    interviewInfo?.interviewData?.questionList.forEach((item,index) =>  {
      questionList=item?.question+','+questionList
    })

    const assistantOptions = {
          name: "AI Recruiter",
          firstMessage: "Hi "+interviewInfo?.userName +", how are you? Ready for your interview on"+ interviewInfo?.interviewData?.jobPosition,
          transcriber: {
              provider: "deepgram",
              model: "nova-2",
              language: "en-US",
          },
          voice: {
              provider: "playht",
              voiceId: "jennifer",
          },
          model: {
              provider: "openai",
              model: "gpt-4",
              messages: [
                  {
                      role: "system",
                      content: `
        You are an AI voice assistant conducting interviews.
      Your job is to ask candidates provided interview questions, assess their responses.
      Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
      "Hey there! Welcome to your `+ interviewInfo?.interviewData?.jobPosition +` interview. Let's get started with a few questions!"
      Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
      Questions: `+questionList+`
      If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
      "Need a hint? Think about how React tracks component updates!"
      Provide brief, encouraging feedback after each answer. Example:
      "Nice! That's a solid answer."
      "Hmm, not quite! Want to try again?"
      Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
      After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
      "That was great! You handled some tough questions well. Keep sharpening your skills!"
      End on a positive note:
      "Thanks for chatting! Hope to see you crushing projects soon!"
      Key Guidelines:
      ✅ Be friendly, engaging, and witty 🎤
      ✅ Keep responses short and natural, like a real conversation
      ✅ Adapt based on the candidate's confidence level
      ✅ Ensure the interview remains focused on React
      `.trim(),
                  },
              ],
          },
      };


      vapi.start(assistantOptions)

  }
  
  vapi.on("call-start", () => {
    toast('Call Connected...')
    console.log("Call Started ");
  })

  vapi.on("call-end", () => {
    toast('Interview has ended')
    console.log("Call Ended ");
    GenerateFeedback()
  })

  vapi.on("speech-start", () => {
    setActiveUser(false)
    console.log("Assistant speech has started ");
  })

  vapi.on("speech-end", () => {
    setActiveUser(true)
    console.log("Assistant speech has ended ");
    
  })
  
  vapi.on("message", (message) => {
    console.log(message?.conversation);
    setConversation(message?.conversation)
  })

  const stopInterview = ()=> {
    vapi.stop()
    router.push('/interview/'+interview_id+'/completed')
  }

const GenerateFeedback = async () => {
  const result = await axios.post('/api/ai-feedback',{
    conversation:conversation
  })
  const Content = result?.data.content
  const FINAL_CONTENT = Content.replace('```json','').replace('```','')
  const { data, error } = await supabase
  .from('Feedback')
  .insert([
    { 
      userName:interviewInfo?.userName,
      userEmail:interviewInfo?.userEmail,
      interview_id:interview_id,
      feedback:JSON.parse(FINAL_CONTENT),
      recommended: false
     },
  ])
  .select()
  console.log(data);
  router.push('/interview/'+interview_id+'/completed')
}



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold dark:text-white">AI Interview Session</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {interviewInfo?.interviewData?.jobPosition}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
              <Timer className="h-5 w-5 text-primary" />
              <span className="font-mono text-lg">{formatTime(timer)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Recruiter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 flex flex-col items-center justify-center"
            >
              <div className="relative mb-4">
                <AnimatePresence>
                  {!activeUser && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.75 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="absolute inset-0 rounded-full bg-primary animate-ping"
                    />
                  )}
                </AnimatePresence>
                <Image
                  src="/ai.png"
                  alt="AI Recruiter"
                  height={120}
                  width={120}
                  className="rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold dark:text-white">AI Recruiter</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Your Interviewer</p>
            </motion.div>

            {/* Candidate */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 flex flex-col items-center justify-center"
            >
              <div className="relative mb-4">
                <AnimatePresence>
                  {activeUser && (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.75 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="absolute inset-0 rounded-full bg-blue-500 animate-ping"
                    />
                  )}
                </AnimatePresence>
                <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white">
                  {interviewInfo?.userName?.[0]}
                </div>
              </div>
              <h3 className="text-xl font-semibold dark:text-white">{interviewInfo?.userName}</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Candidate</p>
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
              className="p-4 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Volume2 className="h-6 w-6 text-primary" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Mic className="h-6 w-6 text-primary" />
            </motion.button>

            <AlertConfirmation stopInterview={stopInterview}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              >
                <Phone className="h-6 w-6 text-white" />
              </motion.button>
            </AlertConfirmation>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeUser ? "You're speaking..." : "AI Recruiter is speaking..."}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default StartInterview