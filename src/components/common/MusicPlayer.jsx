import React, { useRef, useState, useEffect } from 'react';

/**
 * 배경음악 플레이어 (플로팅 버튼)
 * - 모바일 브라우저 자동재생 정책 때문에 소리가 있는 자동재생은 대부분 차단됨.
 * - 그래서 페이지 진입 시 자동재생을 "시도"하고, 브라우저가 막으면
 *   우측 하단 원형 버튼을 눌러서 재생을 시작하도록 처리한다.
 * - Opus를 우선 소스로 두고, 구형 브라우저(구형 iOS Safari 등) 호환을 위해
 *   mp3를 폴백 소스로 함께 제공한다.
 */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 진입 시 자동재생 시도 (대부분의 모바일 브라우저에서는 차단되어 catch로 빠짐)
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // 자동재생 차단됨 → 사용자가 버튼을 눌러야 재생 시작
        setIsPlaying(false);
      }
    };

    tryAutoplay();
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={`${import.meta.env.BASE_URL}audio/bgm.opus`} type="audio/ogg; codecs=opus" />
        <source src={`${import.meta.env.BASE_URL}audio/bgm.mp3`} type="audio/mpeg" />
      </audio>

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? '배경음악 정지' : '배경음악 재생'}
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-white/90 shadow-soft border border-brand-sand-border/40 flex items-center justify-center active:scale-95 transition-all"
      >
        {/* 재생 중이면 음표가 회전, 멈춰있으면 정지 아이콘 느낌으로 */}
        <span
          className={`text-lg ${isPlaying ? 'animate-spin' : ''}`}
          style={{ animationDuration: '3.5s' }}
        >
          {isPlaying ? '🎵' : '🔇'}
        </span>
      </button>
    </>
  );
}
