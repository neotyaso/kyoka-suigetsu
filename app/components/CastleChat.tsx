"use client";

import { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export default function CastleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: '鏡花水月城へようこそおいでくださいました。何かお調べのことはございますか？' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージが来たら一番下まで自動スクロール
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      // Honoの中継窓口を叩く
      const response = await fetch('http://localhost:8000/api/castle-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: '申し訳ございませぬ、少し通信が途絶えてしまったようです。' }]);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { sender: 'ai', text: 'もののけの悪戯か、声が届かぬようでございます。' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-yuji">
      {/* 🔮 右下の丸い常駐ボタン */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#e8aaa3] text-white rounded-full shadow-lg hover:bg-[#df9992] transition-all duration-300 flex flex-col items-center justify-center border-2 border-white hover:scale-105 group"
        >
          <span className="text-xl group-hover:animate-bounce">🔮</span>
          <span className="text-[9px] tracking-tighter font-bold -mt-0.5">城内案内</span>
        </button>
      )}

      {/* 🏯 チャットウィンドウ本体 */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[450px] bg-[#fcf8f2] rounded-2xl shadow-2xl border border-[#e8aaa3]/50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* ヘッダー */}
          <div className="bg-[#aeac78] text-[#f3deb9] px-4 py-3 flex justify-between items-center border-b border-[#e8aaa3]/20 shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
              <span className="font-bold tracking-wide text-sm">鏡花水月城 案内人 (AI)</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#f3deb9] hover:text-white transition-colors text-lg font-sans px-2"
            >
              ✕
            </button>
          </div>

          {/* メッセージ履歴エリア */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f3deb9]/20 font-sans text-sm">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm whitespace-pre-wrap leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#e8aaa3] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none font-yuji'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* 思考中（ぐるぐる風） */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-400 border border-gray-100 rounded-2xl rounded-bl-none px-4 py-2.5 shadow-sm text-xs italic animate-pulse">
                  文案を編纂中...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* 入力フォーム */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex space-x-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="入城時間について教えて、など..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#aeac78] font-sans"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-[#aeac78] text-[#f3deb9] px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-[#858354] disabled:opacity-40 font-yuji"
            >
              文を認める
            </button>
          </form>
        </div>
      )}
    </div>
  );
}