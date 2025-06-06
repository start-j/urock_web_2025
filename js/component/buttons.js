/**
 * 버튼 컴포넌트 스크립트
 */

// 버튼 컴포넌트 초기화
function initButtonComponents() {
  console.log('[Component] 버튼 컴포넌트 초기화');

  // 모든 버튼에 이벤트 리스너 추가
  const buttons = document.querySelectorAll('.btn, .button');

  buttons.forEach(button => {
    // 호버 효과
    button.addEventListener('mouseenter', () => {
      button.classList.add('hover');
    });

    button.addEventListener('mouseleave', () => {
      button.classList.remove('hover');
    });

    // 클릭 효과
    button.addEventListener('mousedown', () => {
      button.classList.add('active');
    });

    button.addEventListener('mouseup', () => {
      button.classList.remove('active');
    });
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initButtonComponents);

// 외부에서 접근 가능하도록 노출
window.initButtonComponents = initButtonComponents; 