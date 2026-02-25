import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "../../endpoints/blog";
import type { BlogPost, BlogPostsResponse } from "../../types/blog";
import ContentRenderer from "@/app/components/shared/ContentRenderer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const res: BlogPostsResponse = await getBlogPostBySlug(slug);
  const post: BlogPost | undefined = res?.data?.[0];

  if (!post) return {};

  const seo = post.seo;
  const title = seo?.ogTitle || post.title;
  const description = seo?.ogDescription || post.shortDescription || "";
  const canonical =
    seo?.canonicalUrl || `${process.env.NEXT_PUBLIC_API_DOMAIN}/blog/${slug}`;

  const ogImageUrl = seo?.ogImage?.url || post.featuredImage?.url;

  return {
    title: title ?? "Blog",
    description: description ?? "",
    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const res: BlogPostsResponse = await getBlogPostBySlug(slug);
  const post: BlogPost | undefined = res?.data?.[0];

  if (!post) notFound();

  const title = post.title ?? "";
  const excerpt = post.shortDescription ?? "";
  const createdAt = post?.createdAt ?? "";
  const publishedAt = post?.publishedAt ?? createdAt;
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const imageUrl = post.featuredImage?.url ?? "";
  const heroAlt =
    post.featuredImage?.alternativeText ??
    post.featuredImage?.alternativeText ??
    title;

  const heroSrc = imageUrl
    ? `${process.env.NEXT_PUBLIC_API_IMAGE_URL}${imageUrl}`
    : "";

  const author = post.author ?? "";

  return (
    <div className="min-h-dvh bg-(--color-white)">
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
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
          <span className="text-zinc-400">/</span>
          <span className="text-(--color-primary) hover:underline">
            {title}
          </span>
        </nav>

        <header className="mt-6">
          <h1 className="text-wrap text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            {title}
          </h1>
          {formattedDate ? (
            <p className="mt-4 text-sm font-medium text-[#475569]">
              {formattedDate}
            </p>
          ) : null}
        </header>

        {heroSrc ? (
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
            <div className="relative h-64 w-full sm:h-[520px]">
              <Image
                src={heroSrc}
                alt={heroAlt}
                fill
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>
        ) : null}

        {post?.content && (
          <article className="text-zinc-700 mt-10 max-w-none ">
            <ContentRenderer content={post.content} />
          </article>
        )}

        <div className="text-md text-[#0F172A] my-6">
          By <span className="font-bold">{author}</span>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-6">
          <Link
            href="/blog"
            className="text-sm font-bold text-(--color-primary) hover:underline"
          >
            ← Back to blog
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-[#0F172A] hover:underline"
          >
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
}
