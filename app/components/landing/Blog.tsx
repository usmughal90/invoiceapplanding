import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../../types/blog";
import { getLatestBlogPosts } from "../../endpoints/blog";

const Blog = async () => {
  const posts = await getLatestBlogPosts();
  const visiblePosts = posts?.data?.slice(0, 3) ?? [];
  const visibleCount = visiblePosts.length;

  return (
    <>
      {posts.data && posts?.data.length > 0 ? (
        <section className="w-full bg-[#f9f9f9]  " id="blog">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 ">
            <div className="flex items-center justify-center text-center gap-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-[#0F172A] ">
                    Blogs
                </h2>
                {/* <div className="mx-auto mt-3 h-0.5 w-10 rounded bg-(--color-primary)" /> */}
                {/* <p className="mt-2 max-w-2xl text-zinc-300">
                  Tips, setup guides, and troubleshooting to help you get the
                  best experience.
                </p> */}
              </div>
            </div>

            <div
              className={[
                "mt-12 grid grid-cols-1 gap-6",
                visibleCount >= 2 ? "sm:grid-cols-2" : "",
                visibleCount >= 3
                  ? "lg:grid-cols-3"
                  : visibleCount === 2
                    ? "lg:grid-cols-2"
                    : "lg:grid-cols-1",
                visibleCount === 1 ? "justify-items-center" : "",
              ].join(" ")}
            >
              {visiblePosts.map((post: BlogPost) => (
                <article
                  key={post.id}
                  className={[
                    "group flex h-full flex-col overflow-hidden rounded-xl border bg-white transition hover:-translate-y-0.5 shadow-[0_8px_30px_rgba(16,24,40,0.06)] hover:shadow-xl",
                    visibleCount === 1 ? "w-[350px] max-w-md"  : "",
                  ].join(" ")}
                >
                  <Link href={`blog/${post.slug}`}>
                  {post.featuredImage? <div className={`relative top-0 ${visibleCount === 2 ? "h-[300px]" : "h-64"} w-full bg-zinc-100`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${post.featuredImage.url}`}
                      alt={
                        post.featuredImage.alternativeText || ""
                      }
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div> : null}

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-[#0F172A]">
                        {post.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#475569]">
                      {post.shortDescription}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                      <span className="text-xs font-medium text-zinc-500">
                        {new Date(post.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  </Link>
                </article>
              ))}
            </div>
            <div className="flex justify-center">
              <button className="mt-8 text-sm font-bold bg-[#3359E7]   text-white px-4 py-2 rounded-md cursor-pointer transition-all shadow-lg transform hover:scale-102 active:scale-95">
                <Link href="/blog">View All Blogs</Link>
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Blog;
