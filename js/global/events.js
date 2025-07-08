// 공통 이벤트 핸들러 (ex. window resize, scroll 등)

// 공통 이벤트 리스너 정의 파일

/**
 * 윈도우 리사이즈될 때 콜백 실행
 * @param {Function} callback - 실행할 함수
 */
export function onWindowResize(callback) {
  window.addEventListener("resize", callback);
}
