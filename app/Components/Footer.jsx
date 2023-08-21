import React from 'react'
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose, AiOutlineFacebook, AiOutlineInstagram , AiOutlineLinkedin} from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='fixed bottom-0 py-20 border-2 bg-slate-700 w-full '>
      <div className=' text-center mb-14'>
        <span className=' text-sm text-gray-500 text-ellipsis dark:text-green-400'>© 2023 
          <a href='https://christianstensoe.com' className=' hover:underline'> Christian Stensøe</a>. 
          Check it out !!!
        </span>
      </div>
      <div className='flex flex-row justify-around items-center border-y-blue-50'>
        <Link href='https://www.instagram.com/christianstensoee/?a__=1' className=' text-slate-200'>
            <AiOutlineInstagram size={30} className='cursor-pointer' />
          </Link>
          <Link href='https://www.linkedin.com/in/christian-stens%C3%B8e/#' className=' text-slate-200'>
            <AiOutlineLinkedin size={30} className='cursor-pointer'/>
          </Link>
          <Link href='#' className=' text-slate-200'>
            <AiOutlineFacebook size={30} className='cursor-pointer'/>
          </Link>
      </div> 
    </footer>
  )
}

export default Footer