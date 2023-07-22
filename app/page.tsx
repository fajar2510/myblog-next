import Image from 'next/image'
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-8">
      <h1 className='text-lg text-blue-500 font-bold tracking-wider'>Hallo Selamat Datang !</h1>

      <div className='flex items-center justify-center mt-6'>
        <Link href="/register" className="text-base font-medium underline text-blue-500">ke Register</Link>
      </div>

    </main>
  )
}
