// 메인 페이지에서만 실행되도록 조건 추가
if (window.location.pathname === '/' || window.location.pathname.includes('index.html') || window.location.pathname === '/urock_homepage_bucket/') {
    let nextDom = document.getElementById('next');
    let prevDom = document.getElementById('prev');
    let carouselDom = document.querySelector('.carousel');
    let listItemDom = document.querySelector('.carousel .list');
    let thumbnailDom = document.querySelector('.thumbnail');

    // 필요한 요소들이 존재하는지 확인
    if (nextDom && prevDom && carouselDom && listItemDom && thumbnailDom) {
        let timeAutoNext = 5000;  // 5초 간격으로 자동 슬라이드
        let runAutoRun = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);

        function showSlider(type) {
            let itemSlider = document.querySelectorAll('.carousel .list .item');
            let itemThumbnail = document.querySelectorAll('.thumbnail .item');

            // 현재 활성 아이템과 썸네일 찾기
            let currentActive = document.querySelector('.carousel .list .item.active');
            let currentThumbnail = document.querySelector('.thumbnail .item.active');
            let currentIndex = Array.from(itemThumbnail).indexOf(currentThumbnail);

            if (currentActive && currentThumbnail) {
                currentActive.classList.remove('active');
                currentThumbnail.classList.remove('active');
            }

            // 다음/이전 인덱스 계산
            let nextIndex = type === 'next'
                ? (currentIndex + 1) % itemThumbnail.length
                : (currentIndex - 1 + itemThumbnail.length) % itemThumbnail.length;

            // 캐러셀 아이템 이동
            if (type === 'next') {
                listItemDom.appendChild(itemSlider[0]);
            } else {
                listItemDom.prepend(itemSlider[itemSlider.length - 1]);
            }

            // 새로운 아이템과 썸네일 활성화
            const newActiveItem = document.querySelector('.carousel .list .item:first-child');
            if (newActiveItem) {
                newActiveItem.classList.add('active');
            }
            if (itemThumbnail[nextIndex]) {
                itemThumbnail[nextIndex].classList.add('active');
            }

            // 자동 슬라이드 타이머 재설정
            clearTimeout(runAutoRun);
            runAutoRun = setTimeout(() => {
                nextDom.click();
            }, timeAutoNext);
        }

        // 버튼 클릭 이벤트
        nextDom.onclick = function () {
            showSlider('next');
        }
        prevDom.onclick = function () {
            showSlider('prev');
        }

        // 썸네일 클릭 이벤트 처리
        function initThumbnailEvents() {
            const thumbnailItems = document.querySelectorAll('.thumbnail .item');

            thumbnailItems.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', () => {
                    // 현재 활성화된 아이템과 썸네일 찾기
                    const currentActive = document.querySelector('.carousel .list .item.active');
                    const currentThumbnail = document.querySelector('.thumbnail .item.active');

                    if (currentActive) {
                        currentActive.classList.remove('active');
                    }
                    if (currentThumbnail) {
                        currentThumbnail.classList.remove('active');
                    }

                    // 클릭한 썸네일 활성화
                    thumbnail.classList.add('active');

                    // 해당하는 캐러셀 아이템 활성화
                    const items = document.querySelectorAll('.carousel .list .item');
                    if (items[index]) {
                        items[index].classList.add('active');
                    }

                    // 자동 슬라이드 타이머 재설정
                    clearTimeout(runAutoRun);
                    runAutoRun = setTimeout(() => {
                        nextDom.click();
                    }, timeAutoNext);
                });
            });
        }

        // 페이지 로드 시 초기화
        function initCarousel() {
            const firstItem = document.querySelector('.carousel .list .item');
            const firstThumbnail = document.querySelector('.thumbnail .item');

            // 모든 활성 클래스 제거
            document.querySelectorAll('.carousel .list .item.active').forEach(item => {
                item.classList.remove('active');
            });
            document.querySelectorAll('.thumbnail .item.active').forEach(item => {
                item.classList.remove('active');
            });

            // 첫 번째 아이템과 썸네일 활성화
            if (firstItem) {
                firstItem.classList.add('active');
            }
            if (firstThumbnail) {
                firstThumbnail.classList.add('active');
            }

            // 썸네일 이벤트 초기화
            initThumbnailEvents();
        }

        // DOM이 완전히 로드된 후 초기화
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCarousel);
        } else {
            initCarousel();
        }

        // 페이지 로드 시에도 초기화 (백업)
        window.addEventListener('load', initCarousel);

    } // 필요한 요소들이 존재하는지 확인하는 if문 닫기
} // 메인 페이지 조건 확인하는 if문 닫기

// No specific JavaScript interference with h6 styles found. Ensure styles are applied via CSS.
