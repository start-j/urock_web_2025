// header 컴포넌트 초기화
function initHeaderComponent() {
  // 480px 이하에서는 FAB 기능을 완전히 제거
  if (window.innerWidth <= 480) {
    console.log("[FAB] FAB 기능 비활성화 - 모바일 화면 (480px 이하)");
  } else {
    // FAB 버튼 스크롤 동작 (480px 초과 화면에서만 동작)
    const fabBtn = document.querySelector(".fab-btn");
    if (fabBtn) {
      // 기존 이벤트 리스너 제거 (중복 방지)
      if (window.fabScrollHandler) {
        window.removeEventListener("scroll", window.fabScrollHandler);
      }
      if (window.fabClickHandler) {
        fabBtn.removeEventListener("click", window.fabClickHandler);
        fabBtn.removeEventListener("touchend", window.fabClickHandler);
      }

      // 스크롤 이벤트 핸들러 정의
      window.fabScrollHandler = function () {
        if (window.scrollY > 300) {
          fabBtn.style.display = "block";
        } else {
          fabBtn.style.display = "none";
        }
      };

      // 클릭/터치 이벤트 핸들러 정의 (터치 개선)
      window.fabClickHandler = function (e) {
        // 터치 이벤트의 경우 추가 검증
        if (e.type === "touchend") {
          // 터치 드래그/스와이프 방지: 터치 시작과 끝 위치 비교
          if (e.changedTouches && e.changedTouches[0]) {
            const touch = e.changedTouches[0];
            const touchStartData = fabBtn.touchStartData;

            if (touchStartData) {
              const moveDistance = Math.sqrt(
                Math.pow(touch.clientX - touchStartData.startX, 2) +
                  Math.pow(touch.clientY - touchStartData.startY, 2)
              );

              // 10px 이상 움직였으면 클릭으로 인정하지 않음
              if (moveDistance > 10) {
                console.log("[FAB] 터치 드래그 감지, 스크롤 취소");
                return;
              }

              // 터치 시간이 500ms 이상이면 길게 누른 것으로 간주
              const touchDuration = Date.now() - touchStartData.startTime;
              if (touchDuration > 500) {
                console.log("[FAB] 긴 터치 감지, 스크롤 취소");
                return;
              }
            }
          }
        }

        // 실제 스크롤 실행
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        console.log("[FAB] top으로 스크롤 실행");
      };

      // 터치 시작 데이터 저장
      const touchStartHandler = function (e) {
        if (e.touches && e.touches[0]) {
          const touch = e.touches[0];
          fabBtn.touchStartData = {
            startX: touch.clientX,
            startY: touch.clientY,
            startTime: Date.now(),
          };
        }
      };

      // 이벤트 리스너 등록
      window.addEventListener("scroll", window.fabScrollHandler);
      fabBtn.addEventListener("click", window.fabClickHandler); // 데스크톱용
      fabBtn.addEventListener("touchstart", touchStartHandler, {
        passive: true,
      }); // 터치 시작
      fabBtn.addEventListener("touchend", window.fabClickHandler); // 터치 끝

      // 페이지 진입 시 초기 상태 설정
      if (window.scrollY > 300) {
        fabBtn.style.display = "block";
      } else {
        fabBtn.style.display = "none";
      }

      console.log("[FAB] FAB 버튼 이벤트 리스너 등록 완료 (중복 방지)");
    } else {
      console.log("[FAB] FAB button not found");
    }
  }

  // 메뉴 포커스/활성화 처리
  setupMenuActivation();

  // 현재 페이지에 따른 메뉴 활성화
  setActiveMenuByCurrentPage();

  // 언어 선택 드롭다운 기능
  setupLanguageDropdown();

  // 모바일 메뉴 기능
  setupMobileMenu();

  // 윈도우 리사이즈 시 FAB 기능 재설정
  setupFabResizeHandler();
}

// FAB 윈도우 리사이즈 핸들러 설정
function setupFabResizeHandler() {
  // 기존 리사이즈 이벤트 리스너 제거 (중복 방지)
  if (window.fabResizeHandler) {
    window.removeEventListener("resize", window.fabResizeHandler);
  }

  window.fabResizeHandler = function () {
    const fabBtn = document.querySelector(".fab-btn");
    if (!fabBtn) return;

    if (window.innerWidth <= 480) {
      // 480px 이하: FAB 숨기고 이벤트 제거
      fabBtn.style.display = "none";

      // 모바일에서는 FAB 이벤트 리스너 완전 제거
      if (window.fabScrollHandler) {
        window.removeEventListener("scroll", window.fabScrollHandler);
      }
      if (window.fabClickHandler) {
        fabBtn.removeEventListener("click", window.fabClickHandler);
        fabBtn.removeEventListener("touchend", window.fabClickHandler);
      }

      console.log("[FAB] FAB 기능 비활성화됨 - 모바일 화면");
    } else {
      // 480px 초과: FAB 기능 활성화
      console.log("[FAB] FAB 기능 활성화됨 - 데스크톱 화면");

      // 이벤트 리스너가 없으면 다시 등록
      if (!window.fabScrollHandler || !window.fabClickHandler) {
        // FAB 기능 재초기화
        setTimeout(() => {
          if (typeof initHeaderComponent === "function") {
            initHeaderComponent();
          }
        }, 100);
      } else {
        // 스크롤 위치에 따른 초기 상태 설정
        if (window.scrollY > 300) {
          fabBtn.style.display = "block";
        } else {
          fabBtn.style.display = "none";
        }
      }
    }
  };

  // 리사이즈 이벤트 리스너 등록
  window.addEventListener("resize", window.fabResizeHandler);
}

// 메뉴 활성화 설정
function setupMenuActivation() {
  // 기존 방식과 새로운 방식 모두 지원
  const menuItems =
    document.querySelectorAll("header .menu li") ||
    document.querySelectorAll(".menu .menu-item");

  menuItems.forEach((item) => {
    // 클릭 이벤트
    item.addEventListener("click", function () {
      // 모든 메뉴에서 active 클래스 제거
      menuItems.forEach((menuItem) => {
        menuItem.classList.remove("active");
        const link = menuItem.querySelector("a");
        if (link) link.classList.remove("active");
      });

      // 클릭된 메뉴에 active 클래스 추가
      this.classList.add("active");
      const link = this.querySelector("a");
      if (link) link.classList.add("active");
    });

    // 포커스 이벤트 (키보드 접근성)
    item.addEventListener("focusin", function () {
      menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

// 현재 페이지에 따른 메뉴 활성화
function setActiveMenuByCurrentPage() {
  const currentPath = window.location.pathname;
  const menuItems =
    document.querySelectorAll("header .menu li") ||
    document.querySelectorAll(".menu .menu-item");

  menuItems.forEach((item) => {
    const link = item.querySelector("a");
    if (link) {
      const href = link.getAttribute("href");

      // 다양한 방식으로 현재 페이지 매칭
      if (
        href &&
        (currentPath === href ||
          currentPath.includes(href.split("/").pop().split(".")[0]) ||
          (item.dataset.page && currentPath.includes(item.dataset.page)))
      ) {
        item.classList.add("active");
        link.classList.add("active");
      }
    }
  });
}

// 언어 선택 드롭다운 설정 (새로운 드롭다운 메뉴)
function setupLanguageDropdown() {
  console.log("[LanguageDropdown] language dropdown initialization started");

  // 이벤트 델리게이션 방식으로 변경 (페이지 전환에 안전)
  if (window.languageDropdownInitialized) {
    console.log("[LanguageDropdown] language dropdown already initialized");
    return;
  }

  // 자동 닫힘 타이머 변수 (전역으로 관리)
  window.languageDropdownTimer = null;

  // 이벤트 델리게이션으로 언어 아이콘 클릭 처리
  document.addEventListener("click", function (event) {
    const languageSelector = event.target.closest("header .language");
    const dropdown = document.querySelector("header .language-dropdown-global");

    if (languageSelector && dropdown) {
      event.stopPropagation();
      console.log("[LanguageDropdown] language icon clicked");

      const isDropdownVisible = dropdown.classList.contains("show-dropdown");

      // 토글
      if (isDropdownVisible) {
        dropdown.classList.remove("show-dropdown");
        console.log("[LanguageDropdown] dropdown hidden");
        if (window.languageDropdownTimer) {
          clearTimeout(window.languageDropdownTimer);
          window.languageDropdownTimer = null;
        }
      } else {
        dropdown.classList.add("show-dropdown");
        console.log("[LanguageDropdown] dropdown shown");
        if (window.languageDropdownTimer) {
          clearTimeout(window.languageDropdownTimer);
          window.languageDropdownTimer = null;
        }
        // 5초 후 자동 닫힘
        window.languageDropdownTimer = setTimeout(() => {
          dropdown.classList.remove("show-dropdown");
          console.log(
            "[LanguageDropdown] dropdown automatically closed (5 seconds elapsed)"
          );
          window.languageDropdownTimer = null;
        }, 5000);
      }
      return;
    }

    // 언어 옵션 클릭 처리
    const languageOption = event.target.closest(".language-option");
    if (languageOption) {
      event.stopPropagation();
      const lang = languageOption.getAttribute("data-lang");
      const url = languageOption.getAttribute("data-url");
      console.log("[LanguageDropdown] language selected:", lang, "URL:", url);

      // 드롭다운 닫기
      const dropdownForClose = document.querySelector(
        "header .language-dropdown-global"
      );
      if (dropdownForClose) {
        dropdownForClose.classList.remove("show-dropdown");
        if (window.languageDropdownTimer) {
          clearTimeout(window.languageDropdownTimer);
          window.languageDropdownTimer = null;
        }
      }

      // 페이지 이동 (내부/외부 경로 모두 지원 - 현재 탭에서 열기)
      if (url) {
        console.log("[LanguageDropdown] page navigation:", url);

        // 외부 링크 확인 (https:// 또는 http://로 시작하는 경우)
        const isExternalLink =
          url.startsWith("http://") || url.startsWith("https://");

        if (isExternalLink) {
          console.log(
            "[LanguageDropdown] external link detected, navigating to:",
            url
          );
          // 외부 링크도 현재 탭에서 열기 (_self 동작)
          window.location.assign(url);
        } else {
          console.log(
            "[LanguageDropdown] internal link detected, navigating to:",
            url
          );
          // 내부 링크의 경우 일반적인 이동
          window.location.href = url;
        }
      }
      return;
    }

    // 외부 클릭 시 드롭다운 닫기
    const dropdownForOutsideClick = document.querySelector(
      "header .language-dropdown-global"
    );
    if (
      dropdownForOutsideClick &&
      dropdownForOutsideClick.classList.contains("show-dropdown")
    ) {
      const languageArea = document.querySelector("header .language");
      if (!languageArea || !languageArea.contains(event.target)) {
        dropdownForOutsideClick.classList.remove("show-dropdown");
        console.log("[LanguageDropdown] dropdown closed by outside click");
        if (window.languageDropdownTimer) {
          clearTimeout(window.languageDropdownTimer);
          window.languageDropdownTimer = null;
        }
      }
    }
  });

  // 초기화 완료 표시
  window.languageDropdownInitialized = true;
  console.log("[LanguageDropdown] language dropdown initialization completed");
}

// 모바일 메뉴 설정 (중복 제거 및 최적화)
function setupMobileMenu() {
  const menuBtn = document.querySelector("header .mobile-menu-btn");
  const drawer = document.querySelector(".mobile-drawer");
  const overlay = document.querySelector(".mobile-drawer-overlay");
  const closeBtn = document.querySelector(".mobile-drawer-close");
  const drawerMenu = document.querySelector(".mobile-drawer-menu");

  if (!menuBtn || !drawer || !overlay || !closeBtn || !drawerMenu) {
    console.log("[MobileMenu] mobile menu elements not found:", {
      menuBtn: !!menuBtn,
      drawer: !!drawer,
      overlay: !!overlay,
      closeBtn: !!closeBtn,
      drawerMenu: !!drawerMenu,
    });
    return;
  }

  // 이전 이벤트 리스너 완전 제거 (더 안전한 방법)
  const existingHandlers = drawer.dataset.mobileMenuHandlers;
  if (existingHandlers) {
    try {
      const handlers = JSON.parse(existingHandlers);
      handlers.forEach((handler) => {
        if (handler.element && handler.event && handler.listener) {
          const element = document.querySelector(handler.element);
          if (element) {
            element.removeEventListener(handler.event, handler.listener);
          }
        }
      });
    } catch (e) {
      console.warn("[MobileMenu] previous event handler removal failed:", e);
    }
  }

  // 모든 서브메뉴 리스너 제거
  const allMenuLinks = document.querySelectorAll(
    ".mobile-drawer-menu .menu-link"
  );
  allMenuLinks.forEach((link) => {
    // 기존 이벤트 리스너를 완전히 제거하기 위해 outerHTML 방식 사용
    const parent = link.parentNode;
    const newLink = document.createElement("a");

    // 모든 속성 복사
    Array.from(link.attributes).forEach((attr) => {
      newLink.setAttribute(attr.name, attr.value);
    });
    newLink.innerHTML = link.innerHTML;

    parent.replaceChild(newLink, link);
  });

  console.log("[MobileMenu] mobile menu setup started - new approach");

  // 드로워 열기/닫기
  function openDrawer() {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    animateMenuItems();
  }

  function closeDrawer() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
    closeAllSubmenus();
  }

  function animateMenuItems() {
    const menuItems = drawer.querySelectorAll(".menu-item");
    menuItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
      setTimeout(() => {
        item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
      }, index * 50);
    });
  }

  function closeAllSubmenus() {
    const submenus = drawer.querySelectorAll(".submenu");
    const hasSubmenuLinks = drawer.querySelectorAll(".menu-link.has-submenu");

    submenus.forEach((submenu) => submenu.classList.remove("active"));
    hasSubmenuLinks.forEach((link) => link.classList.remove("active"));
  }

  function toggleSubmenu(e) {
    e.preventDefault();

    const link = e.currentTarget;
    const targetId = link.getAttribute("data-target");
    const submenu = document.getElementById(targetId);

    // 서브메뉴가 없으면 링크 이동 허용
    if (!submenu) {
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        window.location.href = href;
      }
      return;
    }

    const isActive = submenu.classList.contains("active");

    // 같은 레벨의 다른 서브메뉴들 닫기
    closeSiblingSubmenus(submenu);

    if (isActive) {
      // 현재 서브메뉴와 하위 서브메뉴들 닫기
      closeSubmenuAndChildren(submenu);
      link.classList.remove("active");
    } else {
      // 서브메뉴 열기
      submenu.classList.add("active");
      link.classList.add("active");
    }
  }

  // 형제 서브메뉴들 닫기
  function closeSiblingSubmenus(currentSubmenu) {
    const parent = currentSubmenu.parentElement.parentElement;
    if (parent) {
      const siblings = parent.querySelectorAll(
        ":scope > .menu-item > .submenu"
      );

      siblings.forEach((sibling) => {
        if (sibling !== currentSubmenu) {
          closeSubmenuAndChildren(sibling);
          const siblingLink = sibling.previousElementSibling;
          if (siblingLink && siblingLink.classList.contains("has-submenu")) {
            siblingLink.classList.remove("active");
          }
        }
      });
    }
  }

  // 서브메뉴와 자식들 닫기
  function closeSubmenuAndChildren(submenu) {
    submenu.classList.remove("active");

    // 하위 서브메뉴들도 모두 닫기
    const childSubmenus = submenu.querySelectorAll(".submenu");
    childSubmenus.forEach((child) => {
      child.classList.remove("active");
      const childLink = child.previousElementSibling;
      if (childLink) {
        childLink.classList.remove("active");
      }
    });
  }

  // 새로운 이벤트 리스너 등록
  const newMenuBtn = document.querySelector("header .mobile-menu-btn");
  const newCloseBtn = document.querySelector(".mobile-drawer-close");
  const newOverlay = document.querySelector(".mobile-drawer-overlay");

  // 기본 이벤트들
  if (newMenuBtn) {
    newMenuBtn.removeEventListener("click", openDrawer); // 중복 방지
    newMenuBtn.addEventListener("click", openDrawer);
  }

  if (newCloseBtn) {
    newCloseBtn.removeEventListener("click", closeDrawer); // 중복 방지
    newCloseBtn.addEventListener("click", closeDrawer);
  }

  if (newOverlay) {
    newOverlay.removeEventListener("click", closeDrawer); // 중복 방지
    newOverlay.addEventListener("click", closeDrawer);
  }

  // 서브메뉴 토글 이벤트 (새로 생성된 링크들에 대해)
  const menuLinks = document.querySelectorAll(
    ".mobile-drawer-menu .menu-link.has-submenu"
  );
  console.log(`[MobileMenu] found submenu links: ${menuLinks.length}`);

  menuLinks.forEach((link, index) => {
    console.log(
      `[MobileMenu] submenu link ${
        index + 1
      }: ${link.textContent.trim()}, data-target: ${link.getAttribute(
        "data-target"
      )}`
    );
    link.addEventListener("click", toggleSubmenu);
  });

  // 마지막 뎁스 링크들
  const finalLinks = document.querySelectorAll(
    ".mobile-drawer-menu .menu-link:not(.has-submenu)"
  );
  finalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href !== "#") {
        closeDrawer();
        // 실제 페이지 이동은 기본 동작으로 처리
      } else {
        e.preventDefault();
        const menuText = link.textContent.trim();
        alert(`"${menuText}" 페이지로 이동합니다!`);
        closeDrawer();
      }
    });
  });

  // ESC 키로 닫기 (중복 방지)
  document.removeEventListener("keydown", handleEscKey);
  document.addEventListener("keydown", handleEscKey);

  function handleEscKey(e) {
    if (e.key === "Escape") {
      closeDrawer();
    }
  }

  // 초기화 완료 표시
  drawer.dataset.mobileMenuInitialized = "true";
  console.log("[MobileMenu] mobile menu setup completed");
}

// 초기화 방식 (로딩 상태에 따라)
function initHeaderSafely() {
  console.log(
    "[Header] header initialization started, DOM state:",
    document.readyState
  );

  // DOM이 완전히 로드될 때까지 기다림
  if (document.readyState === "loading") {
    console.log("[Header] DOM loading, waiting for DOMContentLoaded event");
    document.addEventListener("DOMContentLoaded", () => {
      console.log("[Header] DOMContentLoaded event triggered");
      setTimeout(initHeaderComponent, 100);
    });
  } else {
    console.log("[Header] DOM already loaded, immediate initialization");
    setTimeout(initHeaderComponent, 100);
  }
}

// include.js가 완료된 후에도 호출되도록
window.addEventListener("load", () => {
  console.log("[Header] window load event triggered, header reinitialization");

  // 완전한 페이지 로드 후 모바일 메뉴 강제 재초기화
  setTimeout(() => {
    const drawer = document.querySelector(".mobile-drawer");
    const hasSubmenuLinks = document.querySelectorAll(
      ".mobile-drawer-menu .menu-link.has-submenu"
    );

    console.log(`[Header] window load check:
      - drawer: ${drawer ? "✅" : "❌"}
      - submenu links: ${hasSubmenuLinks.length} links`);

    if (drawer && hasSubmenuLinks.length > 0) {
      // 초기화 플래그 리셋
      drawer.dataset.mobileMenuInitialized = "false";
      delete drawer.dataset.mobileMenuHandlers;

      console.log(
        "[Header] mobile menu reinitialization started from window load"
      );

      // 확실한 재초기화를 위해 여러 단계로 시도
      const delays = [100, 300, 600];

      delays.forEach((delay, index) => {
        setTimeout(() => {
          console.log(
            `[Header] reinitialization step ${index + 1}/${
              delays.length
            } (${delay}ms delay)`
          );

          if (typeof window.reInitMobileMenu === "function") {
            window.reInitMobileMenu();
          }

          // 마지막 단계에서 최종 검증
          if (index === delays.length - 1) {
            setTimeout(() => {
              const finalCheck = document.querySelectorAll(
                ".mobile-drawer-menu .menu-link.has-submenu"
              );
              const firstSubmenu = finalCheck[0];

              console.log(`[Header] final verification:
                - submenu links: ${finalCheck.length}
                - first link: ${
                  firstSubmenu ? firstSubmenu.textContent.trim() : "none"
                }
                - initialization state: ${
                  drawer.dataset.mobileMenuInitialized
                }`);

              // 실제 클릭 테스트
              if (firstSubmenu) {
                console.log("[Header] actual click event test ready");
              }
            }, 200);
          }
        }, delay);
      });
    } else {
      console.warn("[Header] window load: mobile menu elements not found");
    }
  }, 500);
});

// 초기화 실행
initHeaderSafely();

// 외부에서 호출 가능하도록 전역 함수로 노출
window.reInitHeaderComponent = initHeaderComponent;

// 모바일 메뉴 강제 재초기화 함수 (include.js 완료 후 사용)
window.reInitMobileMenu = function () {
  console.log("[Header] mobile menu forced reinitialization started");

  const drawer = document.querySelector(".mobile-drawer");
  if (!drawer) {
    console.log("[Header] mobile drawer not found, retrying...");
    setTimeout(window.reInitMobileMenu, 100);
    return;
  }

  // 초기화 플래그 강제 리셋
  drawer.dataset.mobileMenuInitialized = "false";
  delete drawer.dataset.mobileMenuHandlers;

  // 모든 기존 이벤트 리스너 제거
  const allElements = [
    document.querySelector("header .mobile-menu-btn"),
    document.querySelector(".mobile-drawer-close"),
    document.querySelector(".mobile-drawer-overlay"),
  ].filter(Boolean);

  // DOM 요소 확인
  const menuLinks = document.querySelectorAll(
    ".mobile-drawer-menu .menu-link.has-submenu"
  );
  const allLinks = document.querySelectorAll(".mobile-drawer-menu .menu-link");

  console.log(`[Header] element state check:
    - drawer: ${drawer ? "✅" : "❌"}
    - submenu links: ${menuLinks.length}
    - total links: ${allLinks.length}
    - default buttons: ${allElements.length}`);

  if (menuLinks.length === 0) {
    console.log("[Header] no submenu links found, retrying...");
    setTimeout(window.reInitMobileMenu, 100);
    return;
  }

  // 약간의 지연 후 setupMobileMenu 호출
  setTimeout(() => {
    console.log("[Header] setupMobileMenu re-execution");
    setupMobileMenu();

    // 초기화 검증
    const newMenuLinks = document.querySelectorAll(
      ".mobile-drawer-menu .menu-link.has-submenu"
    );
    console.log(
      `[Header] reinitialization complete - submenu links: ${newMenuLinks.length}`
    );

    // 테스트용: 첫 번째 서브메뉴 링크 클릭 테스트
    if (newMenuLinks.length > 0) {
      console.log(
        `[Header] first submenu test: ${newMenuLinks[0].textContent.trim()}`
      );
    }
  }, 100);
};

function syncMenuIconWithText() {
  const menuText = document.querySelector(".menu-text");
  const menuIcon = document.querySelector(".menu-icon");

  if (menuText && menuIcon) {
    if (window.innerWidth <= 768) {
      // 작은 화면에서는 menuText 숨김 + icon 표시
      menuText.style.display = "none";
      menuIcon.style.display = "block";
    } else {
      // 큰 화면에서는 menuText 보임 + icon 숨김
      menuText.style.display = "block";
      menuIcon.style.display = "none";
    }
  }
}

// 이벤트 연결
window.addEventListener("resize", syncMenuIconWithText);
window.addEventListener("DOMContentLoaded", syncMenuIconWithText);

document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const toggleButton = item.querySelector(".nav-toggle");
    const subMenu = item.querySelector(".sub-menu");
    const arrowIcon = item.querySelector(".arrow-icon");

    if (toggleButton && subMenu) {
      toggleButton.addEventListener("click", function () {
        const isOpen = subMenu.classList.contains("open");

        // 모든 서브메뉴 닫기
        document.querySelectorAll(".sub-menu.open").forEach((openSubMenu) => {
          openSubMenu.classList.remove("open");
          openSubMenu.previousElementSibling
            .querySelector(".arrow-icon")
            .classList.remove("up");
        });

        // 현재 서브메뉴 열기/닫기
        if (!isOpen) {
          subMenu.classList.add("open");
          arrowIcon.classList.add("up");
        }
      });
    }
  });
});

// 헤더가 완전히 삽입된 후에만 언어 드롭다운 JS 실행
function waitAndSetupLanguageDropdown() {
  const languageSelector = document.querySelector("header .language");
  if (languageSelector) {
    setupLanguageDropdown();
  } else {
    setTimeout(waitAndSetupLanguageDropdown, 100);
  }
}

document.addEventListener("DOMContentLoaded", waitAndSetupLanguageDropdown);
