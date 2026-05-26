
// お知らせ（News）用の型
export type News = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  published_at?: string; 
};

// 見どころ・四季（Highlight）用の型
export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonItem {
  name: string;
  detail: string;
  description: string;
  image: string;
  buttonColor: string;
}

// アクセス案内（Access）用の型
export interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface AccessMethod {
  label: string;
  detail: string;
}


// トップページ（Home）用の型
export interface MenuItem {
  name: string;
  to: string;
}