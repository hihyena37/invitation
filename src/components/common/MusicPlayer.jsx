import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * 배경음악 플레이어 (플로팅 버튼)
 * - 페이지 진입 시 자동재생을 우선 시도한다.
 * - 모바일 브라우저는 소리 있는 자동재생을 대부분 차단하기 때문에,
 *   자동재생이 막히면 화면 아무 곳이나 처음 터치/클릭하는 순간 자동으로 재생을 시작한다.
 * - 사용자가 버튼을 눌러 직접 일시정지한 경우에는, 그 뒤 화면을 터치해도
 *   음악이 다시 자동으로 시작되지 않는다 (의도적인 일시정지 존중).
 */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const manuallyPausedRef = useRef(false);

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || manuallyPausedRef.current) return;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // 자동재생 차단됨 → 이후 첫 터치/클릭 시 재생 시도 (아래 리스너)
      });
  }, []);

  useEffect(() => {
    // 1) 진입 시 자동재생 시도
    attemptPlay();

    // 2) 자동재생이 막혔을 경우, 화면 아무 곳이나 첫 터치/클릭 시 재생 시작
    const unlock = () => attemptPlay();
    document.addEventListener('touchstart', unlock, { once: true });
    document.addEventListener('click', unlock, { once: true });

    return () => {
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('click', unlock);
    };
  }, [attemptPlay]);

  // 3) 화면을 끄거나 다른 앱/탭으로 이동하면 음악을 멈춘다.
  //    다시 돌아와도 자동으로 재생되지 않고, 버튼을 눌러야 다시 재생된다.
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio || !document.hidden) return;

      audio.pause();
      setIsPlaying(false);
      manuallyPausedRef.current = true;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      manuallyPausedRef.current = true;
    } else {
      manuallyPausedRef.current = false;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
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
        aria-label={isPlaying ? '배경음악 일시정지' : '배경음악 재생'}
        className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-white/90 shadow-soft border border-brand-sand-border/40 flex items-center justify-center active:scale-95 transition-all"
      >
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
