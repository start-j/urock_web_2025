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
	
	if(type === 'next'){
		setTimeout(() => {
			listItemDom.appendChild(itemSlider[0]);
			thumbnailDom.appendChild(itemThumbnail[0]);
			itemSlider[0].classList.add('active');
		}, 800);
	}else{
		let positionLastItem = itemSlider.length - 1;
		setTimeout(() => {
			listItemDom.prepend(itemSlider[positionLastItem]);
			thumbnailDom.prepend(itemThumbnail[positionLastItem]);
			itemSlider[0].classList.add('active');
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