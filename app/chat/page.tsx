'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices[0].message.content,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      // 可以添加错误提示UI
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 聊天头部 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">AI 助手</h1>
      </div>

      {/* 聊天消息区域 - 添加最大宽度和居中 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {message.role === 'user' ? (
                  <div className="whitespace-pre-wrap">{message.content}</div>
                ) : (
                  <div className="markdown-body prose dark:prose-invert max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <div className="relative group">
                              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(String(children));
                                  }}
                                  className="text-xs px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
                                >
                                  复制
                                </button>
                              </div>
                              <code className={className} {...props}>
                                {children}
                              </code>
                            </div>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                正在思考...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 - 添加最大宽度和居中，增加输入框高度 */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex flex-col space-y-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入您的问题..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 w-full sm:w-auto sm:self-end"
            >
              发送
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 