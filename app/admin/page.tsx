"use client";

import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface News {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface AIAnalysis {
  category: string;
  urgency: string;
  reply_draft: string;
}

export default function AdminDashboard(): React.JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'contacts' | 'news'>('all');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [aiResults, setAiResults] = useState<{ [key: number]: AIAnalysis }>({});

  // 💡 NextAuthからログイン中のセッション情報を取得
  const { data: session, status } = useSession();

  async function fetchAdminData() {
    try {
      const [contactsRes, newsRes] = await Promise.all([
        fetch('http://localhost:8000/api/admin/contacts'),
        fetch('http://localhost:8000/api/admin/news')
      ]);
      const contactsData = await contactsRes.json();
      const newsData = await newsRes.json();
      setContacts(contactsData);
      setNews(newsData);
    } catch (error) {
      console.error("データ取得エラー:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchAdminData();
    }
  }, [status]);

  // 🗑️ お知らせを削除する関数
  async function handleDeleteNews(id: number) {
    if (!confirm("このお知らせを削除しますか？")) return;
    try {
      const response = await fetch(`http://localhost:8000/api/admin/news/${id}`, { method: 'DELETE' });
      if (response.ok) await fetchAdminData();
      else alert("削除に失敗しました。");
    } catch (error) {
      console.error("削除エラー:", error);
    }
  }

  function openEditModal(item: News) {
    setEditingNewsId(item.id);
    setNewTitle(item.title);
    setNewContent(item.content);
    setIsModalOpen(true);
  }

  async function handleSubmitNews(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle || !newContent) return alert("件名と本文を入力してください。");
    setIsSubmitting(true);
    try {
      const url = editingNewsId ? `http://localhost:8000/api/admin/news/${editingNewsId}` : 'http://localhost:8000/api/admin/news';
      const method = editingNewsId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent })
      });
      if (response.ok) {
        setNewTitle('');
        setNewContent('');
        setEditingNewsId(null);
        setIsModalOpen(false);
        await fetchAdminData();
      } else {
        alert("処理に失敗しました。");
      }
    } catch (error) {
      console.error("エラー:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleMarkAsRead(id: number) {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/contacts/${id}/read`, { method: 'PUT' });
      if (response.ok) await fetchAdminData();
      else alert("状態の更新に失敗しました。");
    } catch (error) {
      console.error("更新エラー:", error);
    }
  }

  async function handleAIAnalyze(id: number) {
    setAnalyzingId(id);
    try {
      const response = await fetch(`http://localhost:8000/api/admin/contacts/${id}/analyze`, { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        if (data.success) setAiResults(prev => ({ ...prev, [id]: data.analysis }));
      } else {
        alert("AI解析に失敗しました。Pythonサーバーのログを確認してください。");
      }
    } catch (error) {
      console.error("AI解析エラー:", error);
    } finally {
      setAnalyzingId(null);
    }
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f3deb9] text-[#aeac78] font-yuji">
        門番が通行手形を確認中...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f3deb9] text-gray-700 font-sans">
        認証されていません。ログインし直してください。
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f3deb9] text-[#aeac78] font-yuji">
        城内資料を編纂中...
      </div>
    );
  }

  const timelineItems = [
    ...contacts.map(c => ({ ...c, type: 'contact' as const, timestamp: new Date(c.createdAt.split(',')[0]).getTime() })),
    ...news.map(n => ({ ...n, type: 'news' as const, timestamp: new Date(n.date).getTime() }))
  ].sort((a, b) => b.timestamp - a.timestamp);

  const filteredTimeline = timelineItems.filter(item => {
    if (activeTab === 'contacts') return item.type === 'contact';
    if (activeTab === 'news') return item.type === 'news';
    return true;
  });

  const currentUserName = session.user?.name || session.user?.email || "ユーザー名";

  return (
    <div className="min-h-screen bg-[#f3deb9] text-gray-800 flex flex-col font-yuji relative">
      
      <header className="bg-white text-[#e8aaa3] px-6 py-4 flex justify-between items-center shadow-sm border-b border-[#e8aaa3] z-10">
        <Link href="/" className="text-2xl font-bold tracking-wider hover:opacity-80 transition-opacity flex items-center">
          鏡花水月城 <span className="text-[10px] border border-gray-400 px-2 py-0.5 rounded ml-2 font-sans">ホームへ戻る</span>
        </Link>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#e8aaa3] rounded-full"></span>
            <span className="text-[#e8aaa3]">ログイン中: <strong className="text-[#e8aaa3]">{currentUserName}</strong></span>
          </div>
          <button 
            onClick={() => alert("現在アカウントは追加できません。")}
            className="text-[#e8aaa3] hover:text-gray-900 transition-colors cursor-pointer"
          >
            アカウント追加
          </button>
          
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="border border-gray-400 hover:bg-white/40 px-3 py-1 rounded transition-colors text-xs text-gray-600 font-sans cursor-pointer"
          >
            ログアウト
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        <aside className="w-full md:w-80 bg-[#aeac78] text-[#f3deb9] p-6 flex flex-col space-y-6 shrink-0">
          <div>
            <h2 className="text-2xl font-bold tracking-wide border-b border-white/20 pb-2 text-[#f3deb9]">管理画面</h2>
          </div>

          <nav className="flex flex-col space-y-2">
            <button onClick={() => setActiveTab('all')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'all' ? 'bg-[#f3deb9] text-[#aeac78] shadow-sm' : 'hover:bg-white/10 text-[#f3deb9]'}`}>総合一覧（全着信）</button>
            <button onClick={() => setActiveTab('contacts')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all flex justify-between items-center ${activeTab === 'contacts' ? 'bg-[#f3deb9] text-[#aeac78] shadow-sm' : 'hover:bg-white/10 text-[#f3deb9]'}`}>
              <span>お問い合わせ管理</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'contacts' ? 'bg-[#e8aaa3] text-white' : 'bg-white/20'}`}>{contacts.length}</span>
            </button>
            <button onClick={() => setActiveTab('news')} className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all flex justify-between items-center ${activeTab === 'news' ? 'bg-[#f3deb9] text-[#aeac78] shadow-sm' : 'hover:bg-white/10 text-[#f3deb9]'}`}>
              <span>お知らせ管理</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'news' ? 'bg-[#e8aaa3] text-white' : 'bg-white/20'}`}>{news.length}</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10">
            <button 
              onClick={() => {
                setEditingNewsId(null);
                setNewTitle('');
                setNewContent('');
                setIsModalOpen(true);
              }}
              className="w-full bg-white hover:bg-[#f3deb9] text-[#e8aaa3] py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm tracking-wider"
            >
              ＋ 新しいお知らせを追加する
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-8 bg-[#f3deb9]">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6 border-b border-[#e8aaa3] pb-3">
              <h3 className="text-xl font-bold text-[#e8aaa3]">
                {activeTab === 'all' && '総合タイムライン（最新順）'}
                {activeTab === 'contacts' && '届いたお問い合わせ（最新順）'}
                {activeTab === 'news' && 'お知らせ一覧'}
              </h3>
              <span className="text-xs text-[#e8aaa3]">自動更新有効</span>
            </div>

            <div className="space-y-4">
              {filteredTimeline.length === 0 ? (
                <p className="text-center text-gray-400 py-12 bg-white rounded border border-gray-200">該当する項目はありません。</p>
              ) : (
                filteredTimeline.map((item) => {
                  const isContact = item.type === 'contact';
                  const rawDate = isContact ? (item as any).createdAt || "" : "";
                  const isReplied = isContact && rawDate.includes(",DONE");
                  const displayDate = isContact ? rawDate.replace(",DONE", "") : (item as any).date;
                  const analysis = aiResults[item.id];

                  return (
                    <div 
                      key={`${item.type}-${item.id}`} 
                      className={`p-5 rounded-lg border border-gray-200/80 transition-all duration-200 
                        ${isContact 
                          ? (isReplied ? 'bg-gray-100 border-l-4 border-l-gray-400 opacity-60' : 'bg-white border-l-4 border-l-[#e8aaa3]')          
                          : 'bg-white border-l-4 border-l-[#aeac78]'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          {isContact ? (
                            isReplied 
                              ? <span className="text-[11px] bg-gray-200 text-gray-500 px-2 py-0.5 rounded font-bold">対応済み</span>
                              : <span className="text-[11px] bg-[#e8aaa3]/20 text-[#c27c75] px-2 py-0.5 rounded font-bold">お問い合わせ</span>
                          ) : (
                            <span className="text-[11px] bg-[#aeac78]/20 text-[#858354] px-2 py-0.5 rounded font-bold">お知らせ</span>
                          )}
                          <h4 className="font-bold text-gray-800 text-base">{isContact ? `${(item as any).name} 様より` : (item as any).title}</h4>
                          
                          {isContact && analysis && (
                            <div className="flex space-x-1.5 font-sans text-[10px]">
                              <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-200 font-bold">📦 {analysis.category}</span>
                              <span className={`px-1.5 py-0.5 rounded border font-bold ${analysis.urgency === '高' ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>🚨 緊急度: {analysis.urgency}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{displayDate}</span>
                      </div>
                      
                      <div className="text-sm text-gray-600 bg-gray-50/70 p-3 rounded border border-gray-100 whitespace-pre-wrap">{isContact ? (item as any).message : (item as any).content}</div>
                      
                      {isContact && analysis && (
                        <div className="mt-3 p-4 bg-[#fcf8f2] border border-[#e8aaa3]/40 rounded-lg text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="flex items-center justify-between border-b border-[#e8aaa3]/20 pb-1.5 mb-2">
                            <span className="text-xs font-bold text-[#c27c75] flex items-center">✨ 城主の返答案（Groq AI自動生成）</span>
                            <button 
                              onClick={() => navigator.clipboard.writeText(analysis.reply_draft).then(() => alert("返信文をコピーしました！"))}
                              className="text-[10px] text-gray-400 hover:text-[#c27c75] font-sans border border-gray-300 px-1.5 py-0.5 rounded bg-white transition-colors"
                            >
                              文面をコピー
                            </button>
                          </div>
                          <p className="text-gray-700 italic leading-relaxed whitespace-pre-wrap">{analysis.reply_draft}</p>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-xs mt-3 pt-2 border-t border-gray-100 text-gray-400">
                        <div>{isContact ? <span className="text-gray-400 font-sans">{(item as any).email}</span> : null}</div>
                        <div className="flex space-x-4">
                          {isContact ? (
                            <>
                              <button onClick={() => handleMarkAsRead(item.id)} className={`font-bold transition-colors ${isReplied ? 'text-gray-500 hover:text-[#aeac78]' : 'text-[#c27c75] hover:text-[#e8aaa3]'}`}>{isReplied ? "未対応に戻す" : "対応済みにする"}</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => openEditModal(item as News)} className="hover:text-[#aeac78] font-bold">編集</button>
                              <button onClick={() => handleDeleteNews(item.id)} className="hover:text-red-500 font-bold">削除</button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ─── 投稿・編集モーダル ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#aeac78] text-[#f3deb9] px-6 py-4 font-bold text-lg border-b border-white/10">
              {editingNewsId ? "お知らせの修正" : "新しいお知らせを追加する"}
            </div>
            <form onSubmit={handleSubmitNews} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">件名（タイトル）</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="例：夏季特別開城のお知らせ"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#aeac78] font-sans"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">内容</label>
                <textarea 
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="内容を入力してください..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#aeac78] font-sans"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2 text-sm font-sans">
                <button 
                  type="button" 
                  onClick={() => { setIsModalOpen(false); setEditingNewsId(null); }}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                >
                  戻る
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#e8aaa3] hover:bg-[#df9992] text-white font-bold rounded shadow-sm transition-colors disabled:opacity-50 font-yuji"
                >
                  {isSubmitting ? "処理中..." : (editingNewsId ? "修正する" : "追加する")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}