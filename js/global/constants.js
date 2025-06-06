// 전역 상수 정의
export const CONSTANTS = {
  // API 관련 상수
  API: {
    BASE_URL: '',
    TIMEOUT: 5000
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

  // 메시지 관련 상수
  MESSAGES: {
    ERROR: {
      NETWORK: '네트워크 오류가 발생했습니다.',
      UNKNOWN: '알 수 없는 오류가 발생했습니다.'
    },
    SUCCESS: {
      SUBMIT: '성공적으로 제출되었습니다.'
    }
  }
};

// 기본 내보내기
export default CONSTANTS; 