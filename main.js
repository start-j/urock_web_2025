let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');

let timeAutoNext = 5000;  // 5초 간격으로 자동 슬라이드
let runAutoRun = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type) {
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');
    
    // 현재 활성 아이템과 썸네일 찾기
    let currentActive = document.querySelector('.carousel .list .item.active');
    let currentThumbnail = document.querySelector('.carousel .thumbnail .item.active');
    let currentIndex = Array.from(itemThumbnail).indexOf(currentThumbnail);
    
    if(currentActive && currentThumbnail) {
        currentActive.classList.remove('active');
        currentThumbnail.classList.remove('active');
    }
    
    // 다음/이전 인덱스 계산
    let nextIndex = type === 'next' 
        ? (currentIndex + 1) % itemThumbnail.length 
        : (currentIndex - 1 + itemThumbnail.length) % itemThumbnail.length;

    // 캐러셀 아이템 이동 (즉시 실행)
    if(type === 'next') {
        listItemDom.appendChild(itemSlider[0]);
    } else {
        listItemDom.prepend(itemSlider[itemSlider.length - 1]);
    }

    // 새로운 아이템과 썸네일 활성화
    const newActiveItem = document.querySelector('.carousel .list .item:first-child');
    newActiveItem.classList.add('active');
    itemThumbnail[nextIndex].classList.add('active');
    
    // 자동 슬라이드 타이머 재설정
    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);
}

// 버튼 클릭 이벤트 (즉시 실행)
nextDom.onclick = function() {
    showSlider('next');
}
prevDom.onclick = function() {
    showSlider('prev');
}

// 썸네일 클릭 이벤트 처리
document.addEventListener('DOMContentLoaded', function() {
    const thumbnailItems = document.querySelectorAll('.thumbnail .item');
    
    thumbnailItems.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            // 현재 활성화된 아이템과 썸네일 찾기
            const currentActive = document.querySelector('.carousel .list .item.active');
            const currentThumbnail = document.querySelector('.thumbnail .item.active');
            const currentIndex = Array.from(thumbnailItems).indexOf(currentThumbnail);
            
            if(currentActive && currentThumbnail) {
                currentActive.classList.remove('active');
                currentThumbnail.classList.remove('active');
            }
            
            // 클릭한 썸네일 활성화
            thumbnail.classList.add('active');
            
            // 해당하는 캐러셀 아이템으로 이동
            const items = document.querySelectorAll('.carousel .list .item');
            const targetIndex = index;
            const currentItemIndex = Array.from(items).findIndex(item => item.classList.contains('active'));
            
            // 현재 아이템과 타겟 아이템의 위치 차이만큼 이동
            if(currentItemIndex !== targetIndex) {
                const diff = targetIndex - currentItemIndex;
                const direction = diff > 0 ? 'next' : 'prev';
                const moves = Math.abs(diff);
                
                for(let i = 0; i < moves; i++) {
                    showSlider(direction);
                }
            }
            
            // 자동 슬라이드 타이머 재설정
            clearTimeout(runAutoRun);
            runAutoRun = setTimeout(() => {
                nextDom.click();
            }, timeAutoNext);
        });
    });
});

// 페이지 로드 시 첫 번째 아이템과 썸네일 활성화
window.onload = function() {
    document.querySelector('.carousel .list .item').classList.add('active');
    document.querySelector('.thumbnail .item').classList.add('active');
}
