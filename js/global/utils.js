// 자주 사용하는 함수들 (ex. 날짜 포맷, 숫자 포맷 등)

// 공통 유틸 함수 모음

/**
 * 현재 날짜를 YYYY-MM-DD 형식으로 반환
 */
export function formatDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

/**
 * 숫자에 콤마 추가
 */
export function addComma(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 디바운스 함수
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 쿼리 파라미터를 객체로 변환
 */
export function getQueryParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const queries = queryString.split('&');

  queries.forEach(query => {
    const [key, value] = query.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });

  return params;
} 