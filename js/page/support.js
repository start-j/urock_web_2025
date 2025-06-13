/**
 * Support 페이지 보조 스크립트
 * tab.js와 함께 작동하여 support-02-news 페이지의 서브 탭 기능을 지원
 */

console.log('[Support] Support 페이지 스크립트 로드됨');

// Support 페이지 전용 설정
document.addEventListener('DOMContentLoaded', function () {
  console.log('[Support] DOMContentLoaded - Support 페이지 초기화');

  // tab.js가 로드되기를 기다림
  const waitForTabSystem = () => {
    if (typeof window.createTabComponent === 'function') {
      console.log('[Support] Tab 시스템 감지됨, Support 설정 적용');
      initializeSupportTabs();
    } else {
      console.log('[Support] Tab 시스템 대기 중...');
      setTimeout(waitForTabSystem, 100);
    }
  };

  waitForTabSystem();
});

function initializeSupportTabs() {
  const currentPath = window.location.pathname;

  if (currentPath.includes('support-02-news')) {
    console.log('[Support] News 페이지 감지, 서브 탭 설정 적용');

    // Support-02-News 전용 설정
    const supportNewsConfig = {
      mainTabs: [
        { id: 'inquiry', text: '문의하기', isActive: false },
        { id: 'news', text: '유락소식', isActive: true }
      ],
      subTabs: {
        news: [
          { id: 'news', text: 'UROCK소식', isActive: true },
          { id: 'business', text: '사업', isActive: false },
          { id: 'education', text: '교육', isActive: false },
          { id: 'exhibition', text: '전시회', isActive: false },
          { id: 'notice', text: '공지사항', isActive: false }
        ]
      }
    };

    // 전역 설정 업데이트
    window.supportTabConfig = supportNewsConfig;

    // 탭 컨테이너가 로드되기를 기다림
    const waitForContainer = () => {
      const tabContainer = document.getElementById('tab-container');
      if (tabContainer && tabContainer.innerHTML.trim() !== '') {
        console.log('[Support] Tab 컨테이너 로드됨, 재초기화');

        // 기존 초기화 상태 리셋
        tabContainer.dataset.tabInitialized = 'false';

        // 재초기화
        if (typeof window.reInitTabComponent === 'function') {
          window.reInitTabComponent('tab-container', supportNewsConfig);
        } else {
          window.createTabComponent('tab-container', supportNewsConfig);
        }
      } else {
        setTimeout(waitForContainer, 200);
      }
    };

    waitForContainer();
  }
}

// 탭 컨텐츠 로드 완료 이벤트 리스너
document.addEventListener('tabContentLoaded', function (event) {
  console.log('[Support] 탭 컨텐츠 로드 완료:', event.detail);

  // 추가적인 Support 페이지 전용 처리가 필요한 경우 여기에 추가
});

console.log('[Support] Support 스크립트 초기화 완료'); 