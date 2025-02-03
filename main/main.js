let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');

nextDom.onclick = function(){
	showSlider('next');
}
prevDom.onclick = function(){
	showSlider('prev');
}
let timeRunning = 3000;
let timeAutoNext = 6000;
let runTimeOut;
let runAutoRun = setTimeout(()=>{
	nextDom.click();
}, timeAutoNext);

function showSlider(type){
	let itemSlider = document.querySelectorAll('.carousel .list .item');
	let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');
	
	// 현재 활성 아이템 찾기
	let currentActive = document.querySelector('.carousel .list .item.active');
	if(currentActive) {
		currentActive.classList.remove('active');
	}
	
	// 모든 썸네일의 활성화 상태 제거
	itemThumbnail.forEach(item => {
		item.classList.remove('active');
	});
	
	if(type === 'next'){
		setTimeout(() => {
			// 첫 번째 아이템들을 마지막으로 이동
			listItemDom.appendChild(itemSlider[0]);
			thumbnailDom.appendChild(itemThumbnail[0]);

			// 새로운 첫 번째 아이템들 활성화
			itemSlider[0].classList.add('active');
			itemThumbnail[0].classList.add('active');
		}, 800);
	}else{
		let positionLastItem = itemSlider.length - 1;
		setTimeout(() => {
			// 마지막 아이템들을 첫 번째로 이동
			listItemDom.prepend(itemSlider[positionLastItem]);
			thumbnailDom.prepend(itemThumbnail[positionLastItem]);
			itemSlider[0].classList.add('active');
			itemThumbnail[0].classList.add('active');
		}, 800);
	}

	// 페이지 로드 시 첫 번째 아이템 활성화
	if(!document.querySelector('.carousel .list .item.active')) {
		itemSlider[0].classList.add('active');
	}

	clearTimeout(runAutoRun);
	runAutoRun = setTimeout(() => {
		nextDom.click();
	}, timeAutoNext);
}

// 페이지 로드 시 첫 번째 아이템 활성화
window.onload = function() {
	document.querySelector('.carousel .list .item').classList.add('active');
}



// const observerOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.1
// };

// const cardObserver = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       // 뷰포트에 들어올 때
//       entry.target.classList.add('show');
//     } else {
//       // 뷰포트에서 나갈 때
//       entry.target.classList.remove('show');
//     }
//   });
// }, observerOptions);

// // 모든 카드에 observer 적용
// document.addEventListener('DOMContentLoaded', () => {
//   const cards = document.querySelectorAll('.card');
//   cards.forEach(card => cardObserver.observe(card));
// });

// 썸네일 클릭 이벤트 처리
document.addEventListener('DOMContentLoaded', function() {
  const thumbnailItems = document.querySelectorAll('.thumbnail .item');
  
  thumbnailItems.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      // 현재 활성화된 아이템 찾기
      const currentActive = document.querySelector('.carousel .list .item.active');
      if(currentActive) {
        currentActive.classList.remove('active');
      }

      // 모든 썸네일의 활성화 상태 제거
      thumbnailItems.forEach(item => {
        item.classList.remove('active');
      });

      // 클릭된 썸네일과 해당 캐러셀 아이템 활성화
      thumbnail.classList.add('active');
      
      // 캐러셀 아이템 순서 재정렬
      const list = document.querySelector('.carousel .list');
      const thumbnail_list = document.querySelector('.carousel .thumbnail');
      
      // 현재 순서 저장
      const items = Array.from(list.children);
      const thumbnails = Array.from(thumbnail_list.children);
      
      // 클릭한 썸네일의 인덱스 찾기
      const clickedIndex = thumbnails.indexOf(thumbnail);
      
      // 첫 번째 아이템을 마지막으로 이동
      const firstItem = items[0];
      const firstThumbnail = thumbnails[0];
      list.appendChild(firstItem);
      thumbnail_list.appendChild(firstThumbnail);
      
      // 클릭한 아이템을 첫 번째로 이동
      const selectedItem = items[clickedIndex];
      const selectedThumbnail = thumbnails[clickedIndex];
      list.insertBefore(selectedItem, list.firstChild);
      thumbnail_list.insertBefore(selectedThumbnail, thumbnail_list.firstChild);
      
      // 활성화 클래스 추가
      setTimeout(() => {
        selectedItem.classList.add('active');
      }, 100);

      // 자동 슬라이드 타이머 재설정
      clearTimeout(runAutoRun);
      runAutoRun = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    });
  });
});

// CSS에 썸네일 활성화 스타일 추가

// 썸네일 클릭 이벤트 추가
document.querySelectorAll('.thumbnail-list .item').forEach((thumb, index) => {
  thumb.addEventListener('click', function() {
    // 현재 활성화된 썸네일 찾기
    const currentThumb = document.querySelector('.thumbnail-list .item.active');
    if (currentThumb) currentThumb.classList.remove('active');
    
    // 클릭한 썸네일 활성화
    this.classList.add('active');
    
    // 현재 활성화된 캐러셀 아이템 비활성화
    const currentActiveItem = document.querySelector('.hero .list .item.active');
    if (currentActiveItem) {
      currentActiveItem.classList.remove('active');
    }
    
    // nth-child로 매칭되는 캐러셀 아이템 찾아서 활성화
    const targetItem = document.querySelector(`.hero .list .item:nth-child(${index + 1})`);
    if (targetItem) {
      targetItem.classList.add('active');
    }
  });
});

