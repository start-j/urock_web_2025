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




