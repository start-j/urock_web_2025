/**
 * Component Manager - 컴포넌트 관리 시스템
 * 
 * include.js와 함께 작동하여 컴포넌트의 로드 및 초기화를 관리합니다.
 * 각 컴포넌트가 로드될 때 이벤트를 처리하고 적절한 초기화 함수를 호출합니다.
 */

// 컴포넌트 관리자 객체
window.ComponentManager = {
  // 컴포넌트 등록 정보
  registry: {
    // 기존 컴포넌트 등록
    'tab': {
      init: function () {
        if (typeof window.reInitTabComponent === 'function') window.reInitTabComponent();
      }
    },
    'intro': {
      init: function () {
        if (typeof window.initIntroComponent === 'function') window.initIntroComponent();
      }
    },
    'header': {
      init: function () {
        if (typeof window.reInitHeaderComponent === 'function') window.reInitHeaderComponent();
      }
    },
    'footer': {
      init: function () {
        if (typeof window.reInitFooterComponent === 'function') window.reInitFooterComponent();
      }
    },
    'cards': {
      init: function () {
        if (typeof window.reInitCardsComponent === 'function') window.reInitCardsComponent();
      }
    },
    'fab': {
      init: function () {
        if (typeof window.reInitFabComponent === 'function') window.reInitFabComponent();
      }
    },
    // 누락된 컴포넌트 추가
    'breadcrumb': {
      init: function () {
        if (typeof window.reInitBreadcrumbComponent === 'function') window.reInitBreadcrumbComponent();
      }
    },
    'banner': {
      init: function () {
        if (typeof window.reInitBannerComponent === 'function') window.reInitBannerComponent();
      }
    },
    'title': {
      init: function () {
        if (typeof window.reInitTitleComponent === 'function') window.reInitTitleComponent();
      }
    },
    'buttons': {
      init: function () {
        if (typeof window.reInitButtonsComponent === 'function') window.reInitButtonsComponent();
      }
    }
    // 다른 컴포넌트도 필요한 경우 여기에 추가
  },

  // 컴포넌트 등록 메서드
  register: function (name, initFunction) {
    this.registry[name] = { init: initFunction };
    console.log(`[ComponentManager] 컴포넌트 등록: ${name}`);
    return this;
  },

  // 개별 컴포넌트 초기화
  initComponent: function (componentName, element) {
    if (!componentName) {
      console.warn('[ComponentManager] 컴포넌트 이름이 제공되지 않았습니다.');
      return;
    }

    console.log(`[ComponentManager] 컴포넌트 초기화 시도: ${componentName}`);

    // 컴포넌트가 등록되어 있는지 확인
    const component = this.registry[componentName];

    if (component && typeof component.init === 'function') {
      console.log(`[ComponentManager] 컴포넌트 초기화 실행: ${componentName}`);
      try {
        component.init(element);
      } catch (error) {
        console.error(`[ComponentManager] 컴포넌트 초기화 오류 (${componentName}):`, error);
      }
    } else {
      console.warn(`[ComponentManager] 등록되지 않은 컴포넌트: ${componentName}`);
    }
  },

  // 모든 컴포넌트 초기화
  initAll: function () {
    console.log('[ComponentManager] 모든 컴포넌트 초기화 시작');

    for (const [name, component] of Object.entries(this.registry)) {
      if (component && typeof component.init === 'function') {
        try {
          component.init();
          console.log(`[ComponentManager] 컴포넌트 초기화 성공: ${name}`);
        } catch (error) {
          console.error(`[ComponentManager] 컴포넌트 초기화 오류 (${name}):`, error);
        }
      }
    }

    console.log('[ComponentManager] 모든 컴포넌트 초기화 완료');
  }
};

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function () {
  console.log('[ComponentManager] DOMContentLoaded 이벤트 감지');

  // 개별 컴포넌트 로드 이벤트 리스너
  document.addEventListener('componentLoaded', function (event) {
    if (!event.detail) {
      console.warn('[ComponentManager] 이벤트 detail이 없습니다.');
      return;
    }

    const { component, element } = event.detail;
    if (!component) {
      console.warn('[ComponentManager] 컴포넌트 이름이 이벤트에 포함되지 않았습니다.');
      return;
    }

    console.log(`[ComponentManager] 컴포넌트 로드 이벤트 감지: ${component}`);

    // 컴포넌트 초기화
    window.ComponentManager.initComponent(component, element);
  });

  // 모든 컴포넌트 로드 완료 이벤트 리스너
  document.addEventListener('allComponentsLoaded', function () {
    console.log('[ComponentManager] 모든 컴포넌트 로드 완료 이벤트 감지');

    // 헤더 컴포넌트가 있는 경우 강제 초기화
    if (document.querySelector('.mobile-drawer-menu')) {
      console.log('[ComponentManager] 헤더 컴포넌트 강제 초기화 시작');
      setTimeout(() => {
        if (typeof window.reInitHeaderComponent === 'function') {
          window.reInitHeaderComponent();
        }
      }, 100);
    }

    // 탭 컴포넌트가 있는 경우 강제 초기화 (개선된 로직)
    if (document.getElementById('tab-container')) {
      console.log('[ComponentManager] 탭 컴포넌트 강제 초기화 시작');
      
      // 탭 초기화 함수
      const initializeTabs = () => {
        console.log('[ComponentManager] 탭 초기화 실행');
        
        const currentPath = window.location.pathname;
        let config = null;
        
        // 페이지별 설정 생성
        if (currentPath.includes('support')) {
          const activeMainTab = currentPath.includes('support-02-news') ? 'news' : 'inquiry';
          config = {
            mainTabs: [
              { id: 'inquiry', text: '문의하기', isActive: activeMainTab === 'inquiry' },
              { id: 'news', text: '유락소식', isActive: activeMainTab === 'news' }
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
        } else if (currentPath.includes('solution')) {
          let activeMainTab = 'dfas';
          let activeSubTab = 'dfas-pro';
          
          // 현재 페이지에 따라 활성 탭 결정
          if (currentPath.includes('dfas-ent')) {
            activeMainTab = 'dfas';
            activeSubTab = 'dfas-enterprise';
          } else if (currentPath.includes('mcq-p')) {
            activeMainTab = 'mcq';
            activeSubTab = 'mcq-p';
          } else if (currentPath.includes('mcq-s')) {
            activeMainTab = 'mcq';
            activeSubTab = 'mcq-s';
          } else if (currentPath.includes('mcq-g')) {
            activeMainTab = 'mcq';
            activeSubTab = 'mcq-g';
          } else if (currentPath.includes('gm-pro')) {
            activeMainTab = 'gm';
            activeSubTab = 'gm-pro';
          } else if (currentPath.includes('gm')) {
            activeMainTab = 'gm';
            activeSubTab = 'gm';
          }
          
          config = {
            mainTabs: [
              { id: 'dfas', text: 'DFAS', isActive: activeMainTab === 'dfas' },
              { id: 'mcq', text: 'MCQ', isActive: activeMainTab === 'mcq' },
              { id: 'gm', text: 'Gate Manager', isActive: activeMainTab === 'gm' }
            ],
            subTabs: {
              dfas: [
                { id: 'dfas-pro', text: 'DFAS Pro', isActive: activeSubTab === 'dfas-pro' },
                { id: 'dfas-enterprise', text: 'DFAS Enterprise', isActive: activeSubTab === 'dfas-enterprise' }
              ],
              mcq: [
                { id: 'mcq-p', text: 'M-SecuManager P', isActive: activeSubTab === 'mcq-p' },
                { id: 'mcq-s', text: 'M-SecuManager S', isActive: activeSubTab === 'mcq-s' },
                { id: 'mcq-g', text: 'M-SecuManager G', isActive: activeSubTab === 'mcq-g' }
              ],
              gm: [
                { id: 'gm', text: 'Gate Manager', isActive: activeSubTab === 'gm' },
                { id: 'gm-pro', text: 'Gate Manager Pro', isActive: activeSubTab === 'gm-pro' }
              ]
            }
          };
        } else if (currentPath.includes('service')) {
          let activeMainTab = 'analysis';
          if (currentPath.includes('authentication')) activeMainTab = 'authentication';
          else if (currentPath.includes('education')) activeMainTab = 'education';
          
          config = {
            mainTabs: [
              { id: 'analysis', text: '포렌식 분석 서비스', isActive: activeMainTab === 'analysis' },
              { id: 'authentication', text: '국제 표준화 인증', isActive: activeMainTab === 'authentication' },
              { id: 'education', text: '포렌식 교육', isActive: activeMainTab === 'education' }
            ],
            subTabs: {}
          };
        }
        
        // 설정을 전역에 저장
        if (config) {
          if (currentPath.includes('support')) window.supportTabConfig = config;
          else if (currentPath.includes('solution')) window.solutionTabConfig = config;
          else if (currentPath.includes('service')) window.serviceTabConfig = config;
        }
        
        // 탭 컴포넌트 생성
        if (config && typeof window.createTabComponent === 'function') {
          console.log('[ComponentManager] 탭 컴포넌트 생성:', config);
          try {
            window.createTabComponent('tab-container', config);
            console.log('[ComponentManager] 탭 컴포넌트 생성 성공');
            return true;
          } catch (error) {
            console.error('[ComponentManager] 탭 컴포넌트 생성 실패:', error);
            return false;
          }
        } else {
          console.warn('[ComponentManager] 탭 초기화 실패:', {
            config: !!config,
            createTabComponent: typeof window.createTabComponent
          });
          return false;
        }
      };
      
      // 여러 번 시도하여 안정성 확보
      const maxAttempts = 5;
      let attempts = 0;
      
      const tryInitialize = () => {
        attempts++;
        console.log(`[ComponentManager] 탭 초기화 시도 ${attempts}/${maxAttempts}`);
        
        if (initializeTabs()) {
          console.log('[ComponentManager] 탭 초기화 성공');
          return;
        }
        
        if (attempts < maxAttempts) {
          setTimeout(tryInitialize, 200 * attempts); // 점진적으로 지연 시간 증가
        } else {
          console.error('[ComponentManager] 탭 초기화 최대 시도 횟수 초과');
        }
      };
      
      setTimeout(tryInitialize, 100);
    }

    // 페이지 특정 초기화 이벤트 발생
    document.dispatchEvent(new CustomEvent('pageReady'));
  });
});

// 초기화 완료 로그
console.log('[ComponentManager] 초기화 완료, 컴포넌트 로드 이벤트 대기 중'); 