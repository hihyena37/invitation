import React, { useState, useEffect } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { CloverIcon } from './common/Icons';

/**
 * 01 섹션: 인트로 (Hero Section)
 * 메인 웨딩 스냅 사진 + 세로형 신랑/신부 이름 및 예식 일시
 * 초 단위로 줄어드는 D-Day 카운트다운 타이머
 */
export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  // D-Day 실시간 카운트다운 계산 로직
  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.date).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-brand-ivory overflow-hidden pt-10 pb-16 flex flex-col items-center">
      <CloverIcon className="absolute -left-8 top-24 w-24 h-24 text-brand-sand-border/25 rotate-12 animate-pulse" />
      <CloverIcon className="absolute -right-7 bottom-28 w-20 h-20 text-brand-sand-border/20 -rotate-12" />
      {/* 상단 서브 타이틀 */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-brand-sand font-light">
          INVITATION
        </p>
        <h1 className="text-3xl italic font-myeongjo text-brand-rose-dark font-bold mt-3 tracking-wide">
          {WEDDING_DATA.subtitle}
        </h1>
      </div>

      {/* 메인 비주얼 사진 및 이름 프레임 */}
      <div className="relative w-[88%] max-w-[400px] overflow-hidden rounded-t-[200px] drop-shadow-[0_16px_28px_rgba(31,50,4,0.13)]">
        <img
          src={WEDDING_DATA.galleryImages[0].url}
          alt="신랑 신부 메인 사진"
          className="w-full h-[455px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
          loading="eager"
        />
        
        {/* 사진 위 부드러운 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-rose-dark/55 via-transparent to-black/10 pointer-events-none" />

        {/* 사진 하단 날짜 정보 */}
        <div className="absolute bottom-5 inset-x-0 text-center text-white">
          <p className="font-myeongjo text-lg tracking-widest drop-shadow-md">
            {WEDDING_DATA.dateDisplay.year}. {WEDDING_DATA.dateDisplay.month}. {WEDDING_DATA.dateDisplay.day}. SAT
          </p>
          <p className="text-xs tracking-wider text-white/90 font-light mt-0.5 drop-shadow">
            {WEDDING_DATA.dateDisplay.dayOfWeek} {WEDDING_DATA.dateDisplay.time}
          </p>
          <p className="mt-1.5 text-[11px] tracking-wide text-white/95 drop-shadow">
            {WEDDING_DATA.venue.name} · {WEDDING_DATA.venue.hall}
          </p>
        </div>
      </div>

      {/* 신랑 & 신부 영문/한글 이름 타이포그래피 */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center gap-3 text-brand-charcoal font-myeongjo text-xl tracking-wider">
          <span className="font-bold">{WEDDING_DATA.groom.name}</span>
          <CloverIcon className="w-4 h-4 text-brand-sand-border" />
          <span className="font-bold">{WEDDING_DATA.bride.name}</span>
        </div>
        <p className="text-xs text-brand-sand mt-2 tracking-widest">
          GYEONGDON · HYENA
        </p>
      </div>

      {/* 디데이 카운트다운 타이머 박스 */}
      <div className="w-[88%] max-w-[400px] mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-soft border border-brand-sand-border/40 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs text-brand-sand font-medium mb-3">
          <CloverIcon className="w-3.5 h-3.5 text-brand-rose" />
          <span>예식일까지 남은 시간</span>
        </div>

        {timeLeft.isPast ? (
          <p className="font-myeongjo text-base text-brand-rose font-bold py-2">
            축복 속에 예식이 성황리에 마무리되었습니다.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center">
            {/* 일 */}
            <div className="bg-brand-ivory/80 rounded-xl py-2.5 px-1 border border-brand-sand-light">
              <span className="block text-xl font-bold font-pretendard text-brand-rose">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-brand-sand tracking-wide uppercase">DAYS</span>
            </div>
            {/* 시 */}
            <div className="bg-brand-ivory/80 rounded-xl py-2.5 px-1 border border-brand-sand-light">
              <span className="block text-xl font-bold font-pretendard text-brand-rose">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-brand-sand tracking-wide uppercase">HOUR</span>
            </div>
            {/* 분 */}
            <div className="bg-brand-ivory/80 rounded-xl py-2.5 px-1 border border-brand-sand-light">
              <span className="block text-xl font-bold font-pretendard text-brand-rose">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-brand-sand tracking-wide uppercase">MIN</span>
            </div>
            {/* 초 */}
            <div className="bg-brand-ivory/80 rounded-xl py-2.5 px-1 border border-brand-sand-light">
              <span className="block text-xl font-bold font-pretendard text-brand-rose">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-brand-sand tracking-wide uppercase">SEC</span>
            </div>
          </div>
        )}

        <p className="text-[11px] text-brand-muted mt-3">
          {timeLeft.isPast ? '' : `${WEDDING_DATA.groom.name} · ${WEDDING_DATA.bride.name}의 결혼식이 ${timeLeft.days}일 남았습니다.`}
        </p>
      </div>
    </section>
  );
}
