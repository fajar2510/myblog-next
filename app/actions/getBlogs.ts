import prisma from "../lib/prismadb";

export default async function getBlogs() {
    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: "desc",
                },
            })

            const safeBlogs = blogs.map((blog) => ({
                ...blog,
                createdAt: blog.createdAt.toISOString()
            }))
            console.log(`Success load data blogs`);
            return safeBlogs;
        }
        catch (err:any) {
            throw new Error(`Failed load data blogs : ${err.message}`);
            
        }
}