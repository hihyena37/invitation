import React, { useState, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import InvitationSection from './components/InvitationSection';
import CalendarSection from './components/CalendarSection';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
import GuestbookSection from './components/GuestbookSection';
import AccountSection from './components/AccountSection';
import ShareSection from './components/ShareSection';
import Toast from './components/common/Toast';
import FloatingClovers from './components/common/FloatingClovers';

/**
 * 모바일 청첩장 메인 애플리케이션 루트 컴포넌트
 * 기획서 제약사항에 따라 PC/태블릿 환경에서도 max-w-[480px] 세로형 뷰로 고정 표시됩니다.
 */
export default function App() {
  const [toastState, setToastState] = useState({
    message: '',
    isVisible: false
  });

  // 토스트 메시지 띄우기 (3초 후 자동 소멸)
  const showToast = useCallback((message) => {
    setToastState({ message, isVisible: true });
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#E7EADF] py-0 sm:py-8">
      {/* 480px 모바일 전용 컨테이너 */}
      <main className="w-full max-w-[480px] min-h-screen bg-brand-ivory shadow-2xl overflow-x-hidden relative flex flex-col font-pretendard selection:bg-brand-sand-border/50">
        <FloatingClovers />

        {/* 01. 인트로 섹션 (D-Day 타이머 및 메인 스냅) */}
        <HeroSection />

        {/* 02. 모시는 글 & 연락처 섹션 */}
        <InvitationSection />

        {/* 02-1. 예식 일시 달력 섹션 */}
        <CalendarSection />

        {/* 03. 갤러리 섹션 */}
        <GallerySection />

        {/* 03-1. 오시는 길 & 지도 섹션 */}
        <LocationSection onCopyToast={showToast} />

        {/* 04. 마음 전하실 곳 (계좌번호 아코디언) */}
        <AccountSection onCopyToast={showToast} />

        {/* 04-1. 실시간 하객 방명록 섹션 */}
        <GuestbookSection onToast={showToast} />

        {/* 공유하기 & 푸터 */}
        <ShareSection onToast={showToast} />

        {/* 토스트 알림 컴포넌트 */}
        <Toast message={toastState.message} isVisible={toastState.isVisible} />
      </main>
    </div>
  );
}
