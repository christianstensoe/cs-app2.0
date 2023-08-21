'use client'

import React from 'react'
import Link from 'next/link'
import { FaHome, FaProjectDiagram, FaEnvelope, FaInfoCircle, FaRunning} from 'react-icons/fa'
import { AiOutlineMenu, AiOutlineClose, AiOutlineFacebook, AiOutlineInstagram , AiOutlineLinkedin} from 'react-icons/ai'
import { useState } from 'react'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  
  const handleNav = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className=' fixed w-full h-24 shadow-xl bg-white'>
        <div className='flex justify-between items-center h-full w-full 2xl:px-5'>
          <h3 className='text-xl font-burtons font-bold'>CHRISTIANSTENSØE</h3>
          <div>
            <ul className='hidden md:flex '>
              <Link href='/'>
                <li className='flex ml-10 uppercase hover:border-b text-xl text-slate-500 font-burtons'> 
                  <FaHome/> Home 
                </li>
              </Link>
              {/* <Link href='/projects'>
                <li className='flex ml-3 uppercase hover:border-b text-xl text-slate-500'>
                  <FaProjectDiagram /> Projects
                </li>
              </Link> */}
              <Link href='/strava'>
                <li className='flex ml-10 uppercase hover:border-b text-xl text-slate-500'>
                <FaRunning /> Strava
                </li>
              </Link>
              <Link href='/about'>
                <li className='flex ml-10 uppercase hover:border-b text-xl text-slate-500'>
                <FaInfoCircle /> About
                </li>
              </Link>
              <Link href='/contact'>
                <li className='flex ml-10 mr-10 uppercase hover:border-b text-xl text-slate-500'>
                <FaEnvelope /> Contact
                </li>
              </Link>
            </ul>
          </div>
          <div onClick={handleNav} className='md:hidden cursor-pointer pl-24'>
            <AiOutlineMenu size={25} />
          </div>
        </div>
        <div className={
          menuOpen 
          ? "fixed left-0 top-0 w-[65%] md:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
          : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
        }>
          <div className='flex w-full items-center justify-end'>
            <div onClick={handleNav} className=' cursor-pointer'>
              <AiOutlineClose size={25}/>
            </div>
          </div>
          <div className='flex-col py-1'>
            <ul>
            <Link href='/'>
              <li onClick={() => setMenuOpen(false)} className='py-2 cursor-pointer text-slate-500'>
                Home
              </li>
            </Link>
            <Link href='/projects'>
              <li onClick={() => setMenuOpen(false)} className='py-2 cursor-pointer text-slate-500'>
                Projects
              </li>
            </Link>
            <Link href='/strava'>
              <li onClick={() => setMenuOpen(false)} className='py-2 cursor-pointer text-slate-500'>
                Strava
              </li>
            </Link>
            <Link href='/about'>
              <li onClick={() => setMenuOpen(false)} className='py-2 cursor-pointer text-slate-500'>
                About
              </li>
            </Link>
            <Link href='/contact'>
              <li onClick={() => setMenuOpen(false)} className='py-2 cursor-pointer text-slate-500'>
                Contact
              </li>
            </Link>
            </ul>
          </div>
          <div className='flex flex-row justify-around pt-1 items-center'>
            <Link href='https://www.instagram.com/christianstensoee/?a__=1' className='text-slate-950'>
              <AiOutlineInstagram size={30} className='cursor-pointer' />
            </Link>
            <Link href='https://www.linkedin.com/in/christian-stens%C3%B8e/#' className=' text-slate-950'>
              <AiOutlineLinkedin size={30} className='cursor-pointer'/>
            </Link>
            <Link href='#' className='text-slate-950'>
              <AiOutlineFacebook size={30} className='cursor-pointer'/>
            </Link>
          </div>
        </div>
      </nav>
  )
}

export default Navbar