async function getLatestBlogPosts() {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?filters[appName][$eq]=invoice-maker`,{
  cache: 'no-store',
 });
 
 const blogPosts = await res.json();
 return blogPosts;
}

async function getBlogPostsPage(options?: { page?: number; pageSize?: number }) {
  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? 9;

  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/blogs?filters[appName][$eq]=invoice-maker`;
  // const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/universal-tv-remote-blogs`;
  const url = new URL(baseUrl);

  // Strapi-style pagination params
  url.searchParams.set('pagination[page]', String(page));
  url.searchParams.set('pagination[pageSize]', String(pageSize));
  // url.searchParams.set('sort', 'rank:asc');

  // Ensure nested fields used by the UI are available (safe even if backend ignores it)
  url.searchParams.set('populate[blogDetailPage][populate]', 'thumbnail');

  const res = await fetch(url.toString(), { cache: 'no-store' });
  const blogPosts = await res.json();
  return blogPosts;
}

async function getBlogPostBySlug(slug: string) {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/blogs`;
  const url = new URL(baseUrl);

  url.searchParams.set("filters[slug][$eq]", slug);
  // Grab everything needed for the detail page (text + images)
  // url.searchParams.set("populate[blogDetailPage][populate]", "*");

  const res = await fetch(url.toString(), { cache: "no-store" });
  const blogPost = await res.json();
  return blogPost;
}

export { getLatestBlogPosts, getBlogPostsPage,getBlogPostBySlug };