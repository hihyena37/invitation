import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ChevronDownIcon } from './common/Icons';
import FadeIn from './common/FadeIn';

/**
 * 03 섹션 (1): 사진 갤러리
 * 3열 Grid 레이아웃 + 터치/클릭 시 전체화면 라이트박스 확대 뷰어 모달
 */
export default function GallerySection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const images = WEDDING_DATA.galleryImages;
  // 기본적으로 6장 노출, '사진 더보기' 클릭 시 전체 사진 노출
  const displayedImages = isExpanded ? images : images.slice(0, 6);

  // 모달 이전 사진 이동
  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // 모달 다음 사진 이동
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-brand-ivory px-4 py-16 border-t border-brand-sand-light/60">
      <FadeIn>
        {/* 섹션 헤더 */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-sand font-medium mb-1">
            GALLERY
          </p>
          <h2 className="text-xl font-myeongjo font-bold text-brand-charcoal">
            우리의 아름다운 순간
          </h2>
          <p className="text-xs text-brand-muted mt-1 font-light">
            사진을 클릭하면 크게 보실 수 있습니다
          </p>
        </div>

        {/* 3열 Grid 갤러리 */}
        <div className="grid grid-cols-3 gap-2 max-w-[440px] mx-auto">
          {displayedImages.map((img, index) => (
            <div
              key={img.id}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-stone-200 cursor-pointer shadow-sm border border-white"
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* 사진 더보기 / 접기 토글 버튼 */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-xs font-semibold text-brand-sand-dark border border-brand-sand-border/50 shadow-sm transition-all duration-300 active:scale-95"
          >
            <span>{isExpanded ? '사진 접기' : `사진 더보기 (${images.length - 6}장)`}</span>
            <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDownIcon className="w-3.5 h-3.5 text-brand-sand" />
            </div>
          </button>
        </div>
      </FadeIn>

      {/* 라이트박스 전체화면 확대 모달 */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 backdrop-blur-md animate-fade-in-up"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* 상단 헤더: 카운터 및 닫기 버튼 */}
          <div className="flex items-center justify-between text-white/80 pt-2 px-2">
            <span className="text-xs font-mono tracking-widest">
              {selectedImageIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setSelectedImageIndex(null)}
              className="p-2 text-white hover:text-brand-rose transition-colors"
              aria-label="닫기"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* 중앙 이미지 및 좌우 네비게이션 */}
          <div className="relative flex-1 flex items-center justify-center my-auto max-h-[75vh]">
            <img
              src={images[selectedImageIndex].url}
              alt={images[selectedImageIndex].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl select-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* 이전 버튼 */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
              aria-label="이전 사진"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* 다음 버튼 */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
              aria-label="다음 사진"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* 하단 캡션 안내 */}
          <div className="text-center pb-4 text-white/70 text-xs font-myeongjo">
            {images[selectedImageIndex].caption}
          </div>
        </div>
      )}
    </section>
  );
}
