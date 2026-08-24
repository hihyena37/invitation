import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { ShareIcon, CopyIcon, CloverIcon } from './common/Icons';
import FadeIn from './common/FadeIn';

const SHARE_URL = 'https://hihyena37.github.io/invitation/?v=20260824-2';

/**
 * 공유하기 및 푸터 섹션
 * 카카오톡 공유 / 링크 복사 / 화환 안내 및 저작권 표시
 */
export default function ShareSection({ onToast }) {
  // 청첩장 링크 복사
  const handleCopyLink = () => {
    navigator.clipboard.writeText(SHARE_URL);
    if (onToast) {
      onToast('청첩장 링크가 복사되었습니다.');
    }
  };

  // Web Share API 또는 링크 복사
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '박경돈 ♡ 성혜나 결혼식에 초대합니다',
          text: '2026년 12월 12일 토요일 오후 12시, 라뷰웨딩컨벤션',
          url: SHARE_URL,
        });
      } catch {
        // 사용자가 취소한 경우 무시
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <footer className="w-full bg-brand-ivory px-6 pt-12 pb-16 border-t border-brand-sand-light/60 text-center">
      <FadeIn>
        {/* 공유 버튼 영역 */}
        <div className="flex justify-center gap-3 max-w-[360px] mx-auto mb-10">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] py-3.5 px-4 rounded-2xl font-bold text-xs shadow-sm transition-all active:scale-95"
          >
            <ShareIcon className="w-4 h-4" />
            <span>청첩장 공유하기</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-brand-charcoal py-3.5 px-4 rounded-2xl font-bold text-xs shadow-sm border border-brand-sand-border/50 transition-all active:scale-95"
          >
            <CopyIcon className="w-4 h-4 text-brand-sand" />
            <span>링크 복사</span>
          </button>
        </div>

        {/* 축하 화환 안내 */}
        <div className="bg-white/60 rounded-xl p-4 max-w-[360px] mx-auto mb-10 border border-brand-sand-border/20 text-center">
          <p className="text-[11px] text-brand-muted leading-relaxed font-light">
            보내주시는 축하와 정성에 깊이 감사드립니다.
          </p>
        </div>

        {/* 푸터 하단 문구 */}
        <div className="space-y-2 text-center text-brand-muted">
          <div className="flex items-center justify-center gap-1.5 text-xs text-brand-sand">
            <span>{WEDDING_DATA.groom.name}</span>
            <CloverIcon className="w-3 h-3 text-brand-rose" />
            <span>{WEDDING_DATA.bride.name}</span>
          </div>
          <p className="text-[10px] tracking-widest uppercase text-brand-sand/70 font-light">
            Thank you for being with us
          </p>
          <p className="text-[9px] text-brand-sand/50">
            © 2026. All rights reserved.
          </p>
        </div>
      </FadeIn>
    </footer>
  );
}
