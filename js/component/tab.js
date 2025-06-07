/**
 * 탭 컴포넌트 생성 함수
 * 주어진 ID의 컨테이너에 탭 컴포넌트를 생성합니다.
 * @param {string} containerId - 탭을 생성할 컨테이너의 ID
 * @param {object} config - 탭 구성 설정 (옵션)
 */
export { createTabComponent };

function createTabComponent(containerId, config) {
  if (!config || !Array.isArray(config.mainTabs)) {
    console.error('[Tab] createTabComponent에 유효하지 않은 config가 전달됨:', config);
    return;
  }
  
  // 컨테이너 요소 가져오기
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Element with ID "${containerId}" not found.`);
    return;
  }
  
  // 중복 초기화 방지
  if (container.dataset.tabInitialized === 'true') {
    console.log(`[Tab] ${containerId}는 이미 초기화됨, 건너뛰기`);
    return;
  }
  container.dataset.tabInitialized = 'true';

  // 기본 설정 사용 (config가 없을 경우)
  config = config || (typeof solutionTabConfig !== 'undefined' ? solutionTabConfig : {
    mainTabs: [
      { id: 'dfas', text: 'DFAS', isActive: true },
      { id: 'mcq', text: 'MCQ', isActive: false },
      { id: 'gm', text: 'Gate Manager', isActive: false }
    ],
    subTabs: {
      'dfas': [
        { id: 'dfas-pro', text: 'DFAS Pro', isActive: true },
        { id: 'dfas-enterprise', text: 'DFAS Enterprise', isActive: false }
      ],
      'mcq': [
        { id: 'mcq-p', text: 'M-SecuManager P', isActive: true },
        { id: 'mcq-s', text: 'M-SecuManager S', isActive: false },
        { id: 'mcq-g', text: 'M-SecuManager G', isActive: false }
      ],
      'gm': [
        { id: 'gm-basic', text: 'Gate Manager', isActive: true },
        { id: 'gm-pro', text: 'Gate Manager Pro', isActive: false }
      ]
    }
  });

  // 초기 상태 설정
  let activeMainTab = config.mainTabs.find(tab => tab.isActive).id;
  let activeSubTab = '';

  if (config.subTabs && config.subTabs[activeMainTab] && config.subTabs[activeMainTab].length > 0) {
    const activeSubTabObject = config.subTabs[activeMainTab].find(tab => tab.isActive);
    if (activeSubTabObject) {
      activeSubTab = activeSubTabObject.id;
    } else {
      // isActive가 true인 서브탭이 없으면 첫 번째 서브탭을 기본값으로 설정
      activeSubTab = config.subTabs[activeMainTab][0].id;
      console.log(`[Tab] ${activeMainTab} 탭의 기본 서브탭으로 ${activeSubTab} 설정`);
    }
  }

  // DOM 요소 캐시
  let tabContentElement, selectedTabContent, mainTabs, subTabs, subTabLinks;

  // HTML 생성 함수들
  function generateMainTabsHTML() {
    return config.mainTabs.map(tab => `
      <a href="javascript:void(0)" class="tab-${tab.id}${tab.isActive ? ' active' : ''}" data-tab="${tab.id}">
        <div class="tab-text">${tab.text}</div>
      </a>
    `).join('');
  }

  function generateSubTabsHTML() {
    if (!config.subTabs) return '';

    return Object.keys(config.subTabs).map(mainTabId => {
      const subTabs = config.subTabs[mainTabId];
      if (!subTabs || subTabs.length === 0) return '';

      const subTabItems = subTabs.map(subTab => `
        <div class="tab-menu">
          <a href="javascript:void(0)" class="txt-${subTab.id}${subTab.isActive ? ' active' : ''}" data-subtab="${subTab.id}">
            <div class="tab-text">${subTab.text}</div>
          </a>
        </div>
      `).join('');

      return `
        <div class="tab-sub" id="${mainTabId}-sub" data-parent="${mainTabId}" ${mainTabId === activeMainTab ? '' : 'style="display:none;"'}>
          <div class="tab-text-group">
            ${subTabItems}
          </div>
          <div class="focus-bar"></div>
        </div>
      `;
    }).join('');
  }

  // 전체 탭 HTML 생성 및 삽입
  function initializeTabHTML() {
    const tabHTML = `
      <section class="tab">
        <div class="tab-main">
          ${generateMainTabsHTML()}
        </div>
        ${generateSubTabsHTML()}
        <div class="tab-content">
          <div id="selected-tab-content">
            <!-- 컨텐츠 영역 -->
          </div>
        </div>
      </section>
    `;

    container.innerHTML = tabHTML;

    // DOM 요소 캐시 업데이트
    updateDOMCache();
  }

  // DOM 요소 캐시 업데이트
  function updateDOMCache() {
    tabContentElement = container.querySelector('.tab-content');
    selectedTabContent = container.querySelector('#selected-tab-content');
    mainTabs = container.querySelectorAll('.tab-main a');
    subTabs = container.querySelectorAll('.tab-sub');
    subTabLinks = container.querySelectorAll('.tab-menu a');
  }

  // 높이 조정 함수 (개선된 유동적 높이)
  function adjustTabContentHeight() {
    if (!tabContentElement || !selectedTabContent) return;

    // CSS에서 자동으로 높이가 조정되도록 스타일 초기화
    tabContentElement.style.height = 'auto';
    selectedTabContent.style.height = 'auto';

    // 최소 높이 설정 (반응형)
    const minHeight = window.innerWidth <= 480 ? 120 : window.innerWidth <= 768 ? 150 : 200;

    // 실제 컨텐츠 높이 측정
    const contentHeight = selectedTabContent.scrollHeight;
    const paddingHeight = 60; // 상하 패딩

    // 최종 높이 계산 (최소 높이와 실제 컨텐츠 높이 중 큰 값)
    const finalHeight = Math.max(contentHeight + paddingHeight, minHeight);

    // 컨텐츠가 최소 높이보다 클 때만 명시적으로 높이 설정
    if (contentHeight + paddingHeight > minHeight) {
      tabContentElement.style.minHeight = finalHeight + 'px';
    } else {
      tabContentElement.style.minHeight = minHeight + 'px';
    }

    console.log(`[Tab] 컨텐츠 높이 조정: ${finalHeight}px (실제 컨텐츠: ${contentHeight}px, 최소: ${minHeight}px)`);
  }

  // ResizeObserver 설정 (개선된 버전)
  function setupResizeObserver() {
    if (!selectedTabContent || !window.ResizeObserver) return;

    // 기존 observer가 있다면 정리
    if (container._resizeObserver) {
      container._resizeObserver.disconnect();
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // 디바운싱을 위한 타이머
        clearTimeout(container._resizeTimer);
        container._resizeTimer = setTimeout(() => {
          adjustTabContentHeight();
        }, 100);
      }
    });

    // 컨텐츠 영역과 이미지들을 관찰
    resizeObserver.observe(selectedTabContent);

    // 이미지 로드 완료 시에도 높이 재조정
    const images = selectedTabContent.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        setTimeout(adjustTabContentHeight, 50);
      } else {
        img.addEventListener('load', () => {
          setTimeout(adjustTabContentHeight, 50);
        });
        img.addEventListener('error', () => {
          setTimeout(adjustTabContentHeight, 50);
        });
      }
    });

    container._resizeObserver = resizeObserver;
  }

  // 컨텐츠 경로 매핑
  function getContentPath() {
    console.log(`[Tab] 경로 매핑 시도: activeMainTab=${activeMainTab}, activeSubTab=${activeSubTab}`);
    
    // 각 메인 탭별 경로 매핑
    let contentPath = '';
    
    switch (activeMainTab) {
      case 'dfas':
        contentPath = activeSubTab === 'dfas-enterprise'
          ? '/html/detail/detail-solution-02-dfas-ent.html'
          : '/html/detail/detail-solution-01-dfas-pro.html';
        break;
        
      case 'mcq':
        const mcqPaths = {
          'mcq-p': '/html/detail/detail-solution-03-mcq-p.html',
          'mcq-s': '/html/detail/detail-solution-04-mcq-s.html',
          'mcq-g': '/html/detail/detail-solution-05-mcq-g.html'
        };
        contentPath = mcqPaths[activeSubTab] || mcqPaths['mcq-p']; // 기본값: mcq-p
        break;
        
      case 'gm':
        contentPath = activeSubTab === 'gm-pro'
          ? '/html/detail/detail-solution-07-gm-pro.html'
          : '/html/detail/detail-solution-06-gm.html';
        break;
        
      case 'analysis':
        contentPath = '/html/detail/detail-service-01-analysis.html';
        break;
        
      case 'authentication':
        contentPath = '/html/detail/detail-service-02-authentication.html';
        break;
        
      case 'education':
        contentPath = '/html/detail/detail-service-03-education.html';
        break;
        
      case 'inquiry':
        contentPath = '/html/detail/detail-support-01-inquiry.html';
        break;
        
      case 'news':
        contentPath = '/html/detail/detail-support-02-news.html';
        break;
        
      default:
        console.warn(`[Tab] 알 수 없는 메인 탭: ${activeMainTab}`);
        contentPath = '';
    }
    
    console.log(`[Tab] 매핑된 경로: ${contentPath}`);
    return contentPath;
  }

  // 컨텐츠 업데이트 함수
  function updateContent() {
    const mainTabText = container.querySelector(`.tab-main a[data-tab="${activeMainTab}"]`).querySelector('.tab-text').textContent;

    // 로딩 표시
    selectedTabContent.innerHTML = '<div class="loading">컨텐츠 로딩 중...</div>';
    adjustTabContentHeight();

    const contentPath = getContentPath();

    if (!contentPath) {
      selectedTabContent.innerHTML = `
        <div class="tab-content-body">
          <p>선택한 탭에 해당하는 컨텐츠를 찾을 수 없습니다.</p>
        </div>
      `;
      adjustTabContentHeight();
      return;
    }

    // 컨텐츠 로드
    fetch(contentPath)
      .then(response => {
        if (!response.ok) throw new Error('페이지를 불러올 수 없습니다');
        return response.text();
      })
      .then(html => {
        if (!html.trim()) {
          selectedTabContent.innerHTML = `
            <div class="tab-content-body">
              <p>컨텐츠를 준비 중입니다.</p>
            </div>
          `;
        } else {
          selectedTabContent.innerHTML = `
            <div class="tab-content-container">
              ${html}
            </div>
          `;

          // 이미지 경로 수정
          selectedTabContent.querySelectorAll('img').forEach(img => {
            const originalSrc = img.getAttribute('src');
            if (originalSrc && (originalSrc.startsWith('./') || originalSrc.startsWith('../'))) {
              const basePath = contentPath.substring(0, contentPath.lastIndexOf('/') + 1);
              img.src = new URL(originalSrc, window.location.origin + basePath).href;
            }
          });
        }

        // 높이 조정 및 ResizeObserver 설정 (다단계 조정)
        requestAnimationFrame(() => {
          adjustTabContentHeight();
          setupResizeObserver();

          // 추가 조정 (이미지나 동적 컨텐츠를 위해)
          setTimeout(() => {
            adjustTabContentHeight();
          }, 200);

          // 최종 조정 (모든 리소스 로드 완료 후)
          setTimeout(() => {
            adjustTabContentHeight();
          }, 500);
        });

        console.log(`[Tab] ${contentPath} 컨텐츠 로드 완료`);
      })
      .catch(error => {
        console.error(`[Tab] 컨텐츠 로드 실패: ${error.message}`);
        selectedTabContent.innerHTML = `
          <div class="tab-content-body">
            <p>컨텐츠를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        `;
        setTimeout(adjustTabContentHeight, 100);
      });
  }

  // 이벤트 리스너 설정
  function setupEventListeners() {
    // 메인 탭 클릭 이벤트
    mainTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();

        // 탭 활성화 상태 업데이트
        mainTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeMainTab = tab.getAttribute('data-tab');

        // 서브 탭 표시/숨김
        subTabs.forEach(subTab => subTab.style.display = 'none');

        const activeSubTabGroup = container.querySelector(`#${activeMainTab}-sub`);
        if (activeSubTabGroup) {
          activeSubTabGroup.style.display = 'block';
          let activeSubTabLink = activeSubTabGroup.querySelector('.tab-menu a.active');
          
          if (activeSubTabLink) {
            activeSubTab = activeSubTabLink.getAttribute('data-subtab');
          } else {
            // 활성화된 서브탭이 없으면 첫 번째 서브탭을 활성화
            const firstSubTabLink = activeSubTabGroup.querySelector('.tab-menu a');
            if (firstSubTabLink) {
              firstSubTabLink.classList.add('active');
              activeSubTab = firstSubTabLink.getAttribute('data-subtab');
              console.log(`[Tab] ${activeMainTab} 탭의 첫 번째 서브탭 자동 활성화: ${activeSubTab}`);
            }
          }
        } else {
          activeSubTab = '';
        }

        updateContent();
      });
    });

    // 서브 탭 클릭 이벤트
    subTabLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        const currentSubTab = link.closest('.tab-sub');
        const groupLinks = currentSubTab.querySelectorAll('.tab-menu a');

        groupLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        activeSubTab = link.getAttribute('data-subtab');

        updateContent();
      });
    });

    // 윈도우 리사이즈 이벤트 (디바운싱 적용)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        adjustTabContentHeight();
      }, 150);
    });
  }

  console.log('createTabComponent is defined:', typeof createTabComponent);



  // 초기화
  initializeTabHTML();
  setupEventListeners();
  updateContent();
}
// 전역 탭 초기화 함수
window.createTabComponent = createTabComponent;

// 탭 재초기화 함수
window.reInitTabComponent = function(containerId = 'tab-container', config = null) {
  const container = document.getElementById(containerId);
  if (container) {
    // 초기화 플래그 리셋
    container.dataset.tabInitialized = 'false';
    createTabComponent(containerId, config || window.solutionTabConfig);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('tab-container')) {
    const config = window.solutionTabConfig || window.supportTabConfig;
    if (config) {
      createTabComponent('tab-container', config);
    }
  }
});
