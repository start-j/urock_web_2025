<<<<<<< HEAD
// card
=======


>>>>>>> 08db9efe9ea409186561e5b82d0036ba5903decc
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
<<<<<<< HEAD
});

// sticky
// const header = document.querySelector('header');
// const headerHeight = header.offsetHeight;

// window.addEventListener('scroll', () => {
//   if (window.scrollY > headerHeight) {
//     header.classList.add('fixed');
//   } else {
//     header.classList.remove('fixed');
//   }
// });


// //header__focusbar
// document.addEventListener("DOMContentLoaded", function () {
//   // menu__items 클래스를 가진 ul 안의 li 요소들 선택
//   const menuItems = document.querySelectorAll(".gnb .menu li");
//   const gnbFocusbar = document.querySelector(".gnb .focusbar");



//   // 초기 위치 설정
//   if (menuItems.length > 0 && gnbFocusbar) {
//     positionLineUnderItem(menuItems[0]);
//   }

//   menuItems.forEach((item) => {
//     item.addEventListener("click", function () {
//       positionLineUnderItem(this);
//     });
//   });

//   function positionLineUnderItem(item) {
//     const itemRect = item.getBoundingClientRect();
//     const menuContainer = item.closest(".menu");
//     const containerRect = menuContainer.getBoundingClientRect();

//     const leftPosition =
//       itemRect.left -
//       containerRect.left +
//       (itemRect.width - gnbFocusbar.offsetWidth) / 2;

//     gnbFocusbar.style.left = `${leftPosition}px`;
//   }
// });


=======
});
>>>>>>> 08db9efe9ea409186561e5b82d0036ba5903decc
