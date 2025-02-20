// client 로고 무한 슬라이드
document.addEventListener('DOMContentLoaded', () => {
	const wrapper = document.querySelector('.client-logo-wrapper');
	const originalLogo = document.querySelector('.client-logo-icon');
	
	// 이미지 복제
	const cloneLogo = originalLogo.cloneNode(true);
	cloneLogo.classList.add('clone');
	wrapper.appendChild(cloneLogo);
	
	// 애니메이션 끝나면 위치 리셋
	function resetPosition() {
			if (parseInt(getComputedStyle(originalLogo).left) <= -3100) {
					originalLogo.style.left = '0px';
					cloneLogo.style.left = '3100px';
			}
	}
	
	// 주기적으로 위치 체크
	setInterval(resetPosition, 50);
	
	// Google Maps 관련 인터랙션
	const location = document.querySelector('.location-group');
	const mapArea = document.querySelector('.map-area iframe');
	
	// 맵 영역 마우스 이벤트
	mapArea.addEventListener('mousedown', () => {
			location.style.opacity = '0';
	});

	// 페이지 로드/새로고침 시 location-group 활성화
	window.addEventListener('load', () => {
			location.style.opacity = '1';
	});
});
