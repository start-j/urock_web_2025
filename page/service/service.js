
// FAB 버튼 스크롤 동작
document.addEventListener('DOMContentLoaded', function() {
  const fabBtn = document.querySelector('.fab-btn');
  
  // 스크롤 위치에 따라 버튼 표시/숨김
  window.addEventListener('scroll', function() {
    // 사용자가 상단에서 300px 이상 스크롤하면 버튼 표시
    if (window.scrollY > 300) {
      fabBtn.style.display = 'block';
    } else {
      fabBtn.style.display = 'none';
    }
  });
  
  // 버튼 클릭 시 최상단으로 스크롤
  fabBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드러운 스크롤 애니메이션
    });
  });
});


