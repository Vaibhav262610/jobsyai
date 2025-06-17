import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='w-full px-10 p-5 bg-white border-b-2 border-b-blue-200 flex items-center'>
         <Image src={'/logo.png'} alt='logo' width={200} height={200} />
    </div>
  )
}

export default Header