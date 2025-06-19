"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/services/supabaseClient'
import { useUser } from '@/app/provider'
import { CreditCard, Coins, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface BillingHistory {
  id: string
  amount: number
  credits: number
  created_at: string
  status: string
  userEmail: string
}

interface UserData {
  credits: number
  email: string
}

export default function BillingPage() {
  const [credits, setCredits] = useState<number>(0)
  const [history, setHistory] = useState<BillingHistory[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  useEffect(() => {
    if (user?.email) {
      fetchUserData()
      fetchBillingHistory()
    }
  }, [user?.email])

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('credits')
        .eq('email', user?.email)
        .single()

      if (error) throw error
      setCredits(data?.credits || 0)
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error('Failed to fetch user data')
    }
  }

  const fetchBillingHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('BillingHistory')
        .select('*')
        .eq('userEmail', user?.email)
        .order('created_at', { ascending: false })

      if (error) throw error
      setHistory(data || [])
    } catch (error) {
      console.error('Error fetching billing history:', error)
      toast.error('Failed to fetch billing history')
    } finally {
      setLoading(false)
    }
  }

  const handlePurchaseCredits = async (amount: number) => {
    if (!user?.email) {
      toast.error('Please login to purchase credits')
      return
    }

    try {
      // First update user credits
      const { error: updateError } = await supabase
        .from('User')
        .update({ credits: credits + amount })
        .eq('email', user.email)

      if (updateError) throw updateError

      // Then add to billing history
      const { error: insertError } = await supabase
        .from('BillingHistory')
        .insert([{
          userEmail: user.email,
          amount: amount * 10, // $10 per credit
          credits: amount,
          status: 'completed'
        }])

      if (insertError) throw insertError

      setCredits(credits + amount)
      toast.success(`Successfully purchased ${amount} credits!`)
      
      // Refresh the billing history
      fetchBillingHistory()
    } catch (error) {
      console.error('Error purchasing credits:', error)
      toast.error('Failed to purchase credits. Please try again.')
    }
  }

  if (!user?.email) {
    return (
      <div className="min-h-screen p-8 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-lg dark:text-white">Please login to view billing information</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 dark:bg-gray-900">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 dark:text-white"
      >
        Billing & Credits
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Credits Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <Coins className="h-8 w-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold dark:text-white">Available Credits</h2>
              <p className="text-4xl font-bold text-primary mt-2">{credits}</p>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => handlePurchaseCredits(5)}
              className="w-full"
              disabled={loading}
            >
              Purchase 5 Credits ($50)
            </Button>
            <Button
              onClick={() => handlePurchaseCredits(10)}
              className="w-full"
              variant="outline"
              disabled={loading}
            >
              Purchase 10 Credits ($100)
            </Button>
          </div>
        </motion.div>

        {/* Billing History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <History className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold dark:text-white">Billing History</h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-4">
                <p className="text-gray-600 dark:text-gray-300">Loading...</p>
              </div>
            ) : history.length > 0 ? (
              history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium dark:text-white">{item.credits} Credits</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      ${item.amount}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.status === 'completed' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                  }`}>
                    {item.status}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">
                No billing history yet.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
} 