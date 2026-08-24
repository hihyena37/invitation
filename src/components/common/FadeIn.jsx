import React, { useEffect, useRef, useState } from 'react';

/**
 * 스크롤 감지 페이드인 래퍼 컴포넌트
 * IntersectionObserver API를 사용하여 요소가 화면(뷰포트)에 15% 이상 노출되면
 * 아래에서 위로 부드럽게 나타나는 Tailwind CSS 트랜지션을 적용합니다.
 */
export default function FadeIn({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // 뷰포트 진입 감지 옵저버 생성
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 한 번 화면에 나타나면 지속적으로 관찰할 필요가 없으므로 해제
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.15, // 요소가 15% 이상 보일 때 작동
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, []);

  // 딜레이별 Tailwind 클래스 매핑 (인라인 스타일 없이 순수 클래스로 구현)
  const delayClass = 
    delay === 100 ? 'delay-100' :
    delay === 200 ? 'delay-200' :
    delay === 300 ? 'delay-300' :
    delay === 500 ? 'delay-500' :
    delay === 700 ? 'delay-700' : '';

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
