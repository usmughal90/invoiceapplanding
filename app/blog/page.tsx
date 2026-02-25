import Image from "next/image";
import Link from "next/link";
import { getBlogPostsPage } from "../endpoints/blog";
import type { BlogPost, BlogPostsResponse } from "../types/blog";

type PageProps = {
  searchParams?: Promise<{ page?: string }>;
};

function clampPage(value: number, pageCount: number) {
  if (!Number.isFinite(value) || value < 1) return 1;
  if (pageCount > 0 && value > pageCount) return pageCount;
  return value;
}

export default async function BlogListingPage({ searchParams }: PageProps) {
  const sp = searchParams ? await searchParams : undefined;
  const requestedPage = Number(sp?.page ?? "1");

  // Fetch once to know pageCount; then clamp and refetch only if needed.
  const first: BlogPostsResponse = await getBlogPostsPage({
    page: Math.max(1, requestedPage),
    pageSize: 9,
  });
  const pageCount = first?.meta?.pagination?.pageCount ?? 1;
  const page = clampPage(requestedPage, pageCount);
  const postsResponse: BlogPostsResponse =
    page === first?.meta?.pagination?.page
      ? first
      : await getBlogPostsPage({ page, pageSize: 9 });

  const posts = postsResponse?.data ?? [];
  const meta = postsResponse?.meta?.pagination;

  return (
    <div className="min-h-dvh bg-(--color-white)">
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <Link href="/" className="text-(--color-primary) hover:underline">
            Home
          </Link>
          <span className="text-zinc-400">/</span>
          <Link
            href="/blog"
            className="text-(--color-primary)  hover:underline"
          >
            Blog
          </Link>
        </nav>
        <header className="text-center mt-6">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
            Blog
          </h1>
          <div className="mx-auto mt-3 h-0.5 w-10 rounded bg-(--color-primary)" />
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-7 text-[#475569]">
            Tips, setup guides, and troubleshooting to help you get the best
            experience.
          </p>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: BlogPost) => {
            const thumbUrl = post.featuredImage?.url ?? "";
            const altText = post.featuredImage?.alternativeText ?? "";

            return (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link
                  href={`blog/${post.slug}`}
                  className="outline-none focus-visible:underline"
                >
                  <div className="relative top-0 h-64 w-full bg-zinc-100">
                    {thumbUrl ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}${thumbUrl}`}
                        alt={altText}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-fit"
                        unoptimized
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-lg font-bold text-[#0F172A] ">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-[#475569]">
                      {post.shortDescription}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                      <span className="text-xs font-medium text-[#475569]">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <nav className="mt-10 flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-[#0F172A]">
            Page{" "}
            <span className="font-semibold text-[#475569]">
              {meta?.page ?? page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#475569]">
              {meta?.pageCount ?? pageCount}
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href={`/blog?page=${Math.max(1, page - 1)}`}
              aria-disabled={page <= 1}
              className={`rounded-md border px-3 py-2 text-sm font-semibold ${
                page <= 1
                  ? "pointer-events-none border-[#475569] text-[#475569]"
                  : "border-zinc-300 text-[#0F172A] hover:bg-(--color-primary) hover:text-white"
              }`}
            >
              Prev
            </Link>

            {Array.from({ length: pageCount }, (_, i) => i + 1)
              .slice(Math.max(0, page - 3), Math.min(pageCount, page + 2))
              .map((p) => (
                <Link
                  key={p}
                  href={`/blog?page=${p}`}
                  className={`rounded-md border px-3 py-2 text-sm font-semibold ${
                    p === page
                      ? " bg-(--color-primary) text-white"
                      : "border-zinc-300 text-zinc-900 hover:bg-(--color-primary) hover:text-white"
                  }`}
                >
                  {p}
                </Link>
              ))}

            <Link
              href={`/blog?page=${Math.min(pageCount, page + 1)}`}
              aria-disabled={page >= pageCount}
              className={`rounded-md border px-3 py-2 text-sm font-semibold ${
                page >= pageCount
                  ? "pointer-events-none border-zinc-200 text-[#475569]"
                  : "border-zinc-300 text-[#0F172A] hover:bg-(--color-primary) hover:text-white"
              }`}
            >
              Next
            </Link>
          </div>
        </nav>
      </section>
    </div>
  );
}
