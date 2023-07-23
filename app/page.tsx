import getCurrentUser from './actions/getCurrentUser'
import getBlogs from './actions/getBlogs'
import SingleBlog from '@/components/blog/SingleBlog'

export default async function Home() {

  const currentUser = await getCurrentUser();
  const blogs = await getBlogs();

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <h1 className='text-lg text-blue-500 font-bold tracking-wider'>Hallo Selamat Datang !</h1>

      {blogs.map((item) => (
        <SingleBlog 
          key={item.id}
          data={item}
          currentUser={currentUser}
        />
      ))}

    </main>
  )
}
