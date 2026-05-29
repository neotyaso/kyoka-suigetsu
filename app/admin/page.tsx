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
  
  // 現在のタブ選択 ('all' | 'contacts' | 'news')
  const [activeTab, setActiveTab] = useState<'all' | 'contacts' | 'news'>('all');

  // 仮のログインユーザー情報
  const currentUser = { name: "城主 (あなた)" };

  useEffect(() => {
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
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#fcfaf2] text-[#aeac78] font-yuji">
        城内資料を編纂中...
      </div>
    );
  }

  // タイムライン用にデータを混ぜて日付順（新しい順）にソート
  const timelineItems = [
    ...contacts.map(c => ({ ...c, type: 'contact' as const, timestamp: new Date(c.createdAt).getTime() })),
    ...news.map(n => ({ ...n, type: 'news' as const, timestamp: new Date(n.date).getTime() }))
  ].sort((a, b) => b.timestamp - a.timestamp);

  // タブフィルターの適用
  const filteredTimeline = timelineItems.filter(item => {
    if (activeTab === 'contacts') return item.type === 'contact';
    if (activeTab === 'news') return item.type === 'news';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fcfaf2] text-gray-800 flex flex-col font-yuji">
      
      {/* ─── 上部ヘッダー（ベースカラー：あいす・あいぼりー） ─── */}
      <header className="bg-white text-[#e8aaa3] px-6 py-4 flex justify-between items-center shadow-sm border-b border-[#e8aaa3]">
        <Link href="/" className="text-2xl font-bold tracking-wider hover:opacity-80 transition-opacity flex items-center">
          鏡花水月城 <span className="text-[10px] border border-gray-400 px-2 py-0.5 rounded ml-2 font-sans">ホームへ戻る</span>
        </Link>
        
        {/* 右側のアカウントメニュー */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#e8aaa3] rounded-full"></span>
            <span className="text-[#e8aaa3]">対座中: <strong className="text-[#e8aaa3]">{currentUser.name}</strong></span>
          </div>
          <button className="text-[#e8aaa3] hover:text-gray-900 transition-colors">
            アカウント追加
          </button>
          <button className="border border-gray-400 hover:bg-white/40 px-3 py-1 rounded transition-colors text-xs">
            ログアウト
          </button>
        </div>
      </header>

      {/* ─── メインコンテンツ（2カラム構成） ─── */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* 左側：サイドバー（サブカラー：ジャパン・ティー） */}
        <aside className="w-full md:w-80 bg-[#aeac78] text-[#f3deb9] p-6 flex flex-col space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-wide border-b border-white/20 pb-2">
              管理画面
            </h2>
          </div>

          {/* ナビゲーションボタン */}
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all ${
                activeTab === 'all' ? 'bg-[#f3deb9] text-[#aeac78] shadow-sm' : 'hover:bg-white/10 text-[#f3deb9]'
              }`}
            >
              🌐 総合一覧（全着信）
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all flex justify-between items-center ${
                activeTab === 'contacts' ? 'bg-[#f3deb9] text-[#f3deb9] shadow-sm' : 'hover:bg-white/10 text-[#f3deb9]'
              }`}
            >
              <span>📥 お問い合わせ管理</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'contacts' ? 'bg-[#e8aaa3] text-white' : 'bg-white/20'}`}>
                {contacts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full text-left px-4 py-3 rounded-lg font-bold transition-all flex justify-between items-center ${
                activeTab === 'news' ? 'bg-[#f3deb9] text-gray-800 shadow-sm' : 'hover:bg-white/10 text-white'
              }`}
            >
              <span>📢 お知らせ管理</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'news' ? 'bg-[#e8aaa3] text-white' : 'bg-white/20'}`}>
                {news.length}
              </span>
            </button>
          </nav>

          {/* アクセントカラー：ういろう・ピンクの布告ボタン */}
          <div className="pt-4 border-t border-white/10">
            <button className="w-full bg-[#e8aaa3] hover:bg-[#df9992] text-white py-2.5 rounded-lg font-bold text-sm transition-colors shadow-sm tracking-wider">
              ＋ 新しいお知らせを布告
            </button>
          </div>
        </aside>

        {/* 右側：SNS・メール風タイムライン */}
        <main className="flex-1 p-6 md:p-8 max-w-4xl bg-[#f3deb9]">
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
            <h3 className="text-xl font-bold text-gray-700">
              {activeTab === 'all' && '🏯 城内総合タイムライン（最新順）'}
              {activeTab === 'contacts' && '📥 届いたお問い合わせ（最新順）'}
              {activeTab === 'news' && '📢 布告済みのお知らせ一覧'}
            </h3>
            <span className="text-xs text-gray-400">自動更新有効</span>
          </div>

          {/* タイムラインストリーム */}
          <div className="space-y-4">
            {filteredTimeline.length === 0 ? (
              <p className="text-center text-gray-400 py-12 bg-white rounded border border-gray-200">該当する通信はありません。</p>
            ) : (
              filteredTimeline.map((item) => (
                <div 
                  key={`${item.type}-${item.id}`} 
                  className={`p-5 rounded-lg bg-white border transition-all duration-200 ${
                    item.type === 'contact' 
                      ? 'border-l-4 border-l-[#e8aaa3] border-gray-200 hover:shadow-sm' // 左線をういろう・ピンクに
                      : 'border-l-4 border-l-[#aeac78] border-gray-200 hover:shadow-sm' // 左線をジャパン・ティーに
                  }`}
                >
                  {/* アイテムヘッダー */}
                  <div className="flex justify-between items-start mb-2 ">
                    <div className="flex items-center space-x-2">
                      {item.type === 'contact' ? (
                        <span className="text-[11px] bg-[#e8aaa3]/20 text-[#c27c75] px-2 py-0.5 rounded font-bold">お問い合わせ</span>
                      ) : (
                        <span className="text-[11px] bg-[#aeac78]/20 text-[#858354] px-2 py-0.5 rounded font-bold">お知らせ</span>
                      )}
                      <h4 className="font-bold text-gray-800 text-base">
                        {item.type === 'contact' ? `${(item as any).name} 様より` : (item as any).title}
                      </h4>
                    </div>
                    <span className="text-xs text-gray-400">
                      {item.type === 'contact' ? (item as any).createdAt : (item as any).date}
                    </span>
                  </div>

                  {/* アイテム本文（メール・SNS風） */}
                  <div className="text-sm text-gray-600 bg-gray-50/70 p-3 rounded border border-gray-100 whitespace-pre-wrap">
                    {item.type === 'contact' ? (item as any).message : (item as any).content}
                  </div>

                  {/* アクションボタン */}
                  <div className="flex justify-end space-x-4 text-xs mt-3 pt-2 border-t border-gray-100 text-gray-400">
                    {item.type === 'contact' ? (
                      <>
                        <span className="text-gray-400 font-sans">{item.email}</span>
                        <button className="hover:text-[#e8aaa3] font-bold transition-colors">対応済みにする</button>
                      </>
                    ) : (
                      <>
                        <button className="hover:text-[#aeac78] font-bold transition-colors">編集</button>
                        <button className="hover:text-red-500 font-bold transition-colors">削除</button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

      </div>
    </div>
  );
}