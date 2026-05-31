"use client";

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

export default function AdminDashboard(): React.JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'contacts' | 'news'>('all');

  // 💡 お知らせ投稿用の状態管理
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const currentUser = { name: "城主 (あなた)" };

  // データ取得関数
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
    fetchAdminData();
  }, []);

  // 🚀 お知らせを送信する関数
  async function handlePostNews(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle || !newContent) return alert("件名と本文を入力してください。");

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent })
      });

      if (response.ok) {
        // 送信成功したら入力欄をリセットしてモーダルを閉じる
        setNewTitle('');
        setNewContent('');
        setIsModalOpen(false);
        // 最新のデータを再取得して画面を更新
        await fetchAdminData();
      } else {
        alert("投稿に失敗しました。");
      }
    } catch (error) {
      console.error("投稿エラー:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f3deb9] text-[#aeac78] font-yuji">
        城内資料を編纂中...
      </div>
    );
  }

  const timelineItems = [
    ...contacts.map(c => ({ ...c, type: 'contact' as const, timestamp: new Date(c.createdAt).getTime() })),
    ...news.map(n => ({ ...n, type: 'news' as const, timestamp: new Date(n.date).getTime() }))
  ].sort((a, b) => b.timestamp - a.timestamp);

  const filteredTimeline = timelineItems.filter(item => {
    if (activeTab === 'contacts') return item.type === 'contact';
    if (activeTab === 'news') return item.type === 'news';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f3deb9] text-gray-800 flex flex-col font-yuji relative">
      
      {/* ヘッダー */}
      <header className="bg-white text-[#e8aaa3] px-6 py-4 flex justify-between items-center shadow-sm border-b border-[#e8aaa3] z-10">
        <Link href="/" className="text-2xl font-bold tracking-wider hover:opacity-80 transition-opacity flex items-center">
          鏡花水月城 <span className="text-[10px] border border-gray-400 px-2 py-0.5 rounded ml-2 font-sans">ホームへ戻る</span>
        </Link>
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#e8aaa3] rounded-full"></span>
            <span className="text-[#e8aaa3]">対座中: <strong className="text-[#e8aaa3]">{currentUser.name}</strong></span>
          </div>
          <button className="text-[#e8aaa3] hover:text-gray-900 transition-colors">アカウント追加</button>
          <button className="border border-gray-400 hover:bg-white/40 px-3 py-1 rounded transition-colors text-xs text-gray-600">ログアウト</button>
        </div>
      </header>

      {/* メインエリア */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* サイドバー */}
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

          {/* 💡 ボタンを押したらモーダルを開くように変更 */}
          <div className="pt-4 border-t border-white/10">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white hover:bg-[#f3deb9] text-[#e8aaa3] py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm tracking-wider"
            >
              ＋ 新しいお知らせを布告
            </button>
          </div>
        </aside>

        {/* タイムライン */}
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
                filteredTimeline.map((item) => (
                  <div key={`${item.type}-${item.id}`} className={`p-5 rounded-lg bg-white border border-gray-200/80 transition-all duration-200 ${item.type === 'contact' ? 'border-l-4 border-l-[#e8aaa3]' : 'border-l-4 border-l-[#aeac78]'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        {item.type === 'contact' ? <span className="text-[11px] bg-[#e8aaa3]/20 text-[#c27c75] px-2 py-0.5 rounded font-bold">お問い合わせ</span> : <span className="text-[11px] bg-[#aeac78]/20 text-[#858354] px-2 py-0.5 rounded font-bold">お知らせ</span>}
                        <h4 className="font-bold text-gray-800 text-base">{item.type === 'contact' ? `${(item as any).name} 様より` : (item as any).title}</h4>
                      </div>
                      <span className="text-xs text-gray-400">{item.type === 'contact' ? (item as any).createdAt : (item as any).date}</span>
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50/70 p-3 rounded border border-gray-100 whitespace-pre-wrap">{item.type === 'contact' ? (item as any).message : (item as any).content}</div>
                    <div className="flex justify-end space-x-4 text-xs mt-3 pt-2 border-t border-gray-100 text-gray-400">
                      {item.type === 'contact' ? (
                        <><span className="text-gray-400 font-sans">{item.email}</span><button className="hover:text-[#e8aaa3] font-bold">対応済みにする</button></>
                      ) : (
                        <><button className="hover:text-[#aeac78] font-bold">編集</button><button className="hover:text-red-500 font-bold">削除</button></>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ─── 💡 新しいお知らせを布告する入力ポップアップ（モーダル） ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#aeac78] text-[#f3deb9] px-6 py-4 font-bold text-lg border-b border-white/10">
              📜 新たなお知らせの布告
            </div>
            <form onSubmit={handlePostNews} className="p-6 space-y-4">
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
                <label className="block text-sm font-bold text-gray-700 mb-1">布告本文</label>
                <textarea 
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="城民に伝える内容を入力してください..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#aeac78] font-sans"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2 text-sm font-sans">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                >
                  引き下がる
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#e8aaa3] hover:bg-[#df9992] text-white font-bold rounded shadow-sm transition-colors disabled:opacity-50 font-yuji"
                >
                  {isSubmitting ? "布告中..." : "布告する"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}