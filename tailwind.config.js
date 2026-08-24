/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#FFFFFF',
          'ivory-dark': '#F7F9F1',
          rose: '#7FA542',
          'rose-hover': '#6D9236',
          'rose-dark': '#1F3204',
          'rose-light': '#EEF5D8',
          sand: '#61743B',
          'sand-light': '#E7EDD8',
          'sand-border': '#C9DC8F',
          'sand-dark': '#1F3204',
          charcoal: '#23231E',
          muted: '#6D7165'
        }
      },
      fontFamily: {
        myeongjo: ['"Nanum Myeongjo"', 'serif'],
        pretendard: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(31, 50, 4, 0.08)',
        'card': '0 4px 20px -2px rgba(31, 50, 4, 0.08)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        },
        cloverFlutter: {
          '0%': { opacity: '0', transform: 'translate3d(-35px, -10vh, 0) rotate(0deg) scaleX(1)' },
          '8%': { opacity: '1' },
          '22%': { transform: 'translate3d(34px, 18vh, 0) rotate(105deg) scaleX(0.55)' },
          '43%': { transform: 'translate3d(-24px, 41vh, 0) rotate(225deg) scaleX(1)' },
          '61%': { transform: 'translate3d(48px, 62vh, 0) rotate(330deg) scaleX(0.4)' },
          '82%': { opacity: '0.8', transform: 'translate3d(2px, 86vh, 0) rotate(470deg) scaleX(0.85)' },
          '100%': { opacity: '0', transform: 'translate3d(58px, 110vh, 0) rotate(590deg) scaleX(0.5)' }
        },
        cloverFlutterReverse: {
          '0%': { opacity: '0', transform: 'translate3d(38px, -12vh, 0) rotate(30deg) scaleX(0.5)' },
          '10%': { opacity: '1' },
          '26%': { transform: 'translate3d(-42px, 21vh, 0) rotate(-100deg) scaleX(1)' },
          '49%': { transform: 'translate3d(26px, 47vh, 0) rotate(-235deg) scaleX(0.4)' },
          '70%': { transform: 'translate3d(-50px, 70vh, 0) rotate(-360deg) scaleX(0.9)' },
          '88%': { opacity: '0.75', transform: 'translate3d(12px, 92vh, 0) rotate(-490deg) scaleX(0.5)' },
          '100%': { opacity: '0', transform: 'translate3d(-36px, 110vh, 0) rotate(-610deg) scaleX(1)' }
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'heart-pulse': 'heartbeat 2s infinite ease-in-out',
        'clover-flutter': 'cloverFlutter 14s cubic-bezier(0.42, 0, 0.58, 1) infinite',
        'clover-flutter-slow': 'cloverFlutter 19s cubic-bezier(0.42, 0, 0.58, 1) infinite',
        'clover-flutter-reverse': 'cloverFlutterReverse 16s cubic-bezier(0.42, 0, 0.58, 1) infinite'
      }
    },
  },
  plugins: [],
}
