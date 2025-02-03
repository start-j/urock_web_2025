

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