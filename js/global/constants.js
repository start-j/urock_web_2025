// 전역 상수 정의
export const CONSTANTS = {
  // API 관련 상수
  API: {
    BASE_URL: '',
    TIMEOUT: 5000,
  },

  // UI 관련 상수
  UI: {
    ANIMATION_DURATION: 300,
    DEBOUNCE_DELAY: 300
  },

  // 경로 관련 상수
  PATHS: {
    IMAGES: '/public/images/',
    ICONS: '/public/icons/',
    LOGO: '/public/logo/'
  },

  // 색상 관련 상수
  COLORS: {
    primary: '#007bff',
    danger: '#dc3545',
    success: '#28a745',
  },

  // 메시지 관련 상수 (utils/constants.js 병합)
  MESSAGES: {
    ERROR: {
      NETWORK: '네트워크 오류가 발생했습니다.',
      UNKNOWN: '알 수 없는 오류가 발생했습니다.'
    },
    SUCCESS: {
      SUBMIT: '성공적으로 제출되었습니다.'
    },
    error: '오류가 발생했습니다. 다시 시도해주세요.',
    success: '성공적으로 처리되었습니다.'
  },

  // 환경설정 관련 상수 (config.js 병합)
  CONFIG: {
    API_BASE_URL: 'https://api.example.com',
    DEBUG_MODE: true
  },
};




// 기본 내보내기
export default CONSTANTS; 