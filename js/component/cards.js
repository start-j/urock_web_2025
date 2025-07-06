// card
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const cardObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // 카드 그룹(.cards) 내에서 순차적으로 show 클래스 추가
      const parentCards = entry.target.closest('.cards');
      if (parentCards) {
        const cards = Array.from(parentCards.querySelectorAll('.card'));
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('show'), 100 + i * 180);
        });
      } else {
        // 단일 카드만 있을 경우 바로 show
        setTimeout(() => entry.target.classList.add('show'), 100);
      }
    } else {
      // 뷰포트에서 완전히 벗어나면 초기화
      entry.target.classList.remove('show');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach(card => {
    cardObserver.observe(card);
  });
});

// .card 요소가 동적으로 추가될 때도 자동으로 observer에 등록
const observeNewCards = (nodes) => {
  nodes.forEach(node => {
    if (node.nodeType !== 1) return;
    // 단일 .card
    if (node.classList.contains('card')) {
      cardObserver.observe(node);
    }
    // 하위에 .card가 있을 경우
    node.querySelectorAll && node.querySelectorAll('.card').forEach(card => {
      cardObserver.observe(card);
    });
  });
};

const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes.length > 0) {
      observeNewCards(Array.from(mutation.addedNodes));
    }
  });
});
mutationObserver.observe(document.body, { childList: true, subtree: true });

