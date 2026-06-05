'use client'

import React, { useState, useRef } from 'react'
import Draggable from 'react-draggable'

export default function CastleChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chatLog, setChatLog] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '鏡花水月城へようこそ。何か知りたいことはありますか？' }
  ])
  const [loading, setLoading] = useState(false)
  
  // 💡 ドラッグ中かどうかを判定するフラグ（アニメーションのガタつきを止める用）
  const [isDragging, setIsDragging] = useState(false)

  const nodeRef = useRef(null)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || loading) return

    const userText = message
    setMessage('')
    setChatLog((prev) => [...prev, { role: 'user', text: userText }])
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8000/api/castle-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      })
      const data = await res.json()
      if (data.reply) {
        setChatLog((prev) => [...prev, { role: 'ai', text: data.reply }])
      } else {
        setChatLog((prev) => [...prev, { role: 'ai', text: '通信ができません。' }])
      }
    } catch (error) {
      setChatLog((prev) => [...prev, { role: 'ai', text: '考え中です。' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".drag-handle"
      // 💡 ドラッグが始まったらフラグをtrueにして、アニメーションを一時停止する
      onStart={() => setIsDragging(true)}
      // 💡 ドラッグが終わったらフラグをfalseに戻す
      onStop={() => setIsDragging(false)}
    >
      <div 
        ref={nodeRef} 
        // 💡 will-change-transform を追加して、ブラウザに「これ動くよ！」と先回りして伝える（超重要）
        className="fixed bottom-6 right-6 z-50 font-sans will-change-transform select-none"
      >
        {/* ─── チャットウィンドウ ─── */}
        {isOpen && (
          <div className={`mb-4 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden ${
            // 💡 ドラッグ中（isDraggingがtrue）の時は、遅延の原因になる transition を完全に無効化する！
            isDragging ? 'transition-none' : 'transition-all duration-300'
          }`}>
            
            {/* ヘッダー */}
            <div className="bg-[#5c554f]  text-white p-4 flex justify-between items-center shadow-md drag-handle cursor-move">
              <div className="flex items-center space-x-2 pointer-events-none">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <h3 className="font-bold text-sm tracking-wider font-yuji">鏡花水月城 AI案内所</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-white transition-colors text-lg p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* チャット履歴エリア */}
            <div className="flex-1 font-yuji overflow-y-auto p-4 space-y-4 bg-slate-50 text-sm">
              {chatLog.map((chat, index) => (
                <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed ${
                    chat.role === 'user' ? 'bg-[#5c554f] text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}>
                    {chat.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2.5 text-gray-400 shadow-sm flex items-center space-x-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce [animation-delay:0.2s]">●</span>
                    <span className="animate-bounce [animation-delay:0.4s]">●</span>
                  </div>
                </div>
              )}
            </div>

            {/* 入力フォーム */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 font-yuji text-sm focus:outline-none focus:border-[#5c554f] focus:ring-1 focus:ring-[#605348] text-black"
              />
              <button type="submit" disabled={loading} className="bg-[#5c554f] hover:bg-[#63584e] text-white px-4 py-2 rounded-full font-yuji text-sm font-medium transition-colors disabled:opacity-50">
                送信
              </button>
            </form>
          </div>
        )}

        {/* ─── フワフワ浮かぶ丸型チャットアイコン ─── */}
        <button
          onClick={() => {
            // 💡 ドラッグした直後に指を離した時は、ウィンドウが開かないようにするプチ工夫
            if (!isDragging) setIsOpen(!isOpen);
          }}
          className="w-14 h-14 bg-[#5c554f] hover:bg-[#5d4f43] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group relative drag-handle cursor-move"
          aria-label="チャットを開く"
        >
          {isOpen ? <span className="text-xl font-bold">✕</span> : <span className="text-2xl group-hover:animate-pulse">💬</span>}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5c554f]"></span>
            </span>
          )}
        </button>
      </div>
    </Draggable>
  )
}