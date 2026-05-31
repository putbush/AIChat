import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classNames from 'classnames';
import styles from './MarkdownContent.module.scss';
import { CodeBlock } from '../CodeBlock';
import { TableBlock } from '../TableBlock';

const getNodeText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }

  return '';
};

export const MarkdownContent = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table({ node, children, ...props }) {
          void node;

          return <TableBlock {...props}>{children}</TableBlock>;
        },
        code({ node, className, children, ...props }) {
          void node;

          const match = /language-(\w+)/.exec(className ?? '');
          const code = getNodeText(children).replace(/\n$/, '');

          if (match) {
            return <CodeBlock language={match[1]} code={code} />;
          }

          return (
            <code className={classNames(styles.inlineCode, className)} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
