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

    // 페이지 특정 초기화 이벤트 발생
    document.dispatchEvent(new CustomEvent('pageReady'));
  });
});

// 초기화 완료 로그
console.log('[ComponentManager] 초기화 완료, 컴포넌트 로드 이벤트 대기 중'); 