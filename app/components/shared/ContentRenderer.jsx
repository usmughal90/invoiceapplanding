"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

function ContentRenderer({ content }) {
  return (
    <div className="prose max-w-none">
      <BlocksRenderer
        content={content}
        blocks={{
          // Main list container
          list: ({ children, format }) => {
            const baseClasses = "my-4 space-y-3";

            return format === "ordered" ? (
              <ol className={`${baseClasses} list-decimal list-outside pl-8 `}>
                {children}
              </ol>
            ) : (
              <ul className={`${baseClasses} list-disc list-outside pl-8 `}>
                {children}
              </ul>
            );
          },

          // This is the key: make list items use proper hanging indent
          listItem: ({ children }) => (
            <li className="pl-2 leading-relaxed text-base md:text-lg ">
              <div className="inline-block align-middle max-w-full">
                {children}
              </div>
            </li>
          ),

          // Optional but recommended: ensure paragraphs inside lists don't add extra spacing
          paragraph: ({ children }) => (
            <p className="m-0 leading-relaxed">{children}</p>
          ),
          heading: ({ children, level }) => {
            const base = "font-semibold ";

            switch (level) {
              case 1:
                return (
                  <h1 className={`${base} text-3xl md:text-4xl mb-4`}>
                    {children}
                  </h1>
                );
              case 2:
                return (
                  <h2 className={`${base} text-2xl md:text-3xl mb-3`}>
                    {children}
                  </h2>
                );
              case 3:
                return (
                  <h3 className={`${base} text-xl md:text-2xl mb-3`}>
                    {children}
                  </h3>
                );
              case 4:
                return (
                  <h4 className={`${base} text-lg md:text-xl mb-2`}>
                    {children}
                  </h4>
                );
              case 5:
                return (
                  <h5 className={`${base} text-base md:text-lg mb-2`}>
                    {children}
                  </h5>
                );
              case 6:
                return (
                  <h6 className={`${base} text-sm md:text-base mb-2`}>
                    {children}
                  </h6>
                );
              default:
                return <h1 className={`${base} text-3xl`}>{children}</h1>;
            }
          },
          link: ({ children, url }) => (
            <a
              className="underline"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          image: ({ image }) => {
            return (
              <img
                fill
                className="my-6 rounded-2xl mx-auto w-full h-auto object-cover"
                src={image.url}
                alt={image?.alternativeText || ""}
              />
            );
          },
          video: ({ url }) => (
            <video src={url} controls className="my-6 w-full rounded-lg" />
          ),

          audio: ({ url }) => (
            <audio src={url} controls className="my-4 w-full" />
          ),

          iframe: ({ url }) => (
            <iframe
              src={url}
              className="my-6 w-full aspect-video rounded-lg"
              allowFullScreen
            />
          ),
          button: ({ children, url }) => (
            <button
              onClick={() => window.open(url, "_blank")}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2  hover:opacity-90"
            >
              {children}
            </button>
          ),
          form: ({ children, url }) => (
            <form action={url} method="post">
              {children}
            </form>
          ),
          input: ({ children, url }) => <input type="text" value={children} />,
          quote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary pl-4 italic  text-base md:text-lg">
              {children}
            </blockquote>
          ),
        }}
        modifiers={["responsive"]}
      />
    </div>
  );
}

export default ContentRenderer;
