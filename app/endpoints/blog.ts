// async function getLatestBlogPosts() {
//  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?filters[appName][$eq]=invoice-maker`,{
//   cache: 'no-store',
//  });
 
//  const blogPosts = await res.json();
//  return blogPosts;
// }

// async function getBlogPostsPage(options?: { page?: number; pageSize?: number }) {
//   const page = options?.page ?? 1;
//   const pageSize = options?.pageSize ?? 9;

//   const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/blogs?filters[appName][$eq]=invoice-maker`;
//   // const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/universal-tv-remote-blogs`;
//   const url = new URL(baseUrl);

//   // Strapi-style pagination params
//   url.searchParams.set('pagination[page]', String(page));
//   url.searchParams.set('pagination[pageSize]', String(pageSize));
//   // url.searchParams.set('sort', 'rank:asc');

//   // Ensure nested fields used by the UI are available (safe even if backend ignores it)
//   url.searchParams.set('populate[blogDetailPage][populate]', 'thumbnail');

//   const res = await fetch(url.toString(), { cache: 'no-store' });
//   const blogPosts = await res.json();
//   return blogPosts;
// }

// async function getBlogPostBySlug(slug: string) {
//   const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/blogs`;
//   const url = new URL(baseUrl);

//   url.searchParams.set("filters[slug][$eq]", slug);
//   // Grab everything needed for the detail page (text + images)
//   // url.searchParams.set("populate[blogDetailPage][populate]", "*");

//   const res = await fetch(url.toString(), { cache: "no-store" });
//   const blogPost = await res.json();
//   return blogPost;
// }

// export { getLatestBlogPosts, getBlogPostsPage,getBlogPostBySlug };

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  console.error("NEXT_PUBLIC_API_URL is not defined in .env");
}

async function safeFetch(url: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout

    const res = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("Fetch failed with status:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

async function getLatestBlogPosts() {
  const url = `${API_BASE}/blogs?filters[appName][$eq]=invoice-maker`;
  return (await safeFetch(url)) ?? [];
}

async function getBlogPostsPage(options?: { page?: number; pageSize?: number }) {
  const page = options?.page ?? 1;
  const pageSize = options?.pageSize ?? 9;

  const baseUrl = `${API_BASE}/blogs?filters[appName][$eq]=invoice-maker`;
  const url = new URL(baseUrl);

  url.searchParams.set("pagination[page]", String(page));
  url.searchParams.set("pagination[pageSize]", String(pageSize));
  url.searchParams.set("populate[blogDetailPage][populate]", "thumbnail");

  return (await safeFetch(url.toString())) ?? [];
}

async function getBlogPostBySlug(slug: string) {
  const baseUrl = `${API_BASE}/blogs`;
  const url = new URL(baseUrl);

  url.searchParams.set("filters[slug][$eq]", slug);

  return (await safeFetch(url.toString())) ?? [];
}

export { getLatestBlogPosts, getBlogPostsPage, getBlogPostBySlug };