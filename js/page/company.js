// intro 데이터 정의 (title, desc는 HTML에서 data-*로, breadcrumb만 JS에서 설정)
window.introData = {
	breadcrumb: ["홈", "서비스", "M-SecuManager S"]
};

// Google Maps 관련 인터랙션
const location = document.querySelector('.location-group');
const mapArea = document.querySelector('.map-area iframe');

// 요소가 존재하는지 확인
if (location && mapArea) {
	// 맵 영역 마우스 이벤트
	mapArea.addEventListener('mousedown', () => {
		location.style.opacity = '0';
	});

	// 페이지 로드/새로고침 시 location-group 활성화
	window.addEventListener('load', () => {
		location.style.opacity = '1';
	});
}

// txt-show: 뷰포트 진입/이탈 시 show 클래스 토글
const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.1
};

const txtShowObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
		} else {
			entry.target.classList.remove('show');
		}
	});
}, observerOptions);

// txt-show observer 적용
const textShows = document.querySelectorAll('.txt-show');
textShows.forEach(textShow => txtShowObserver.observe(textShow));

// FAB 버튼 스크롤 동작
document.addEventListener('DOMContentLoaded', function () {
	const fabBtn = document.querySelector('.fab-btn');

	// 요소가 존재하는지 확인
	if (fabBtn) {
		// 스크롤 위치에 따라 버튼 표시/숨김
		window.addEventListener('scroll', function () {
			// 사용자가 상단에서 300px 이상 스크롤하면 버튼 표시
			if (window.scrollY > 300) {
				fabBtn.style.display = 'block';
			} else {
				fabBtn.style.display = 'none';
			}
		});

		// 버튼 클릭 시 최상단으로 스크롤
		fabBtn.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth' // 부드러운 스크롤 애니메이션
			});
		});
	}
});


