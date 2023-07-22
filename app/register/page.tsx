"use client"

import { FormEvent, useState } from 'react'
import Input from '@/components/input/Input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from "next/link"


interface initialStateProps {
    name: string;
    email: string;
    password: string;
}

const initialState:initialStateProps = {
    name: '',
    email: '',
    password: '',
}

export default function Register() {
    const [state, setState] = useState(initialState )
    const router = useRouter();

    function handleChange(e:any) {
        setState({...state, [e.target.name]: e.target.value })
    }

    const onSubmit = (event:FormEvent) => {
        event.preventDefault()
        axios.post(`/api/register`, state)
        .then(() => {
            console.log("Registration successful!"); // Pesan ketika berhasil
            router.refresh()
        })
        .then(() => {
            setTimeout(() => {
                router.push(`/login`)
            }, 2500)
        })
        .catch((err:any) => {
            console.log(`Failed with ${err.message}`) // Pesan ketika gagal
        })
    }

  return (
   <form className="card flex items-center justify-center text-center " onSubmit={onSubmit}>
    
    <div className=' flex mt-14 rounded-md flex-col justify-center items-center px-10 py-3 h-[450px] w-[350px] mx-auto gap-2 border border-slate-300 shadow-md'>
    <h1 className="text-slate-800 font-bold text-2xl mb-3">Register</h1>
        <Input placeholder='Name' id='name' name='name' type='text' onChange={handleChange} value={state.name}/>
        <Input placeholder='Email' id='email' name='email' type='email' onChange={handleChange} value={state.email}/>
        <Input placeholder='Password' id='password' name='password' type='password' onChange={handleChange} value={state.password}/>

        <button type='submit' className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md tracking-wider uppercase'>Sign up</button>
    
        <div className='font-normal mt-5'>
            Do you have an account? <Link href='/login' className='text-blue-600 underline font-semibold'>Sign in</Link>
        </div>
    </div>

   </form>
  )
}
