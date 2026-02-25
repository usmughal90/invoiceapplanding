'use client'
import ReactMarkdown from "react-markdown";

function preserveBlankLines(markdown) {
  // Markdown collapses 3+ consecutive newlines down to a single paragraph break.
  // Inject "empty paragraphs" so multiple blank lines remain visible.
  const normalized = markdown.replace(/\r\n?/g, "\n");

  return normalized.replace(/\n{3,}/g, (match) => {
    const emptyParagraphs = match.length - 2;
    return `\n\n${"&nbsp;\n\n".repeat(emptyParagraphs)}`;
  });
}

function BlockRenderer({ content, className = "" }) {
  const markdown = typeof content === "string" ? preserveBlankLines(content) : "";

  if (!markdown.trim()) return null;

  return (
    <div className={`prose max-w-none ${className}`.trim()}>
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="m-0 whitespace-pre-wrap">{children}</p>,
          ul: ({ children }) => (
            <ul className="my-2 list-disc list-outside pl-8 space-y-3">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 list-decimal list-outside pl-8 space-y-3">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-2 leading-relaxed">
              <div className="inline-block align-middle max-w-full whitespace-pre-wrap">
                {children}
              </div>
            </li>
          ),
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-(--color-primary)">
              {children}
            </a>
          ),
          img: ({ src, alt }) => <img src={src} alt={alt ?? ""} />,
          blockquote: ({ children }) => <blockquote>{children}</blockquote>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default BlockRenderer;
