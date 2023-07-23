"use client"

import { SafeUser }  from "@/types"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface UserMenuProps {
    currentUser: SafeUser | null
}

export default function Navbar({currentUser}:UserMenuProps) {
  return (
    <header>
        <nav className="bg-gray-200 flex justify-between px-4 py-6 shadow-xl">

            <div>{currentUser?.name}</div>

            <div className="flex gap-4">
                <Link href="/">Home</Link>
                <Link href="/create">Create</Link>

                {currentUser ? <button onClick={() => signOut()} className="text-sm text-pink-600">Sign out</button> :
                <Link href="/register" className="">Register</Link>}
            </div>

            
        </nav>

    </header>
  )
}
