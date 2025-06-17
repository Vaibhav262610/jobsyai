import React from 'react'
import Header from './_components/Header'

const InterviewLayout = ({children}) => {
  return (
    <div className='bg-secondary h-screen'>
        <Header />
        {children}
    </div>
  )
}

export default InterviewLayout