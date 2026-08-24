import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { ChevronDownIcon, CopyIcon, CloverIcon } from './common/Icons';
import FadeIn from './common/FadeIn';

const accountGroups = [
  { id: 'groom', label: '신랑측', accounts: [{ role: '신랑', ...WEDDING_DATA.groom.account }, { role: '혼주', ...WEDDING_DATA.groom.mother.account }] },
  { id: 'bride', label: '신부측', accounts: [{ role: '신부', ...WEDDING_DATA.bride.account }, { role: '혼주', ...WEDDING_DATA.bride.father.account }, { role: '혼주', ...WEDDING_DATA.bride.mother.account }] }
];

export default function AccountSection({ onCopyToast }) {
  const [openAccordion, setOpenAccordion] = useState(null);
  const handleCopyAccount = (account) => {
    navigator.clipboard.writeText(account.number);
    if (onCopyToast) onCopyToast(`${account.holder} 님의 계좌번호가 복사되었습니다.`);
  };

  return (
    <section className="w-full bg-brand-ivory px-6 py-20 border-t border-brand-sand-light/60">
      <FadeIn>
        <div className="text-center mb-9">
          <CloverIcon className="w-6 h-6 text-brand-rose mx-auto mb-3" />
          <p className="text-xs italic tracking-[0.3em] text-brand-sand mb-1">FOR YOUR HEART</p>
          <h2 className="text-xl font-myeongjo font-bold text-brand-rose-dark">마음 전하실 곳</h2>
          <p className="text-xs text-brand-muted mt-3 leading-6 font-myeongjo">참석이 어려우신 분들을 위해<br />축하의 마음을 전할 곳을 안내드립니다.</p>
        </div>
        <div className="max-w-[420px] mx-auto space-y-3">
          {accountGroups.map((group) => {
            const isOpen = openAccordion === group.id;
            return (
              <div key={group.id} className="border-y border-brand-sand-border/70 bg-white overflow-hidden">
                <button type="button" onClick={() => setOpenAccordion(isOpen ? null : group.id)} className="w-full flex items-center justify-between px-1 py-5 text-sm font-semibold text-brand-rose-dark" aria-expanded={isOpen}>
                  <span>{group.label} 계좌번호</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <div className="pb-4 space-y-2 animate-fade-in-up">
                  {group.accounts.map((account) => <div key={account.number} className="flex items-center justify-between bg-brand-ivory-dark px-4 py-3">
                    <div className="min-w-0"><p className="text-xs font-semibold text-brand-charcoal">{account.role} {account.holder}</p><p className="text-xs text-brand-muted mt-1">{account.bank} {account.number}</p></div>
                    <button type="button" onClick={() => handleCopyAccount(account)} className="ml-3 min-h-10 px-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-rose-dark border border-brand-sand-border"><CopyIcon className="w-3.5 h-3.5" /> 복사</button>
                  </div>)}
                </div>}
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
