import getCurrentUser from "@/app/actions/getCurrentUser"
import getBlogsById from "@/app/actions/getBlogsById"

interface IParams {
    blogId: string;
}


export default async function BlogPage({params}: {params: IParams}) {
    const blog = await getBlogsById(params);
    const currentUser = await getCurrentUser();


  return (
    <div>
        <div>
            <BlogId/>
        </div>
    </div>
  )
}
