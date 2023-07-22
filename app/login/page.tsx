"use client"

import { FormEvent, useState } from 'react'
import Input from '@/components/input/Input'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { signIn } from 'next-auth/react'


interface initialStateProps {
    email: string;
    password: string;
}

const initialState:initialStateProps = {
    email: '',
    password: '',
}

export default function Login() {
    const [state, setState] = useState(initialState )
    const router = useRouter();

    function handleChange(e:any) {
        setState({...state, [e.target.name]: e.target.value })
    }

    const onSubmit = (event:FormEvent) => {
       event.preventDefault()

       signIn('credentials', {
        ...state,
        redirect:false,
       })
       .then((callback) => {
        if(callback?.ok) {
            router.refresh()
        }

        if(callback?.error) {
            throw new Error("Wrong Credentials")
        }
       })
       router.push('/')
    }

  return (
   <form className="card flex items-center justify-center text-center " onSubmit={onSubmit}>
    
    <div className=' flex mt-14 rounded-md flex-col justify-center items-center px-10 py-3 h-[450px] w-[350px] mx-auto gap-2 border border-slate-300 shadow-md'>
    <h1 className="text-slate-800 font-bold text-2xl mb-3">Login</h1>
       <Input placeholder='Email' id='email' name='email' type='email' onChange={handleChange} value={state.email}/>
        <Input placeholder='Password' id='password' name='password' type='password' onChange={handleChange} value={state.password}/>

        <button type='submit' className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md tracking-wider uppercase'>Sign in</button>
    
        <div className='font-normal mt-5'>
            Haven't an account? <Link href='/register' className='text-blue-600 underline font-semibold'>Register</Link>
        </div>
    </div>

   </form>
  )
}
