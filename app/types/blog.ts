interface RichTextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

// Paragraph block
interface ParagraphBlock {
  type: "paragraph";
  children: RichTextNode[];
}

// List item
interface ListItemBlock {
  type: "list-item";
  children: RichTextNode[];
}

// List block
interface ListBlock {
  type: "list";
  format: "ordered" | "unordered";
  children: ListItemBlock[];
}

// Union of all possible content blocks
export type ContentBlock = ParagraphBlock | ListBlock;

// Image format types
interface FeaturedImage {
  id: number;
  documentId: string;
  name: string;
  url: string;
  alternativeText: string | null;
}



// Blog detail page types
// interface BlogDetailPage {
//  id: number;
//  blogText: string;
//  blogPostImage: Image;
//  thumbnail: Image;
// }

// Blog post attributes
interface BlogPostAttributes {
 id: number;
 postTitle: string;
 slug: string;
 blogShortDescription: string;
 rank: number | null;
 createdAt: string;
 updatedAt: string;
 publishedAt: string;
//  blogDetailPage: BlogDetailPage;
}

// Blog post item
interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: ContentBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  appName: string;
  featuredImage: FeaturedImage | null;
  seo: any | null;
  author:string;
}

// API response type
interface BlogPostsResponse {
 data: BlogPost[];
 meta: {
   pagination: {
     page: number;
     pageSize: number;
     pageCount: number;
     total: number;
   };
 };
}

// Transformed blog post for UI
interface TransformedBlogPost {
 id: number;
 slug: string;
 title: string;
 excerpt: string;
 coverImage: string;
 publishedAt: string;
 href: string;
}



export type {
 BlogPostsResponse,
 BlogPost,
 BlogPostAttributes,
//  BlogDetailPage,
 TransformedBlogPost,

};