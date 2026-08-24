import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { CalendarIcon } from './common/Icons';
import FadeIn from './common/FadeIn';

/**
 * 예식 일시 달력 컴포넌트
 * 2026년 12월 달력과 12일 예식일 강조
 */
export default function CalendarSection() {
  // 2026년 12월 달력 데이터 (12월 1일은 화요일, 31일까지)
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  
  // 12월 1일 이전 빈 칸 (화요일 시작 -> 일, 월 2칸 공백)
  const blankDays = [null, null];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const calendarCells = [...blankDays, ...daysInMonth];

  return (
    <section className="w-full bg-brand-ivory px-6 py-12 border-t border-brand-sand-light/60">
      <FadeIn>
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.25em] text-brand-sand font-medium mb-1">
            <CalendarIcon className="w-3.5 h-3.5 text-brand-rose" />
            <span>WEDDING DAY</span>
          </div>
          <h3 className="font-myeongjo text-lg font-bold text-brand-charcoal">
            2026년 12월 12일 토요일 오후 12시
          </h3>
        </div>

        {/* 달력 컨테이너 */}
        <div className="bg-white/80 rounded-2xl p-6 shadow-soft border border-brand-sand-border/30 max-w-[360px] mx-auto">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold pb-3 border-b border-brand-sand-light/60">
            {daysOfWeek.map((day, idx) => (
              <span
                key={day}
                className={idx === 0 ? 'text-red-400' : idx === 6 ? 'text-blue-400' : 'text-brand-charcoal/70'}
              >
                {day}
              </span>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 text-center text-xs py-3 gap-y-2">
            {calendarCells.map((day, index) => {
              if (day === null) {
                return <div key={`blank-${index}`} className="h-8" />;
              }

              const isWeddingDay = day === 12;
              const isChristmas = day === 25;
              const isSunday = index % 7 === 0;
              const isSaturday = index % 7 === 6;

              return (
                <div
                  key={day}
                  className="h-10 flex items-center justify-center relative"
                >
                  {isWeddingDay ? (
                    <div className="w-8 h-8 rotate-45 rounded-t-full rounded-l-full bg-brand-rose-dark text-white font-bold flex items-center justify-center shadow-md">
                      <span className="-rotate-45">{day}</span>
                    </div>
                  ) : isChristmas ? (
                    <span className="font-bold text-red-500">{day}</span>
                  ) : (
                    <span
                      className={`font-medium ${
                        isSunday
                          ? 'text-red-400'
                          : isSaturday
                          ? 'text-blue-400'
                          : 'text-brand-charcoal/80'
                      }`}
                    >
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 하단 안내 메시지 */}
          <div className="text-center pt-3 border-t border-brand-sand-light/50">
            <p className="text-xs text-brand-sand font-myeongjo">
              신랑 박경돈 · 신부 성혜나의 예식일
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
