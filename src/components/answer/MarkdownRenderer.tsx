import React from 'react';
import { marked } from 'marked';

const MarkdownRenderer = ({ text }: { text: string }) => {
  const renderer = new marked.Renderer();

  const preprocessText = (text: string): string => {
    // Escape periods after numbers to prevent list interpretation
    const escapedText = text.replace(/(\d+)\./g, '$1\\.');

    // Replace double newlines with <br><br>
    const doubleNewlineProcessedText = escapedText.replace(/\n\n/g, '<br><br>');

    // Remove extra backslashes
    const doubleBackSlashProcessedText = doubleNewlineProcessedText.replace(/\\/g, '');

    // Handle \uXXXX sequences (convert to actual Unicode characters)
    const unicodeProcessedText = doubleBackSlashProcessedText.replace(/\\u([0-9A-Fa-f]{4})/g, (match, group1) => {
      return String.fromCharCode(parseInt(group1, 16));
    });

    // Replace single newlines with <br>
    return unicodeProcessedText.replace(/\n/g, '<br>');
  };

  const getMarkdownText = (): any => {
    const processedText = preprocessText(text);
    var rawMarkup = marked(processedText, { renderer });
    return { __html: rawMarkup };
  };

  return (
    <div
      dangerouslySetInnerHTML={getMarkdownText()}
    />
  );
};

export default MarkdownRenderer;
