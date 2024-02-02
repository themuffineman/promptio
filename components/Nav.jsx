'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProvider} from 'next-auth/react'

const Nav = () => {

  const isUserLoggedIn = true
  const [provider, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProvider()
      setProviders(response)
    } 
    setProviders()
  },[])

  return (
    <nav className='w-full flex-between mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
        src='/assets/images/logo.svg' 
        alt='Promptopia-Logo'
        width={30}
        height={30}
        className='object-contain'
        />  
        <p className='logo_text'>Promptopia</p>    
      </Link>
      <div className='sm:flex hidden'>
          {isUserLoggedIn? (
          <div className='gap-3 flex md:gap-5'>


            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>


            <button type='button' onClick={signOut} className='outline_btn'>
              SignOut
            </button>

            <Link href='/Profile'>
              <Image 
                src='assets/images/logo.svg'
                alt='profile'
                className='rounded-full'
                width={37}
                height={37}
              />
            </Link>
          </div>
          ):(
              <>
                {providers && Object.values(providers).map((provider)=>(
                  <button
                  type='button'
                  key={provider.name}
                  className='black_btn'
                  onClick={()=>signIn(provider.id)}
                  >
                    SignIn
                  </button>
                ))}
              </>
          )}
      </div>
      <div className='sm:hidden flex relative'>
          {isUserLoggedIn? (
            <div className='flex'>
              <Image 
                src='assets/images/logo.svg'
                alt='profile'
                className='rounded-full'
                width={37}
                height={37}
                onClick={()=>setToggleDropdown(prev => !prev)}
              />   

              {toggleDropdown && (
              <div className='dropdown'>
                <Link 
                  href='/profile'
                  className='dropdown-link'
                  onClick={()=> setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link 
                  href='/profile'
                  className='dropdown-link'
                  onClick={()=> setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                type='button'
                onClick={()=>{
                  setToggleDropdown(false)
                  signOut()
                }}
                className='w-full mt-5 black_btn'
                >
                  SignOut
                </button>
              </div>)}    
            </div>
          ): (
            <>
                {providers && Object.values(providers).map((provider)=>(
                  <button
                  type='button'
                  key={provider.name}
                  className='black_btn'
                  onClick={()=>signIn(provider.id)}
                  >
                    SignIn
                  </button>
                ))}
            </>
          )}
      </div>
    </nav>
  )
}

export default Nav