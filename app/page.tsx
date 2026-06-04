"use client";

import AboutSection from './components/AboutSection';
import OpeningHours from './components/OpeningHours';
import HistorySection from './components/HistorySection';
import HighlightsSlider from './components/HighlightsSlider';
import HomeAccess from './components/HomeAccess';
import HomeFooter from './components/HomeFooter';
import HomeHeader from './components/HomeHeader';
import HomeNews from './components/HomeNews'; 
import CastleChat from './components/CastleChat';





export default function Home(): React.JSX.Element {
  return (
    <>
      {/* 最初のセクション */}
      <HomeHeader />
      {/* 時間案内セクション */}
      <OpeningHours />
      {/* 紹介文セクション */}
      <AboutSection />
      {/* 見どころ紹介セクション */}
      <HighlightsSlider />
      {/* 歴史紹介セクション */}
      <HistorySection />
      {/* お知らせセクション */}
      <HomeNews />
      {/* 利用案内セクション */}
      <HomeAccess />
      <CastleChat />
      {/* フッター */}
      <HomeFooter />
    </>
  );
}