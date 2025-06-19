"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Brain, Users, Clock, Sparkles, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const HomePage = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-[#0A0A0A] to-[#0A0A0A] opacity-50" />
      
      {/* Hero Section */}
      <div className="relative container mx-auto px-4 pt-32 pb-16">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Interview Platform
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500">
                JOBSY.AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Transform your hiring process with intelligent AI interviews. 
              Get deeper insights, save time, and make better hiring decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Button 
              size="lg"
              className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-105"
              onClick={() => router.push('/dashboard')}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full border-gray-700 hover:bg-gray-800 transition-all"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl mt-16"
          >
            {[
              { number: "10K+", label: "Interviews Conducted" },
              { number: "95%", label: "Accuracy Rate" },
              { number: "50%", label: "Time Saved" },
              { number: "4.9/5", label: "User Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-32 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {[
            {
              icon: Brain,
              title: "AI-Powered Interviews",
              description: "Conduct intelligent interviews with our advanced AI technology that adapts to each candidate",
              features: ["Natural conversation", "Real-time analysis", "Adaptive questioning"]
            },
            {
              icon: Users,
              title: "Smart Evaluation",
              description: "Get comprehensive insights and analytics for each candidate's performance",
              features: ["Detailed scoring", "Behavioral analysis", "Skill assessment"]
            },
            {
              icon: Clock,
              title: "Efficient Process",
              description: "Automate your interview process and focus on what matters most",
              features: ["Automated scheduling", "Instant feedback", "Time optimization"]
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-primary/50 transition-all"
            >
              <feature.icon className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.features.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-32 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join thousands of companies already using JOBSY.AI to make better hiring decisions
          </p>
          <Button 
            size="lg"
            className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-105"
            onClick={() => router.push('/dashboard')}
          >
            Start Free Trial <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage