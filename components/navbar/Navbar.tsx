"use client"

import { SafeUser }  from "@/types"
import { User } from "@prisma/client"
import { signOut  } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser: SafeUser | null
}

export default function Navbar({currentUser}:UserMenuProps) {
  const router = useRouter();

  const handleSignOut = async () => {
      try {
          await signOut({ redirect: false, callbackUrl: "/" });
          alert("You have been signed out");
          router.push("/");
          router.refresh()
      } catch (error) {
        alert("Error signing out");
          console.error("Error signing out:", error);
      }
  };


  return (
    <header>
        <nav className="bg-gray-200 flex justify-between px-4 py-6 shadow-xl">

            <div>{currentUser?.name}</div>

            <div className="flex gap-4">
                <Link href="/">Home</Link>
                <Link href={currentUser ? "/create": "/register"}>Create</Link>

                {currentUser ? <button onClick={handleSignOut} className="text-sm text-pink-600">Sign out</button> :
                <Link href="/register" className="">Register</Link>}
            </div>

            
        </nav>

    </header>
  )
}
