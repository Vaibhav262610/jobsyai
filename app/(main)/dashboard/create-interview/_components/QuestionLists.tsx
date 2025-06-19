"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider'
import { v4 as uuidv4 } from 'uuid'

// Define the structure of each question item
interface QuestionItem {
  question: string
  type: string
}

// Define the expected props for the component
interface QuestionListsProps {
  formData: Record<string, any> // You can replace this with a more specific type
  onCreateLink: (id: string) => void
}

const QuestionLists: React.FC<QuestionListsProps> = ({ formData, onCreateLink }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [saveLoading, setSaveLoading] = useState<boolean>(false)
  const [questionList, setQuestionList] = useState<QuestionItem[]>([])
  const { user } = useUser()

  useEffect(() => {
    if (formData) {
      GenerateQuestionList()
    }
  }, [formData])

  const GenerateQuestionList = async () => {
    setLoading(true)
    try {
      const result = await axios.post('/api/ai-model', {
        ...formData
      })
      
      if (!result.data.content) {
        throw new Error('Invalid response from server')
      }

      try {
        const parsed = JSON.parse(result.data.content)
        if (!parsed.interviewQuestions || !Array.isArray(parsed.interviewQuestions)) {
          throw new Error('Invalid question format')
        }
        setQuestionList(parsed.interviewQuestions)
      } catch (parseError) {
        console.error('Error parsing questions:', parseError)
        toast.error('Failed to parse questions. Please try again.')
      }
    }
    catch(error) {
      console.error('Error generating questions:', error)
      const errorMessage = 'Server Error! Please try again'
      toast.error(errorMessage)
    }
    finally {
      setLoading(false)
    }
  }
  // console.log(user);

  const onFinish = async () => {
    // setSaveLoading(true)  
    const interview_id = uuidv4()
    console.log(interview_id);
    console.log(formData);
    const {data , error} = await supabase
    .from("Interview")
    .insert([{
      ...formData,
      questionList:questionList,
      userEmail:user?.email,
      interview_id:interview_id
    }])
    .select()
    console.log(data);
    setSaveLoading(false)

    const userUpdate = await supabase
    .from('User')
    .update({credits: Number(user?.credits)-1})
    .eq('email' , user?.email)
    .select()
    

    onCreateLink(interview_id)
  }


  return (
    <div>
      {loading && (
        <div className='font-bold text-lg mb-5'>
          <h2>Generated Interview Questions: </h2>
          <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
            <Loader2Icon className='animate-spin' />
            <div>
              <h2 className='font-medium'>Generating Interview Questions</h2>
              <p className='text-primary text-sm font-light'>
                Our AI is crafting personalized questions based on your job position
              </p>
            </div>
          </div>
        </div>
      )}

      {!loading && questionList.length > 0 && (
        <div className='p-5 border border-gray-300 rounded-xl bg-white'>
          {questionList.map((item, index) => (
            <div key={index} className='mb-3 p-3 border border-gray-200 rounded-xl'>
              <h2 className='font-medium'>{item.question}</h2>
              <h2 className='text-sm text-primary'>Type: {item.type}</h2>
            </div>
          ))}
        </div>
      )}

      <div className='flex justify-end mt-10'>
        <Button 
          onClick={onFinish} 
          disabled={saveLoading || loading || questionList.length === 0}
        >
          {saveLoading ? (
            <>
              <Loader2Icon className='animate-spin mr-2' />
              Creating Interview...
            </>
          ) : (
            'Create Interview Link & Finish'
          )}
        </Button>
      </div>
    </div>
  )
}

export default QuestionLists
