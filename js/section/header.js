// header 컴포넌트 초기화
function initHeaderComponent() {
  // FAB 버튼 기능
  setupFabButton();

  // 메뉴 포커스/활성화 처리
  setupMenuActivation();

  // 현재 페이지에 따른 메뉴 활성화
  setActiveMenuByCurrentPage();

  // 언어 선택 드롭다운 기능
  setupLanguageDropdown();

  // 모바일 메뉴 기능
  // setupMobileMenu(); // Removed mobile menu setup
}

// FAB 버튼 설정
function setupFabButton() {
  // header 내부와 전역 모두에서 FAB 버튼 찾기
  const fabBtn = document.querySelector('header .fab-btn') || document.querySelector('.fab-btn');

  if (fabBtn) {
    // 스크롤 위치에 따라 버튼 표시/숨김
    window.addEventListener('scroll', function () {
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
        behavior: 'smooth'
      });
    });
  }
}

// 메뉴 활성화 설정
function setupMenuActivation() {
  // 기존 방식과 새로운 방식 모두 지원
  const menuItems = document.querySelectorAll('header .menu li') ||
    document.querySelectorAll('.menu .menu-item');

  menuItems.forEach(item => {
    // 클릭 이벤트
    item.addEventListener('click', function () {
      // 모든 메뉴에서 active 클래스 제거
      menuItems.forEach(menuItem => {
        menuItem.classList.remove('active');
        const link = menuItem.querySelector('a');
        if (link) link.classList.remove('active');
      });

      // 클릭된 메뉴에 active 클래스 추가
      this.classList.add('active');
      const link = this.querySelector('a');
      if (link) link.classList.add('active');
    });

    // 포커스 이벤트 (키보드 접근성)
    item.addEventListener('focusin', function () {
      menuItems.forEach(menuItem => menuItem.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// 현재 페이지에 따른 메뉴 활성화
function setActiveMenuByCurrentPage() {
  const currentPath = window.location.pathname;
  const menuItems = document.querySelectorAll('header .menu li') ||
    document.querySelectorAll('.menu .menu-item');

  menuItems.forEach(item => {
    const link = item.querySelector('a');
    if (link) {
      const href = link.getAttribute('href');

      // 다양한 방식으로 현재 페이지 매칭
      if (href && (
        currentPath === href ||
        currentPath.includes(href.split('/').pop().split('.')[0]) ||
        (item.dataset.page && currentPath.includes(item.dataset.page))
      )) {
        item.classList.add('active');
        link.classList.add('active');
      }
    }
  });
}

// 언어 선택 드롭다운 설정 (네이밍 일치 및 위치 보장)
function setupLanguageDropdown() {
  const languageSelector = document.querySelector('header .language') || document.querySelector('.language');
  const tooltipGlobal = document.querySelector('header > .language-tooltip-global');

  if (!languageSelector || !tooltipGlobal) return;

  // SNB가 없으면 생성
  let snbMenu = languageSelector.querySelector('.language-snb');
  if (!snbMenu) {
    snbMenu = document.createElement('ul');
    snbMenu.className = 'language-snb';
    snbMenu.innerHTML = `
      <li data-lang="ko">한국어</li>
      <li data-lang="en">English</li>
      <li data-lang="ja">日本語</li>
    `;
    languageSelector.appendChild(snbMenu);
  }

  // 자동 닫힘 타이머 변수
  let tooltipTimer = null;

  // 언어 선택 토글 이벤트
  languageSelector.addEventListener('click', function (event) {
    event.stopPropagation();
    const isTooltipVisible = tooltipGlobal.classList.contains('show-tooltip');
    // 토글
    if (isTooltipVisible) {
      tooltipGlobal.classList.remove('show-tooltip');
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
        tooltipTimer = null;
      }
    } else {
      tooltipGlobal.classList.add('show-tooltip');
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
        tooltipTimer = null;
      }
      tooltipTimer = setTimeout(() => {
        tooltipGlobal.classList.remove('show-tooltip');
        tooltipTimer = null;
      }, 3000);
    }
  });

  // 언어 선택 항목 클릭 이벤트
  const langItems = snbMenu.querySelectorAll('li');
  langItems.forEach(item => {
    item.addEventListener('click', function (event) {
      event.stopPropagation();
      langItems.forEach(li => li.classList.remove('active'));
      this.classList.add('active');
      tooltipGlobal.classList.remove('show-tooltip');
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
        tooltipTimer = null;
      }
    });
  });

  // 외부 클릭 시 드롭다운/툴팁 닫기
  document.addEventListener('click', function (event) {
    if (!languageSelector.contains(event.target)) {
      tooltipGlobal.classList.remove('show-tooltip');
      if (tooltipTimer) {
        clearTimeout(tooltipTimer);
        tooltipTimer = null;
      }
    }
  });
}

// 모바일 메뉴 설정 (중복 제거 및 최적화)
// function setupMobileMenu() {
//   // 기존 요소들 찾기
//   const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
//   const overlay = document.querySelector('.mobile-overlay');

//   console.log('모바일 메뉴 요소 확인:', {
//     mobileMenuBtn: !!mobileMenuBtn,
//     overlay: !!overlay
//   });

//   // 모바일 메뉴 요소가 없으면 재시도
//   if (!mobileMenuBtn || !overlay) {
//     console.warn('모바일 메뉴 요소를 찾을 수 없습니다. 1초 후 재시도...');
//     setTimeout(() => {
//       setupMobileMenu();
//     }, 1000);
//     return;
//   }

//   console.log('모바일 메뉴 초기화 시작');

//   // 모바일 메뉴 닫기 함수
//   function closeMobileMenu() {
//     overlay.classList.remove('active');
//     document.body.style.overflow = '';
//   }

//   // 모바일 메뉴 버튼 클릭 이벤트
//   mobileMenuBtn.addEventListener('click', function () {
//     console.log('모바일 메뉴 버튼 클릭됨');
//     overlay.classList.add('active');
//     document.body.style.overflow = 'hidden'; // 스크롤 방지
//   });

//   // 닫기 버튼 이벤트
//   const closeBtn = mobilePanel.querySelector('.close-btn');
//   if (closeBtn) {
//     closeBtn.addEventListener('click', closeMobileMenu);
//     console.log('닫기 버튼 이벤트 등록 완료');
//   }

//   // 오버레이 클릭 시 메뉴 닫기
//   overlay.addEventListener('click', closeMobileMenu);
//   console.log('오버레이 이벤트 등록 완료');

//   // 서브메뉴 토글 설정
//   setupSubmenuToggle();
// }

// 서브메뉴 토글 설정
// function setupSubmenuToggle() {
//   console.log('서브메뉴 토글 요소 찾음:', menuToggles.length);

//   menuToggles.forEach(toggle => {
//     toggle.addEventListener('click', function (e) {
//       e.preventDefault();
//       e.stopPropagation();

//       const parentMenuItem = this.closest('.mobile-menu-item.has-submenu');
//       if (parentMenuItem) {
//         const submenu = parentMenuItem.querySelector('.submenu');
//         if (submenu) {
//           console.log('서브메뉴 토글');
//           // 다른 열린 서브메뉴 닫기
//           const otherOpenMenus = document.querySelectorAll('.mobile-menu-item.has-submenu.expanded');
//           otherOpenMenus.forEach(menu => {
//             if (menu !== parentMenuItem) {
//               menu.classList.remove('expanded');
//               menu.querySelector('.submenu').classList.remove('expanded');
//             }
//           });

//           // 현재 서브메뉴 토글
//           parentMenuItem.classList.toggle('expanded');
//           submenu.classList.toggle('expanded');
//         }
//       }
//     });
//   });
// }

// 현재 페이지에 따른 모바일 메뉴 활성화
// function setActiveMobileMenu() {
//   setTimeout(function () {
//     const currentPath = window.location.pathname;

//     // 모든 active 클래스 제거

//     // 현재 페이지와 매칭되는 메뉴 찾기
//     allMenuItems.forEach(li => {
//       const links = li.querySelectorAll('a');

//       links.forEach(link => {
//         const href = link.getAttribute('href');
//         if (href && (
//           currentPath === href ||
//           currentPath.includes(href.split('/').pop().split('.')[0])
//         )) {
//           // 해당 메뉴 활성화
//           li.classList.add('active');

//           // 부모 메뉴들도 활성화하고 확장
//           let parent = li.closest('.submenu');
//           while (parent) {
//             parent.classList.add('expanded');
//             const parentLi = parent.closest('li.has-submenu');
//             if (parentLi) {
//               parentLi.classList.add('expanded');
//               parent = parentLi.closest('submenu');
//             } else {
//               break;
//             }
//           });
//         }
//       });
//     });
//   }, 100);
// }

// 초기화 방식 (로딩 상태에 따라)
function initHeaderSafely() {
  console.log('Header 초기화 시작, DOM 상태:', document.readyState);

  // DOM이 완전히 로드될 때까지 기다림
  if (document.readyState === 'loading') {
    console.log('DOM 로딩 중, DOMContentLoaded 이벤트 대기');
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOMContentLoaded 이벤트 발생');
      setTimeout(initHeaderComponent, 100);
    });
  } else {
    console.log('DOM 이미 로드됨, 즉시 초기화');
    setTimeout(initHeaderComponent, 100);
  }
}

// include.js가 완료된 후에도 호출되도록
window.addEventListener('load', () => {
  console.log('Window load 이벤트 발생, header 재초기화');
  setTimeout(initHeaderComponent, 200);
});

// 초기화 실행
initHeaderSafely();

// 외부에서 호출 가능하도록 전역 함수로 노출
window.reInitHeaderComponent = initHeaderComponent;

function syncMenuIconWithText() {
  const menuText = document.querySelector('.menu-text');
  const menuIcon = document.querySelector('.menu-icon');

  if (menuText && menuIcon) {
    if (window.innerWidth <= 768) {
      // 작은 화면에서는 menuText 숨김 + icon 표시
      menuText.style.display = 'none';
      menuIcon.style.display = 'block';
    } else {
      // 큰 화면에서는 menuText 보임 + icon 숨김
      menuText.style.display = 'block';
      menuIcon.style.display = 'none';
    }
  }
}

// 이벤트 연결
window.addEventListener('resize', syncMenuIconWithText);
window.addEventListener('DOMContentLoaded', syncMenuIconWithText);

document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    const toggleButton = item.querySelector('.nav-toggle');
    const subMenu = item.querySelector('.sub-menu');
    const arrowIcon = item.querySelector('.arrow-icon');

    if (toggleButton && subMenu) {
      toggleButton.addEventListener('click', function() {
        const isOpen = subMenu.classList.contains('open');

        // 모든 서브메뉴 닫기
        document.querySelectorAll('.sub-menu.open').forEach(openSubMenu => {
          openSubMenu.classList.remove('open');
          openSubMenu.previousElementSibling.querySelector('.arrow-icon').classList.remove('up');
        });

        // 현재 서브메뉴 열기/닫기
        if (!isOpen) {
          subMenu.classList.add('open');
          arrowIcon.classList.add('up');
        }
      });
    }
  });
});

// 헤더가 완전히 삽입된 후에만 언어 드롭다운 JS 실행
function waitAndSetupLanguageDropdown() {
  const languageSelector = document.querySelector('header .language');
  if (languageSelector) {
    setupLanguageDropdown();
  } else {
    setTimeout(waitAndSetupLanguageDropdown, 100);
  }
}

document.addEventListener('DOMContentLoaded', waitAndSetupLanguageDropdown);
