/**
 * 브레드크럼 네비게이션 컴포넌트 스크립트
 */

// 브레드크럼 컴포넌트 초기화
function initBreadcrumbComponents() {
  console.log('[Component] 브레드크럼 컴포넌트 초기화');

  // 현재 URL 경로 가져오기
  const path = window.location.pathname;

  // 브레드크럼 요소 찾기
  const breadcrumbs = document.querySelectorAll('.breadcrumb');

  breadcrumbs.forEach(breadcrumb => {
    // 이미 생성된 항목이 있으면 초기화하지 않음
    if (breadcrumb.querySelector('.breadcrumb-item')) {
      return;
    }

    // 홈 링크 생성
    const homeItem = document.createElement('div');
    homeItem.className = 'breadcrumb-item';

    const homeLink = document.createElement('a');
    homeLink.href = '/';
    homeLink.textContent = '홈';

    homeItem.appendChild(homeLink);
    breadcrumb.appendChild(homeItem);

    // 경로 분석 및 항목 추가
    const segments = path.split('/').filter(segment => segment !== '');
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // 페이지 이름 추출 (확장자 제거)
      let itemName = segment.replace(/\.(html|php|jsp)$/, '');

      // 페이지 타입에 따른 이름 변환
      if (itemName.includes('solution')) {
        itemName = '솔루션';
      } else if (itemName.includes('service')) {
        itemName = '서비스';
      } else if (itemName.includes('support')) {
        itemName = '고객지원';
      } else if (itemName.includes('company')) {
        itemName = '회사소개';
      }

      // 항목 생성
      const item = document.createElement('div');
      item.className = 'breadcrumb-item';

      // 마지막 항목은 링크 없이 활성화 스타일
      if (index === segments.length - 1) {
        const span = document.createElement('span');
        span.className = 'active';
        span.textContent = itemName;
        item.appendChild(span);
      } else {
        const link = document.createElement('a');
        link.href = currentPath;
        link.textContent = itemName;
        item.appendChild(link);
      }

      breadcrumb.appendChild(item);
    });
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initBreadcrumbComponents);

// 외부에서 접근 가능하도록 노출
window.initBreadcrumbComponents = initBreadcrumbComponents; 