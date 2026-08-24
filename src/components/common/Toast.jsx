import React from 'react';

/**
 * 토스트 알림 컴포넌트
 * 계좌번호 복사 완료, 링크 복사 완료 등 피드백 메시지를 하단에 띄웁니다.
 */
export default function Toast({ message, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 transform animate-fade-in-up">
      <div className="bg-brand-charcoal/90 text-brand-ivory px-5 py-3 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 backdrop-blur-sm border border-brand-sand/30">
        <span className="inline-block w-2 h-2 rounded-full bg-brand-rose animate-ping"></span>
        <span>{message}</span>
      </div>
    </div>
  );
}
