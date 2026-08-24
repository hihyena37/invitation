// 청첩장 기본 설정 데이터
export const WEDDING_DATA = {
  // 메인 카피 및 기본 정보
  title: '두 사람이 서로의 행운이 되어',
  subtitle: 'Our Wedding Day',
  date: '2026-12-12T12:00:00',
  dateDisplay: {
    year: '2026',
    month: '12',
    day: '12',
    dayOfWeek: '토요일',
    time: '오후 12시'
  },

  // 예식장 정보
  venue: {
    name: '라뷰웨딩컨벤션',
    hall: '3층 끌레르벨',
    address: '경북 구미시 새마을로 225',
    tel: '',
    lat: 36.1072,
    lng: 128.3658,
    navigation: {
      kakaoMapUrl: 'https://map.kakao.com/link/search/라뷰웨딩컨벤션',
      kakaoNaviUrl: 'https://map.kakao.com/link/to/라뷰웨딩컨벤션,36.1072,128.3658',
      tmapUrl: 'tmap://search?name=라뷰웨딩컨벤션'
    }
  },

  // 신랑 & 신부 정보
  groom: {
    name: '박경돈',
    relation: '아들',
    phone: '01075015320',
    father: {
      name: '박종준',
      deceased: false,
      phone: ''
    },
    mother: {
      name: '이미숙',
      deceased: false,
      phone: '01063585320',
      account: {
        bank: 'IM뱅크',
        number: '228-08-0107927',
        holder: '이미숙'
      }
    },
    account: {
      bank: '카카오뱅크',
      number: '3333-34-0023802',
      holder: '박경돈'
    }
  },

  bride: {
    name: '성혜나',
    relation: '딸',
    phone: '01062960440',
    father: {
      name: '성봉철',
      deceased: false,
      phone: '01035310614',
      account: {
        bank: '농협은행',
        number: '778-0220-5593',
        holder: '성봉철'
      }
    },
    mother: {
      name: '안명희',
      deceased: false,
      phone: '01026413422',
      account: {
        bank: '농협은행',
        number: '301-0005-7028-11',
        holder: '안명희'
      }
    },
    account: {
      bank: '농협',
      number: '352-0171-8417-53',
      holder: '성혜나'
    }
  },

  // 모시는 글 문구
  greeting: {
    title: '서로의 행운이 되어',
    paragraphs: [
      '두 사람이 서로의 행운이 되어,',
      '한 해의 마지막 달',
      '새로운 시작을 맞이합니다.',
      '',
      '귀한 걸음으로 함께해 주시어',
      '저희의 첫 시작을 축복해 주세요.'
    ]
  },

  // 갤러리 사진 목록
  galleryImages: [
    '앞.jpg',
    '3-4_20260614_101313(1).jpg',
    '3-4_20260614_101313(2).jpg',
    '5-6(1).jpg',
    '7-8(1).jpg',
    '7-8(2).jpg',
    '7-8(3).jpg',
    '8x12 (1).jpg',
    '8x12 (2).jpg',
    '9-10(1).jpg',
    '9-10(2).jpg',
    '9-10(3).jpg',
    '11-12(1).jpg',
    '11-12(2).jpg',
    '13-14(1).jpg',
    '13-14(2) (1).jpg',
    '15-16(1).jpg',
    '15-16(2).jpg',
    '17-18(1).jpg',
    '17-18(2).jpg',
    '19-20(1).jpg',
    '19-20(2).jpg',
    '20x30.jpg',
    '21-22(1).jpg',
    '21-22(2).jpg',
    '23-24_20260614_101339(1).jpg',
    '뒷.jpg'
  ].map((fileName, index) => ({
    id: index + 1,
    url: `${import.meta.env.BASE_URL}gallery/${fileName}`,
    alt: `박경돈 성혜나 웨딩 사진 ${index + 1}`,
    caption: '우리의 아름다운 순간'
  })),

  // 오시는 길 대중교통 및 주차 안내
  traffic: [
    {
      type: '버스',
      content: '구미역 승차 → 홈플러스 정문 건너 하차 → 형곡동 방향 도보 10분\n※ 노선은 변동될 수 있습니다.'
    },
    {
      type: '택시',
      content: '“라뷰웨딩컨벤션” 또는\n“경북 구미시 새마을로 225”를 말씀해 주세요.'
    },
    {
      type: '자가용',
      content: '구미IC → 광평동 홈플러스 방면 → 홈플러스 맞은편'
    },
    {
      type: '주차',
      content: '예식장 내 주차장 또는 제2주차장 이용\n제2주차장: 경북 구미시 공단동 282 (방림구미공장)\n예식장 ↔ 제2주차장 셔틀버스 수시 운행'
    }
  ],

  // 초기 방명록 데이터
  initialGuestbook: []
};
