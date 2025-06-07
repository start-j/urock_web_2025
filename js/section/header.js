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
  setupMobileMenu();
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
function setupMobileMenu() {
  const menuBtn = document.querySelector('header .mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const drawerMenu = document.querySelector('.mobile-drawer-menu');

  if (!menuBtn || !drawer || !overlay || !closeBtn || !drawerMenu) return;

  // 드로워 열기/닫기
  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    menuBtn.classList.add('hide');
    document.body.style.overflow = 'hidden';
    
    // 드로워가 열릴 때 메뉴 아이템들 순차적으로 나타나는 애니메이션
    animateMenuItems();
  }
  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    menuBtn.classList.remove('hide');
    document.body.style.overflow = '';
    
    // 모든 서브메뉴 닫기
    closeAllSubmenus();
  }
  
  // 메뉴 아이템 애니메이션
  function animateMenuItems() {
    const menuItems = document.querySelectorAll('.mobile-drawer-menu .menu-item');
    
    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(20px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 50);
    });
  }
  
  // 모든 서브메뉴 닫기
  function closeAllSubmenus() {
    const allSubmenus = document.querySelectorAll('.mobile-drawer-menu .submenu');
    const allLinks = document.querySelectorAll('.mobile-drawer-menu .menu-link.has-submenu');
    
    allSubmenus.forEach(submenu => {
      submenu.classList.remove('active');
    });
    
    allLinks.forEach(link => {
      link.classList.remove('active');
    });
  }
  
  // 서브메뉴 토글
  function toggleSubmenu(e) {
    const link = e.currentTarget;
    const targetId = link.getAttribute('data-target');
    const submenu = document.getElementById(targetId);
    
    // 서브메뉴가 없으면 (마지막 뎁스) 링크 이동 허용
    if (!submenu) {
      return; // 기본 링크 동작 허용
    }
    
    // 서브메뉴가 있으면 링크 이동 방지하고 토글
    e.preventDefault();
    
    const isActive = submenu.classList.contains('active');
    
    // 같은 레벨의 다른 서브메뉴들 닫기
    closeSiblingSubmenus(submenu);
    
    if (isActive) {
      // 현재 서브메뉴와 하위 서브메뉴들 닫기
      closeSubmenuAndChildren(submenu);
      link.classList.remove('active');
    } else {
      // 서브메뉴 열기
      submenu.classList.add('active');
      link.classList.add('active');
    }
  }
  
  // 형제 서브메뉴들 닫기
  function closeSiblingSubmenus(currentSubmenu) {
    const parent = currentSubmenu.parentElement.parentElement;
    const siblings = parent.querySelectorAll(':scope > .menu-item > .submenu');
    
    siblings.forEach(sibling => {
      if (sibling !== currentSubmenu) {
        closeSubmenuAndChildren(sibling);
        const siblingLink = sibling.previousElementSibling;
        if (siblingLink) {
          siblingLink.classList.remove('active');
        }
      }
    });
  }
  
  // 서브메뉴와 자식들 닫기
  function closeSubmenuAndChildren(submenu) {
    submenu.classList.remove('active');
    
    // 하위 서브메뉴들도 모두 닫기
    const childSubmenus = submenu.querySelectorAll('.submenu');
    childSubmenus.forEach(child => {
      child.classList.remove('active');
      const childLink = child.previousElementSibling;
      if (childLink) {
        childLink.classList.remove('active');
      }
    });
  }

  // 이벤트 리스너 등록
  menuBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  
  // 서브메뉴 토글 이벤트 (has-submenu가 있는 것만)
  const menuLinks = document.querySelectorAll('.mobile-drawer-menu .menu-link.has-submenu');
  menuLinks.forEach(link => {
    link.addEventListener('click', toggleSubmenu);
  });
  
  // 마지막 뎁스 링크들 (has-submenu가 없는 것들)
  const finalLinks = document.querySelectorAll('.mobile-drawer-menu .menu-link:not(.has-submenu)');
  finalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // 실제 링크 주소가 #이 아닌 경우에만 페이지 이동
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        // 실제 페이지로 이동
        window.location.href = href;
      } else {
        // 데모용: 알림으로 어떤 메뉴를 클릭했는지 표시
        e.preventDefault();
        const menuText = link.textContent.trim();
        alert(`"${menuText}" 페이지로 이동합니다!`);
        closeDrawer();
      }
    });
  });
  
  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });
}

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
