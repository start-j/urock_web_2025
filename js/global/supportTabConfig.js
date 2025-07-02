/**
 * Support 페이지 탭 설정
 */
function createSupportTabConfig() {
  const currentPath = window.location.pathname;
  console.log('[SupportTabConfig] 현재 경로:', currentPath);
  
  // 현재 페이지에 따른 활성 탭 결정
  let activeMainTab = 'inquiry'; // 기본값
  if (currentPath.includes('support-02-news')) {
    activeMainTab = 'news';
  }
  
  console.log('[SupportTabConfig] 활성 메인 탭:', activeMainTab);
  
  const config = {
    mainTabs: [
      { id: 'inquiry', text: '문의하기', isActive: activeMainTab === 'inquiry' },
      { id: 'news', text: '유락소식', isActive: activeMainTab === 'news' }
    ],
    subTabs: {
      // support 페이지는 서브탭이 없음
    }
  };
  
  console.log('[SupportTabConfig] 생성된 설정:', config);
  return config;
}

// 동적으로 설정 생성 및 전역 노출
console.log('[SupportTabConfig] 설정 생성 시작');
window.supportTabConfig = createSupportTabConfig();
console.log('[SupportTabConfig] 전역 설정 등록 완료:', window.supportTabConfig);

// 설정이 제대로 등록되었는지 확인
setTimeout(() => {
  console.log('[SupportTabConfig] 1초 후 전역 설정 확인:', window.supportTabConfig);
}, 1000);

// 디버깅을 위한 테스트 함수만 유지
window.testSupportTab = function() {
  console.log('=== Support Tab 디버깅 정보 ===');
  console.log('1. supportTabConfig 존재:', !!window.supportTabConfig);
  console.log('2. supportTabConfig 내용:', window.supportTabConfig);
  console.log('3. tab-container 존재:', !!document.getElementById('tab-container'));
  console.log('4. createTabComponent 함수 존재:', typeof window.createTabComponent);
  console.log('5. 현재 경로:', window.location.pathname);
  
  const container = document.getElementById('tab-container');
  if (container) {
    console.log('6. 컨테이너 HTML:', container.innerHTML);
    console.log('7. 컨테이너 초기화 상태:', container.dataset.tabInitialized);
  }
  
  // 강제 초기화 시도
  if (window.supportTabConfig && typeof window.createTabComponent === 'function') {
    console.log('8. 강제 초기화 시도...');
    window.createTabComponent('tab-container', window.supportTabConfig);
  }
}; 