const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const sendMessageToGPT = async (messages: any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_URL}`
      },
      body: JSON.stringify({
        // model: "4o",
        messages: messages,
        // temperature: 0.7,
        // max_tokens: 1000,
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export const streamMessageFromGPT = async (messages: any, onDataReceived: any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_URL}`
      },
      body: JSON.stringify({
        // model: "4o",
        messages: messages,
        // temperature: 0.7,
        // max_tokens: 1000,
        stream: true
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data:') && !line.includes('[DONE]')) {
          try {
            const data = JSON.parse(line.substring(5));
            if (data.choices[0].delta.content) {
              accumulatedText += data.choices[0].delta.content;
              onDataReceived(accumulatedText);
            }
          } catch (e) {
            console.error('Error parsing stream data:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error streaming from OpenAI API:', error);
    throw error;
  }
};