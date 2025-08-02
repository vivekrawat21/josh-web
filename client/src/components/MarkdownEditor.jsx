import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';
import CustomToast from './CustomToast';

const MarkdownEditor = ({ type, data }) => {
  const [markdown, setMarkdown] = useState(data?.content || '');
  const [selectedButton, setSelectedButton] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toolbarExpanded, setToolbarExpanded] = useState(false);
  
  const textareaRef = useRef(null);

  useEffect(() => {
    setMarkdown(data?.content || '');
  }, [data]);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize();
  }, [markdown]);

  const insertAtCursor = (before, after = '', placeholder = '', buttonId) => {
    const textarea = document.getElementById('markdown-textarea');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    if (selectedButton === buttonId) {
      setSelectedButton('');
      const selectedText = text.slice(start, end);
      const unformattedText = selectedText
        .replace(new RegExp(`\\${before}`, 'g'), '')
        .replace(new RegExp(`\\${after}`, 'g'), '');
      const newText = text.slice(0, start) + unformattedText + text.slice(end);
      setMarkdown(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + unformattedText.length);
      }, 0);
      return;
    }

    const selected = text.slice(start, end) || placeholder;
    const newText = text.slice(0, start) + before + selected + after + text.slice(end);
    setMarkdown(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
    setSelectedButton(buttonId);
  };

  const handleClick = async (markdown, type) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/privacy/updatePrivacy?contentType=${type}`,
        { content: markdown, renderedContent: markdownToHtml(markdown) },
        { withCredentials: true }
      );
      if (res.data.status === 'success') {
        setToastMessage('Updated successfully');
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Error updating:', err);
    } finally {
      setLoading(false);
    }
  };

  const markdownToHtml = (markdown) => {
    if (!markdown) return '';
    let html = markdown;

    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');

    // List handling
    let lines = html.split('\n');
    let inList = false;
    let listType = '';
    let tempHtml = '';

    lines.forEach(line => {
      if (/^- (.*)/.test(line)) {
        const content = line.replace(/^- (.*)/, '$1');
        if (!inList || listType !== 'ul') {
          if (inList) tempHtml += `</${listType}>`;
          tempHtml += '<ul>';
          listType = 'ul';
          inList = true;
        }
        tempHtml += `<li>${content}</li>`;
      } else if (/^\d+\. (.*)/.test(line)) {
        const content = line.replace(/^\d+\. (.*)/, '$1');
        if (!inList || listType !== 'ol') {
          if (inList) tempHtml += `</${listType}>`;
          tempHtml += '<ol>';
          listType = 'ol';
          inList = true;
        }
        tempHtml += `<li>${content}</li>`;
      } else {
        if (inList) {
          tempHtml += `</${listType}>`;
          inList = false;
        }
        tempHtml += `<p>${line}</p>`;
      }
    });

    if (inList) {
      tempHtml += `</${listType}>`;
    }

    html = tempHtml;

    // Blockquotes
    html = html.replace(/^&gt; (.*?)$/gm, '<blockquote>$1</blockquote>');

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, language, code) => {
      return `<pre><code class="language-${language}">${code}</code></pre>`;
    });

    // Links - Fixing the link issue
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline" target="_blank">$1</a>');

    return html;
  };

  const formatButtons = [
    { label: 'Bold', before: '**', after: '**', placeholder: 'bold text', id: 'bold' },
    { label: 'Italic', before: '*', after: '*', placeholder: 'italic text', id: 'italic' },
    { label: 'H2', before: '\n## ', after: '\n', placeholder: 'Heading 2', id: 'h2' },
    { label: 'H3', before: '\n### ', after: '\n', placeholder: 'Heading 3', id: 'h3' },
    { label: 'Bullet', before: '\n- ', after: '', placeholder: 'Bullet item', id: 'bullet' },
    { label: 'Number', before: '\n1. ', after: '', placeholder: 'Numbered item', id: 'number' },
    { label: 'Quote', before: '\n> ', after: '', placeholder: 'Blockquote', id: 'quote' },
    { label: 'Code', before: '\n```js\n', after: '\n```', placeholder: 'console.log("Hello");', id: 'code' },
    { label: 'Link', before: '[', after: '](url)', placeholder: 'text', id: 'link' },
    { label: 'Red', before: '<span style="color:red">', after: '</span>', placeholder: 'Red text', id: 'red' },
    { label: 'Blue', before: '<span style="color:blue">', after: '</span>', placeholder: 'Blue text', id: 'blue' },
    { label: 'Green', before: '<span style="color:green">', after: '</span>', placeholder: 'Green text', id: 'green' },
  ];

  // For smaller screens, show only first 4 buttons and rest behind "More" button
  const primaryButtons = formatButtons.slice(0, 4);
  const secondaryButtons = formatButtons.slice(4);

  return (
    <div className="w-full max-w-full md:max-w-5xl mx-auto p-2 md:p-4">
      <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
        <span className="capitalize">{type}</span> Editor
      </h1>

      {/* Responsive Toolbar */}
      <div className="mb-3">
        {/* Always visible toolbar buttons */}
        <div className="flex flex-wrap gap-1 md:gap-2 mb-2">
          {primaryButtons.map(btn => (
            <button
              key={btn.id}
              onClick={() => insertAtCursor(btn.before, btn.after, btn.placeholder, btn.id)}
              className={`px-2 py-1 md:px-4 md:py-2 rounded border text-xs md:text-sm font-semibold transition-colors ${
                selectedButton === btn.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {btn.label}
            </button>
          ))}
          
          {/* More/Less toggle button for smaller screens */}
          <button
            onClick={() => setToolbarExpanded(!toolbarExpanded)}
            className="px-2 py-1 md:px-4 md:py-2 rounded border text-xs md:text-sm font-semibold bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {toolbarExpanded ? 'Less' : 'More'} 
            <span className="ml-1">
              {toolbarExpanded ? '▲' : '▼'}
            </span>
          </button>
        </div>
        
        {/* Expandable secondary toolbar */}
        {toolbarExpanded && (
          <div className="flex flex-wrap gap-1 md:gap-2 mb-2 animate-fadeIn">
            {secondaryButtons.map(btn => (
              <button
                key={btn.id}
                onClick={() => insertAtCursor(btn.before, btn.after, btn.placeholder, btn.id)}
                className={`px-2 py-1 md:px-4 md:py-2 rounded border text-xs md:text-sm font-semibold transition-colors ${
                  selectedButton === btn.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Editor */}
      <textarea
        id="markdown-textarea"
        ref={textareaRef}
        className="border w-full p-2 md:p-3 rounded mb-4 md:mb-6 resize-none overflow-hidden text-sm md:text-base"
        value={markdown}
        onChange={(e) => {
          setMarkdown(e.target.value);
          autoResize();
        }}
        placeholder="Write your content in Markdown here..."
      />

      {/* Preview */}
      <div className="border p-2 md:p-4 rounded bg-white shadow-sm mb-4">
        <h2 className="text-base md:text-xl font-semibold mb-2">Preview</h2>
        <div className="markdown-preview prose prose-sm md:prose-base max-w-none overflow-x-auto" 
             dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }} />
      </div>

      {/* Submit */}
      <div className="flex justify-between items-center">
        <div className="relative">
          {showToast && <CustomToast message={toastMessage} />}
        </div>
        <button
          className="bg-gray-900 text-white px-3 py-1 md:px-4 md:py-2 rounded-md disabled:opacity-50 text-sm md:text-base transition-opacity"
          onClick={() => handleClick(markdown, type)}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditor;