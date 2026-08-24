import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { MapPinIcon, PhoneIcon, CopyIcon } from './common/Icons';
import FadeIn from './common/FadeIn';

/**
 * 03 섹션 (2): 오시는 길 및 지도 안내
 * 예식장 주소 및 길찾기(카카오맵, 카카오내비, 티맵) 연동 버튼
 * 대중교통 및 주차 안내
 */
export default function LocationSection({ onCopyToast }) {
  const { venue, traffic } = WEDDING_DATA;

  // 주소 복사 핸들러
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venue.address);
    if (onCopyToast) {
      onCopyToast('주소가 복사되었습니다.');
    }
  };

  return (
    <section className="w-full bg-brand-ivory px-6 py-16 border-t border-brand-sand-light/60">
      <FadeIn>
        {/* 섹션 헤더 */}
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-sand font-medium mb-1">
            LOCATION
          </p>
          <h2 className="text-xl font-myeongjo font-bold text-brand-charcoal">
            오시는 길
          </h2>
          <p className="text-sm font-semibold text-brand-rose-dark mt-2 font-myeongjo">
            {venue.name} {venue.hall}
          </p>
          <p className="text-xs text-brand-muted mt-1 leading-relaxed">
            {venue.address}
          </p>
        </div>

        {/* 주소 복사 & 전화 문의 버튼 */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={handleCopyAddress}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-[11px] font-semibold text-brand-charcoal border border-brand-sand-border/50 shadow-sm transition-all active:scale-95"
          >
            <CopyIcon className="w-3.5 h-3.5 text-brand-sand" />
            <span>주소 복사</span>
          </button>
          {venue.tel && <a
            href={`tel:${venue.tel}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-white text-[11px] font-semibold text-brand-charcoal border border-brand-sand-border/50 shadow-sm transition-all active:scale-95"
          >
            <PhoneIcon className="w-3.5 h-3.5 text-brand-sand" />
            <span>예식장 전화</span>
          </a>}
        </div>

        {/* 인터랙티브 맵 UI (카카오맵 정적 임베드 + 핀 디자인) */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-soft border border-brand-sand-border/40 bg-stone-100 aspect-[4/3] max-w-[420px] mx-auto mb-6">
          <iframe
            title="구미 라뷰웨딩컨벤션 지도"
            src={`https://maps.google.com/maps?q=${venue.lat},${venue.lng}&z=16&output=embed`}
            className="w-full h-full border-0 grayscale-[20%]"
            loading="lazy"
            allowFullScreen
          />
          
          {/* 지도 상단 오버레이 뱃지 */}
          <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-full shadow-md text-xs font-semibold text-brand-charcoal flex items-center gap-1.5 border border-brand-sand-border/30">
            <MapPinIcon className="w-3.5 h-3.5 text-brand-rose" />
            <span>{venue.name}</span>
          </div>
        </div>

        {/* 내비게이션 앱 바로가기 3종 버튼 */}
        <div className="grid grid-cols-3 gap-2 max-w-[420px] mx-auto mb-10">
          <a
            href={venue.navigation.kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-h-14 px-2 bg-[#FEE500] text-[#191919] font-bold text-xs transition-all active:scale-95"
          >
            카카오맵
          </a>

          <a
            href={venue.navigation.kakaoNaviUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-h-14 px-2 bg-brand-rose-dark text-white font-bold text-xs transition-all active:scale-95"
          >
            <span>카카오내비</span>
          </a>

          {/* 티맵 */}
          <a
            href={venue.navigation.tmapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-h-14 px-2 border border-brand-rose-dark text-brand-rose-dark font-bold text-xs transition-all active:scale-95"
          >
            <span>티맵</span>
          </a>

        </div>

        {/* 대중교통 및 주차 안내 상세 리스트 */}
        <div className="bg-white/80 rounded-2xl p-5 shadow-soft border border-brand-sand-border/30 max-w-[420px] mx-auto space-y-4 text-left">
          {traffic.map((item, idx) => (
            <div key={idx} className={idx !== traffic.length - 1 ? "pb-3 border-b border-brand-sand-light/50" : ""}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                <h4 className="text-xs font-bold text-brand-charcoal">
                  {item.type}
                </h4>
              </div>
              <p className="text-xs text-brand-muted leading-6 pl-3 font-light whitespace-pre-line break-keep">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
