// card
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const cardObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 뷰포트에 들어올 때
      entry.target.classList.add('show');
    } else {
      // 뷰포트에서 나갈 때
      entry.target.classList.remove('show');
    }
  });
}, observerOptions);

// 모든 카드에 observer 적용
document.addEventListener('DOMContentLoaded', () => {
	// card
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => cardObserver.observe(card));
	// text-show
	const textShows = document.querySelectorAll('.txt-show');
	textShows.forEach(textShow => cardObserver.observe(textShow));
});



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


