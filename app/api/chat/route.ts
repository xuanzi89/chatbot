const DEEPSEEK_API_KEY = 'sk-c31223b896104e78ae32992863d2cb17';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || '请求失败');
    }

    return Response.json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    return Response.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    );
  }
} 