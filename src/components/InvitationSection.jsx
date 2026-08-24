import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { PhoneIcon, MessageIcon, CloseIcon, CloverIcon } from './common/Icons';
import FadeIn from './common/FadeIn';

/**
 * 02 섹션: 모시는 글 및 연락처 안내
 * 감성 명조체 인사말 + 신랑·신부 및 양가 혼주 연락처 팝업 모달
 */
export default function InvitationSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-brand-ivory px-6 py-16 text-center border-t border-brand-sand-light/60">
      <FadeIn>
        {/* 상단 장식 아이콘 */}
        <div className="flex justify-center text-brand-rose mb-4 opacity-80">
          <CloverIcon className="w-7 h-7" />
        </div>

        {/* 섹션 서브타이틀 */}
        <p className="text-xs uppercase tracking-[0.3em] text-brand-sand font-medium mb-2">
          INVITATION
        </p>
        <h2 className="text-xl font-myeongjo font-bold text-brand-charcoal mb-8">
          {WEDDING_DATA.greeting.title}
        </h2>

        {/* 모시는 글 본문 */}
        <div className="font-myeongjo text-sm leading-8 text-brand-charcoal/90 space-y-1 mb-10">
          {WEDDING_DATA.greeting.paragraphs.map((line, idx) => (
            line === '' ? (
              <div key={idx} className="h-4" />
            ) : (
              <p key={idx} className="tracking-wide">
                {line}
              </p>
            )
          ))}
        </div>

        {/* 혼주 및 신랑/신부 이름 정렬 */}
        <div className="bg-white/60 rounded-2xl p-6 shadow-sm border border-brand-sand-border/30 max-w-[380px] mx-auto mb-8 font-myeongjo">
          <div className="flex items-center justify-between text-sm py-1.5 border-b border-brand-sand-light/50">
            <span className="text-brand-muted text-xs">
              <strong className="text-brand-charcoal font-semibold">{WEDDING_DATA.groom.father.name}</strong> ·{' '}
              <strong className="text-brand-charcoal font-semibold">{WEDDING_DATA.groom.mother.name}</strong>
              <span className="text-[11px] text-brand-sand ml-1">의 {WEDDING_DATA.groom.relation}</span>
            </span>
            <span className="text-base font-bold text-brand-charcoal tracking-widest pl-2">
              {WEDDING_DATA.groom.name}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm py-1.5 pt-3">
            <span className="text-brand-muted text-xs">
              <strong className="text-brand-charcoal font-semibold">{WEDDING_DATA.bride.father.name}</strong> ·{' '}
              <strong className="text-brand-charcoal font-semibold">{WEDDING_DATA.bride.mother.name}</strong>
              <span className="text-[11px] text-brand-sand ml-1">의 {WEDDING_DATA.bride.relation}</span>
            </span>
            <span className="text-base font-bold text-brand-charcoal tracking-widest pl-2">
              {WEDDING_DATA.bride.name}
            </span>
          </div>
        </div>

        {/* 연락하기 버튼 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center gap-2 bg-brand-sand/15 hover:bg-brand-sand/25 text-brand-sand-dark px-6 py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 active:scale-95 border border-brand-sand/30"
          >
            <PhoneIcon className="w-4 h-4 text-brand-sand" />
            <span>신랑 · 신부에게 축하 연락하기</span>
          </button>
        </div>
      </FadeIn>

      {/* 연락처 팝업 모달 */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in-up">
          <div className="bg-brand-ivory w-full max-w-[360px] rounded-3xl p-6 shadow-modal border border-brand-sand-light relative max-h-[90vh] overflow-y-auto">
            {/* 모달 닫기 버튼 */}
            <button
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-5 right-5 text-brand-sand hover:text-brand-charcoal transition-colors p-1"
              aria-label="닫기"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <h3 className="text-center font-myeongjo text-lg font-bold text-brand-charcoal mb-6">
              축하 연락처 안내
            </h3>
            <p className="text-center text-[11px] text-brand-muted -mt-3 mb-5">
              연락처 번호는 전달받은 뒤 연결됩니다.
            </p>

            {/* 신랑측 연락처 */}
            <div className="mb-6 bg-white/70 rounded-2xl p-4 border border-brand-sand-border/30">
              <p className="text-xs font-bold text-brand-sand tracking-widest mb-3 text-left">
                신랑측
              </p>
              
              {/* 신랑 */}
              <div className="flex items-center justify-between py-2 border-b border-brand-sand-light/50">
                <span className="text-xs font-medium text-brand-charcoal">
                  신랑 <strong className="text-sm font-bold ml-1">{WEDDING_DATA.groom.name}</strong>
                </span>
                <div className="flex gap-2">
                  <a
                    href={WEDDING_DATA.groom.phone ? `tel:${WEDDING_DATA.groom.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-rose/15 hover:bg-brand-rose text-brand-rose hover:text-white flex items-center justify-center transition-colors"
                    title="전화하기"
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={WEDDING_DATA.groom.phone ? `sms:${WEDDING_DATA.groom.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/15 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                    title="문자하기"
                  >
                    <MessageIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 신랑 혼주 (아버지) */}
              <div className="flex items-center justify-between py-2 border-b border-brand-sand-light/50">
                <span className="text-xs font-medium text-brand-muted">
                  아버지 <span className="text-xs font-semibold text-brand-charcoal ml-1">{WEDDING_DATA.groom.father.name}</span>
                </span>
                <div className="flex gap-2">
                  <a
                    href={WEDDING_DATA.groom.father.phone ? `tel:${WEDDING_DATA.groom.father.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/10 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={WEDDING_DATA.groom.father.phone ? `sms:${WEDDING_DATA.groom.father.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/10 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                  >
                    <MessageIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 신랑 혼주 (어머니) */}
              <div className="flex items-center justify-between py-2">
                <span className="text-xs font-medium text-brand-muted">
                  어머니 <span className="text-xs font-semibold text-brand-charcoal ml-1">{WEDDING_DATA.groom.mother.name}</span>
                </span>
                <div className="flex gap-2">
                  <a
                    href={WEDDING_DATA.groom.mother.phone ? `tel:${WEDDING_DATA.groom.mother.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/10 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={WEDDING_DATA.groom.mother.phone ? `sms:${WEDDING_DATA.groom.mother.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/10 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                  >
                    <MessageIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* 신부측 연락처 */}
            <div className="bg-white/70 rounded-2xl p-4 border border-brand-sand-border/30">
              <p className="text-xs font-bold text-brand-rose tracking-widest mb-3 text-left">
                신부측
              </p>
              
              {/* 신부 */}
              <div className="flex items-center justify-between py-2 border-b border-brand-sand-light/50">
                <span className="text-xs font-medium text-brand-charcoal">
                  신부 <strong className="text-sm font-bold ml-1">{WEDDING_DATA.bride.name}</strong>
                </span>
                <div className="flex gap-2">
                  <a
                    href={WEDDING_DATA.bride.phone ? `tel:${WEDDING_DATA.bride.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-rose/15 hover:bg-brand-rose text-brand-rose hover:text-white flex items-center justify-center transition-colors"
                    title="전화하기"
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={WEDDING_DATA.bride.phone ? `sms:${WEDDING_DATA.bride.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/15 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                    title="문자하기"
                  >
                    <MessageIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 신부 혼주 (아버지) */}
              <div className="flex items-center justify-between py-2 border-b border-brand-sand-light/50">
                <span className="text-xs font-medium text-brand-muted">
                  아버지 <span className="text-xs font-semibold text-brand-charcoal ml-1">{WEDDING_DATA.bride.father.name}</span>
                </span>
                <div className="flex gap-2">
                  <a
                    href={WEDDING_DATA.bride.father.phone ? `tel:${WEDDING_DATA.bride.father.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/10 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={WEDDING_DATA.bride.father.phone ? `sms:${WEDDING_DATA.bride.father.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/10 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                  >
                    <MessageIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* 신부 혼주 (어머니) */}
              <div className="flex items-center justify-between py-2">
                <span className="text-xs font-medium text-brand-muted">
                  어머니 <span className="text-xs font-semibold text-brand-charcoal ml-1">{WEDDING_DATA.bride.mother.name}</span>
                </span>
                <div className="flex gap-2">
                  <a
                    href={WEDDING_DATA.bride.mother.phone ? `tel:${WEDDING_DATA.bride.mother.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/10 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={WEDDING_DATA.bride.mother.phone ? `sms:${WEDDING_DATA.bride.mother.phone}` : undefined}
                    className="w-8 h-8 rounded-full bg-brand-sand/10 hover:bg-brand-sand text-brand-sand hover:text-white flex items-center justify-center transition-colors"
                  >
                    <MessageIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
