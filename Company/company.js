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
});
