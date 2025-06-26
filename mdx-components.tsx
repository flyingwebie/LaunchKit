import type { MDXComponents } from 'mdx/types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override the default <pre> component for code blocks
    pre: ({ children, ...props }: any) => {
      // Extract the code and language from the children
      const child = children?.props?.children;
      const className = children?.props?.className || '';
      const language = className.replace('language-', '');

      if (typeof child === 'string' && language) {
        return (
          <div className="my-6">
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              customStyle={{
                borderRadius: '8px',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
              showLineNumbers={false}
              wrapLines={true}
              wrapLongLines={true}
            >
              {child.trim()}
            </SyntaxHighlighter>
          </div>
        );
      }

      // Fallback for inline code or non-language specific code blocks
      return (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
          {children}
        </pre>
      );
    },

    // Override the default <code> component for inline code
    code: ({ children, className, ...props }: any) => {
      // If it's not inside a pre tag (inline code)
      if (!className) {
        return (
          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      // If it's inside a pre tag, just return the children
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },

    // Custom heading components with better styling
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">
        {children}
      </h4>
    ),

    // Custom paragraph styling
    p: ({ children }: any) => (
      <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),

    // Custom list styling
    ul: ({ children }: any) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
    li: ({ children }: any) => <li className="leading-7">{children}</li>,

    // Custom link styling
    a: ({ href, children }: any) => (
      <a
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),

    // Custom blockquote styling
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 italic">
        {children}
      </blockquote>
    ),

    // Custom strong/bold styling
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </strong>
    ),

    // Custom emphasis/italic styling
    em: ({ children }: any) => (
      <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
    ),

    ...components,
  };
}
