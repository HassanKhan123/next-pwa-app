import React from 'react';
import { marked } from 'marked';

const MarkdownRenderer = ({ text }: { text: string }) => {
  const renderer = new marked.Renderer();

  const preprocessText = (text: string): string => {
    // Replace newlines with <br> tags
    const lineBreakProcessedText = text.replace(/\\n/g, '<br>'); // Use \\n to handle escaped newlines

    // Escape periods after numbers to prevent list interpretation
    const escapedText = lineBreakProcessedText.replace(/(\d+)\./g, '$1\\.');

    // Handle \uXXXX sequences (convert to actual Unicode characters)
    const unicodeProcessedText = escapedText.replace(/\\u([0-9A-Fa-f]{4})/g, (match, group1) => {
      return String.fromCharCode(parseInt(group1, 16));
    });

    return unicodeProcessedText;
  };

  const getMarkdownText = (): any => {
    const processedText = preprocessText(text);
    const rawMarkup = marked(processedText, { renderer });
    return { __html: rawMarkup };
  };

  return (
    <div
    className='text-white text-[16px] fon-normal font-roboto'
      dangerouslySetInnerHTML={getMarkdownText()}
    />
  );
};

export default MarkdownRenderer;
