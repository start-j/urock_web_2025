/**
 * Support-02-News 페이지 비동기 탭 처리
 */

// 탭과 파일 매핑
const tabMapping = {
  'news': '/html/detail/detail-suppert-news/detail-01-news.html',
  'business': '/html/detail/detail-suppert-news/detail-02-buiness.html',
  'education': '/html/detail/detail-suppert-news/detail-03-education.html',
  'exhibition': '/html/detail/detail-suppert-news/detail-04-exhibition.html',
  'notice': '/html/detail/detail-suppert-news/detail-05-notice.html'
};

// 로딩 상태 표시
function showLoading() {
  const contentArea = document.getElementById('tag-content');
  if (contentArea) {
    contentArea.innerHTML = `
      <div class="loading-container" style="display: flex; justify-content: center; align-items: center; height: 200px;">
        <div class="loading-spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #628cf5; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
  }
}

// 에러 상태 표시
function showError(message = '콘텐츠를 불러오는 중 오류가 발생했습니다.') {
  const contentArea = document.getElementById('tag-content');
  if (contentArea) {
    contentArea.innerHTML = `
      <div class="error-container" style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 200px; color: #ff6b6b;">
        <h4>⚠️ 오류</h4>
        <p>${message}</p>
        <button onclick="loadTabContent('news')" style="margin-top: 10px; padding: 8px 16px; background: #628cf5; color: white; border: none; border-radius: 4px; cursor: pointer;">다시 시도</button>
      </div>
    `;
  }
}

// 탭 콘텐츠 로드
async function loadTabContent(tabType) {
  console.log(`[Support-News] 탭 콘텐츠 로드 시작: ${tabType}`);

  const filePath = tabMapping[tabType];
  if (!filePath) {
    console.error(`[Support-News] 알 수 없는 탭 타입: ${tabType}`);
    showError('알 수 없는 탭입니다.');
    return;
  }

  const contentArea = document.getElementById('tag-content');
  if (!contentArea) {
    console.error('[Support-News] tag-content 영역을 찾을 수 없습니다.');
    return;
  }

  try {
    // 로딩 표시
    showLoading();

    // 파일 로드
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const htmlContent = await response.text();

    // 콘텐츠 삽입
    contentArea.innerHTML = htmlContent;

    console.log(`[Support-News] 탭 콘텐츠 로드 완료: ${tabType}`);

    // 콘텐츠 로드 완료 이벤트 발생
    const event = new CustomEvent('tabContentLoaded', {
      detail: { tabType, filePath }
    });
    document.dispatchEvent(event);

  } catch (error) {
    console.error(`[Support-News] 탭 콘텐츠 로드 실패:`, error);
    showError(`콘텐츠를 불러올 수 없습니다. (${error.message})`);
  }
}

// 탭 활성화 상태 업데이트
function updateActiveTab(activeTab) {
  const tabLinks = document.querySelectorAll('.tag-container a');

  tabLinks.forEach(link => {
    const tabType = link.getAttribute('data-tab');
    if (tabType === activeTab) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 탭 클릭 이벤트 처리
function handleTabClick(event) {
  event.preventDefault();

  const tabType = event.target.getAttribute('data-tab');
  if (!tabType) return;

  console.log(`[Support-News] 탭 클릭: ${tabType}`);

  // 활성 탭 업데이트
  updateActiveTab(tabType);

  // 콘텐츠 로드
  loadTabContent(tabType);
}

// 초기화
function initSupportNewsTab() {
  console.log('[Support-News] 탭 시스템 초기화');

  // 탭 클릭 이벤트 등록
  const tagContainer = document.querySelector('.tag-container');
  if (tagContainer) {
    tagContainer.addEventListener('click', handleTabClick);
    console.log('[Support-News] 탭 클릭 이벤트 등록 완료');
  } else {
    console.warn('[Support-News] tag-container를 찾을 수 없습니다.');
  }

  // 첫 번째 탭(UROCK소식) 기본 로드
  updateActiveTab('news');
  loadTabContent('news');
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', function () {
  console.log('[Support-News] DOM 로드 완료');

  // 약간의 지연 후 초기화 (다른 스크립트들이 로드될 시간 확보)
  setTimeout(() => {
    initSupportNewsTab();
  }, 100);
});

// 전역 함수로 노출 (디버깅용)
window.supportNewsTab = {
  loadTabContent,
  updateActiveTab,
  initSupportNewsTab
}; 