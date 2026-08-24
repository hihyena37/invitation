import React from 'react';
import { CloverIcon } from './Icons';

const clovers = [
  { position: 'left-[5%]', size: 'w-3 h-3', color: 'text-brand-rose/35', motion: 'animate-clover-flutter-slow', delay: '[animation-delay:-3s]' },
  { position: 'left-[18%]', size: 'w-5 h-5', color: 'text-brand-sand-border/45', motion: 'animate-clover-flutter-reverse', delay: '[animation-delay:-9s]' },
  { position: 'left-[34%]', size: 'w-3.5 h-3.5', color: 'text-brand-rose/30', motion: 'animate-clover-flutter', delay: '[animation-delay:-14s]' },
  { position: 'left-[52%]', size: 'w-4 h-4', color: 'text-brand-sand/30', motion: 'animate-clover-flutter-reverse', delay: '[animation-delay:-5s]' },
  { position: 'left-[69%]', size: 'w-5 h-5', color: 'text-brand-sand-border/40', motion: 'animate-clover-flutter-slow', delay: '[animation-delay:-11s]' },
  { position: 'left-[84%]', size: 'w-3 h-3', color: 'text-brand-rose/35', motion: 'animate-clover-flutter', delay: '[animation-delay:-1s]' },
  { position: 'left-[94%]', size: 'w-4 h-4', color: 'text-brand-sand/25', motion: 'animate-clover-flutter-reverse', delay: '[animation-delay:-7s]' }
];

export default function FloatingClovers() {
  return (
    <div className="pointer-events-none fixed inset-y-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2 overflow-hidden" aria-hidden="true">
      {clovers.map((clover, index) => (
        <CloverIcon
          key={index}
          className={`absolute -top-10 ${clover.position} ${clover.size} ${clover.color} ${clover.motion} ${clover.delay}`}
        />
      ))}
    </div>
  );
}
