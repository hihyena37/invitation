import React, { useState, useEffect } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { MessageIcon, CloseIcon } from './common/Icons';
import FadeIn from './common/FadeIn';

const LOCAL_STORAGE_KEY = 'wedding_guestbook_entries_v1';
const EXAMPLE_GUEST_NAMES = new Set(['이몽룡', '향단이', '방자']);

/**
 * 04 섹션 (1): 실시간 축하 방명록
 * 하객 이름(guest_name), 축하 메시지(greeting_msg), 작성 시간(created_at) 저장 및 목록 표출
 * LocalStorage를 활용하여 브라우저 새로고침 시에도 데이터 유지
 */
export default function GuestbookSection({ onToast }) {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  // 초기 로컬 스토리지 데이터 로드 (없을 경우 기본 데이터 삽입)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        // 이전 버전에서 브라우저에 저장된 예시 방명록도 함께 제거한다.
        const storedMessages = JSON.parse(stored);
        const actualMessages = storedMessages.filter(
          (item) => !EXAMPLE_GUEST_NAMES.has(item.guest_name)
        );
        setMessages(actualMessages);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(actualMessages));
      } else {
        setMessages(WEDDING_DATA.initialGuestbook);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(WEDDING_DATA.initialGuestbook));
      }
    } catch {
      setMessages(WEDDING_DATA.initialGuestbook);
    }
  }, []);

  // 메시지 등록 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !messageText.trim()) {
      if (onToast) onToast('이름과 축하 메시지를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    // 날짜 포맷 생성 (YYYY-MM-DD HH:mm)
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newEntry = {
      id: Date.now(),
      guest_name: name.trim(),
      greeting_msg: messageText.trim(),
      password: password.trim() || '0000',
      created_at: formattedDate
    };

    const updatedMessages = [newEntry, ...messages];
    setMessages(updatedMessages);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMessages));
    } catch {
      // 로컬 스토리지 용량 초과 예외 처리
    }

    // 입력 폼 초기화
    setName('');
    setMessageText('');
    setPassword('');
    setIsSubmitting(false);

    if (onToast) {
      onToast('소중한 축하 글이 등록되었습니다.');
    }
  };

  // 메시지 삭제 핸들러 (비밀번호 확인)
  const handleDelete = (id, entryPassword) => {
    const inputPw = window.prompt('글 작성 시 입력한 비밀번호를 입력해주세요:');
    if (inputPw === null) return;

    if (inputPw === entryPassword || (!entryPassword && inputPw === '0000')) {
      const filtered = messages.filter((item) => item.id !== id);
      setMessages(filtered);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      if (onToast) onToast('방명록 글이 삭제되었습니다.');
    } else {
      if (onToast) onToast('비밀번호가 일치하지 않습니다.');
    }
  };

  const displayedMessages = messages.slice(0, visibleCount);

  return (
    <section className="w-full bg-brand-ivory px-6 py-16 border-t border-brand-sand-light/60">
      <FadeIn>
        {/* 섹션 헤더 */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-sand font-medium mb-1">
            GUESTBOOK
          </p>
          <h2 className="text-xl font-myeongjo font-bold text-brand-charcoal">
            신랑 · 신부에게 축하의 한마디
          </h2>
          <p className="text-xs text-brand-muted mt-1 font-light">
            따뜻한 축하와 격려의 메시지를 남겨주세요
          </p>
        </div>

        {/* 방명록 작성 폼 */}
        <div className="bg-white/90 rounded-2xl p-5 shadow-soft border border-brand-sand-border/40 max-w-[420px] mx-auto mb-8">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="작성자 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={15}
                className="w-full bg-brand-ivory/60 border border-brand-sand-border/50 rounded-xl px-3.5 py-2.5 text-xs text-brand-charcoal placeholder-brand-muted focus:outline-none focus:border-brand-rose focus:bg-white transition-colors"
                required
              />
              <input
                type="password"
                placeholder="삭제용 비밀번호 (선택)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={10}
                className="w-full bg-brand-ivory/60 border border-brand-sand-border/50 rounded-xl px-3.5 py-2.5 text-xs text-brand-charcoal placeholder-brand-muted focus:outline-none focus:border-brand-rose focus:bg-white transition-colors"
              />
            </div>

            <textarea
              placeholder="신랑, 신부에게 전할 축하 메시지를 남겨주세요."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={3}
              maxLength={200}
              className="w-full bg-brand-ivory/60 border border-brand-sand-border/50 rounded-xl px-3.5 py-2.5 text-xs text-brand-charcoal placeholder-brand-muted focus:outline-none focus:border-brand-rose focus:bg-white transition-colors resize-none"
              required
            />

            <div className="flex justify-between items-center pt-1">
              <span className="text-[11px] text-brand-muted">
                {messageText.length} / 200자
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-rose hover:bg-brand-rose-hover active:bg-brand-rose-dark text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                <MessageIcon className="w-3.5 h-3.5" />
                <span>등록하기</span>
              </button>
            </div>
          </form>
        </div>

        {/* 방명록 리스트 */}
        <div className="max-w-[420px] mx-auto space-y-3">
          {displayedMessages.length === 0 ? (
            <div className="text-center py-8 text-xs text-brand-muted font-myeongjo">
              첫 번째 축하 메시지를 남겨주세요!
            </div>
          ) : (
            displayedMessages.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 rounded-xl p-4 shadow-sm border border-brand-sand-border/30 text-left transition-all hover:bg-white"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-charcoal">
                      {item.guest_name}
                    </span>
                    <span className="text-[10px] text-brand-muted font-light">
                      {item.created_at}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.password)}
                    className="text-brand-muted/70 hover:text-red-400 text-xs p-1 transition-colors"
                    title="삭제하기"
                  >
                    <CloseIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-brand-charcoal/90 leading-relaxed font-light whitespace-pre-line">
                  {item.greeting_msg}
                </p>
              </div>
            ))
          )}

          {/* 방명록 더보기 버튼 */}
          {messages.length > visibleCount && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 5)}
                className="text-xs text-brand-sand-dark font-medium underline underline-offset-4 hover:text-brand-charcoal transition-colors"
              >
                축하 메시지 더보기 ({messages.length - visibleCount}개 남음)
              </button>
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
