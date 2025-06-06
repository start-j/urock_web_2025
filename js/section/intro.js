// intro.js
// CSS 린터 오류 무시 (JavaScript 파일임)
/* eslint-disable */

// 페이지별 breadcrumb 데이터 매핑
const breadcrumbMap = {
  // 실제 URL 기반 경로
  "/company.html": ["홈", "회사소개"],
  "/service-01-analysis.html": ["홈", "서비스", "포렌식 분석 서비스"],
  "/service-02-authentication.html": ["홈", "서비스", "국제 표준화 인증"],
  "/service-03-education.html": ["홈", "서비스", "포렌식 교육"],
  "/solution-01-dfas-pro.html": ["홈", "솔루션", "DFAS Pro"],
  "/solution-02-dfas-ent.html": ["홈", "솔루션", "DFAS Enterprise"],
  "/solution-03-mcq-p.html": ["홈", "솔루션", "M-SecuManager P"],
  "/solution-04-mcq-s.html": ["홈", "솔루션", "M-SecuManager S"],
  "/solution-05-mcq-g.html": ["홈", "솔루션", "M-SecuManager G"],
  "/solution-06-gm.html": ["홈", "솔루션", "Gate Manager"],
  "/solution-07-gm-pro.html": ["홈", "솔루션", "Gate Manager Pro"],
  "/support-01-inquiry.html": ["홈", "고객지원", "문의하기"],
  "/support-02-news.html": ["홈", "고객지원", "유락소식"],

  // 기존 경로
  "/html/page/company.html": ["홈", "회사소개"],
  "/html/page/service-01-analysis.html": ["홈", "서비스", "포렌식 분석 서비스"],
  "/html/page/service-02-authentication.html": ["홈", "서비스", "국제 표준화 인증"],
  "/html/page/service-03-education.html": ["홈", "서비스", "포렌식 교육"],
  "/html/page/solution-01-dfas-pro.html": ["홈", "솔루션", "DFAS Pro"],
  "/html/page/solution-02-dfas-ent.html": ["홈", "솔루션", "DFAS Enterprise"],
  "/html/page/solution-03-mcq-p.html": ["홈", "솔루션", "M-SecuManager P"],
  "/html/page/solution-04-mcq-s.html": ["홈", "솔루션", "M-SecuManager S"],
  "/html/page/solution-05-mcq-g.html": ["홈", "솔루션", "M-SecuManager G"],
  "/html/page/solution-06-gm.html": ["홈", "솔루션", "Gate Manager"],
  "/html/page/solution-07-gm-pro.html": ["홈", "솔루션", "Gate Manager Pro"],
  "/html/page/support-01-inquiry.html": ["홈", "고객지원", "문의하기"],
  "/html/page/support-02-news.html": ["홈", "고객지원", "유락소식"],

  // 파일명만으로 매핑 (URL 구조가 다양할 경우 대비)
  "company.html": ["홈", "회사소개"],
  "service-01-analysis.html": ["홈", "서비스", "포렌식 분석 서비스"],
  "service-02-authentication.html": ["홈", "서비스", "국제 표준화 인증"],
  "service-03-education.html": ["홈", "서비스", "포렌식 교육"],
  "solution-01-dfas-pro.html": ["홈", "솔루션", "DFAS Pro"],
  "solution-02-dfas-ent.html": ["홈", "솔루션", "DFAS Enterprise"],
  "solution-03-mcq-p.html": ["홈", "솔루션", "M-SecuManager P"],
  "solution-04-mcq-s.html": ["홈", "솔루션", "M-SecuManager S"],
  "solution-05-mcq-g.html": ["홈", "솔루션", "M-SecuManager G"],
  "solution-06-gm.html": ["홈", "솔루션", "Gate Manager"],
  "solution-07-gm-pro.html": ["홈", "솔루션", "Gate Manager Pro"],
  "support-01-inquiry.html": ["홈", "고객지원", "문의하기"],
  "support-02-news.html": ["홈", "고객지원", "유락소식"]
};

// 파일명만 추출하는 함수
function getPageFileName(path) {
  const pathParts = path.split('/');
  return pathParts[pathParts.length - 1];
}

// 회사소개 페이지 애니메이션 기능
function initCompanyAnimations() {
  // 회사소개 페이지에서만 실행되도록 조건 추가
  if (window.location.pathname.includes('intro') || window.location.pathname.includes('company')) {
    console.log('[Intro] 회사소개 페이지 애니메이션 초기화');

    // 애니메이션 효과
    const sections = document.querySelectorAll('.intro-section');

    // Intersection Observer를 사용한 스크롤 애니메이션
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      sections.forEach(section => {
        observer.observe(section);
      });
    }

    // 카운터 애니메이션
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2초
      const increment = target / (duration / 16); // 60fps 기준
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      // 요소가 화면에 보일 때 카운터 시작
      if (window.IntersectionObserver) {
        const counterObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              counterObserver.unobserve(entry.target);
            }
          });
        });
        counterObserver.observe(counter);
      } else {
        updateCounter();
      }
    });

    console.log('[Intro] 회사소개 페이지 애니메이션 초기화 완료');
  }
}

function runIntroComponent() {
  console.log("[Intro] 컴포넌트 실행 중...");

  // 타이틀과 설명 자동 삽입
  document.querySelectorAll('.txt-group').forEach(el => {
    const title = el.dataset.title;
    const desc = el.dataset.desc;
    console.log(`[Intro] 데이터 속성: title=${title}, desc=${desc}`);
    if (title) el.querySelector('.tit').textContent = title;
    if (desc) el.querySelector('.des').textContent = desc;
  });

  // 현재 경로에 맞는 breadcrumb 데이터 선택
  const currentPath = location.pathname;
  const currentFileName = getPageFileName(currentPath);

  console.log(`[Intro] 현재 경로: ${currentPath}, 파일명: ${currentFileName}`);

  // breadcrumbMap에서 일치하는 파일명 찾기
  let breadcrumbData = null;

  // 전체 경로로 먼저 시도
  if (breadcrumbMap[currentPath]) {
    breadcrumbData = breadcrumbMap[currentPath];
    console.log(`[Intro] 전체 경로로 breadcrumb 데이터 찾음: ${breadcrumbData}`);
  }
  // 파일명으로 찾기
  else {
    // 모든 매핑을 순회하면서 파일명 매칭
    for (const path in breadcrumbMap) {
      const pathFileName = getPageFileName(path);
      // 파일명이 같으면 매핑
      if (pathFileName === currentFileName) {
        breadcrumbData = breadcrumbMap[path];
        console.log(`[Intro] 파일명으로 breadcrumb 데이터 찾음: ${breadcrumbData} (경로: ${path})`);
        break;
      }
      // 파일명이 현재 URL에 포함되어 있으면 매핑
      else if (currentPath.includes(pathFileName)) {
        breadcrumbData = breadcrumbMap[path];
        console.log(`[Intro] URL 포함 방식으로 breadcrumb 데이터 찾음: ${breadcrumbData} (경로: ${path})`);
        break;
      }
    }

    // 파일명만으로 직접 매핑 시도
    if (!breadcrumbData && breadcrumbMap[currentFileName]) {
      breadcrumbData = breadcrumbMap[currentFileName];
      console.log(`[Intro] 파일명 직접 매핑으로 breadcrumb 데이터 찾음: ${breadcrumbData}`);
    }
  }

  const $breadcrumb = document.querySelector(".breadcrumb .breadcrumb-item");

  if ($breadcrumb && Array.isArray(breadcrumbData) && breadcrumbData.length) {
    console.log(`[Intro] breadcrumb 생성 시작: ${JSON.stringify(breadcrumbData)}`);
    $breadcrumb.innerHTML = ""; // 기존 내용 초기화

    // 각 breadcrumb 항목 생성 및 추가
    breadcrumbData.forEach((text, i) => {
      if (i === 0) {
        // 홈 아이콘 + 텍스트
        const iconWrap = document.createElement("div");
        iconWrap.className = "breadcrumb-icon";
        iconWrap.innerHTML = `
          <a href="/">
            <img class="home-icon" src="/public/icons/icon_home.svg" />
            <div class="depth-1">${text}</div>
          </a>
        `;
        $breadcrumb.appendChild(iconWrap);
      } else {
        // 화살표 아이콘
        const arrow = document.createElement("img");
        arrow.src = "/public/icons/icon_arrow.svg";
        arrow.className = "arrow-icon";
        $breadcrumb.appendChild(arrow);

        // 텍스트
        const depthDiv = document.createElement("div");
        depthDiv.className = `depth-${i + 1}`;
        depthDiv.textContent = text;
        $breadcrumb.appendChild(depthDiv);
      }
    });

    // CSS에서 fit-content로 처리하므로 JavaScript에서 너비 계산 제거
    console.log("[Intro] breadcrumb 생성 완료");
  } else {
    console.warn(`[Intro] 오류: breadcrumb 데이터를 찾지 못했거나 요소가 없습니다. 경로: ${currentPath}, 파일: ${currentFileName}`);
    if (!$breadcrumb) {
      console.warn("[Intro] 오류: breadcrumb 요소(.breadcrumb .breadcrumb-item)를 찾을 수 없습니다");
    } else if (!breadcrumbData) {
      console.warn("[Intro] 오류: URL에 맞는 breadcrumb 데이터를 찾을 수 없습니다.");
      // 디버깅을 위한 경로 출력
      console.log("[Intro] 사용 가능한 경로 키:", Object.keys(breadcrumbMap));
    }
  }
}

// 문서 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function () {
  console.log("DOMContentLoaded 이벤트 발생");
  initIntroComponent();
  // 회사소개 페이지 애니메이션 초기화
  initCompanyAnimations();
});

// 컴포넌트 초기화 함수
function initIntroComponent() {
  // 먼저 요소가 있는지 확인
  const breadcrumbItem = document.querySelector('.breadcrumb .breadcrumb-item');

  if (breadcrumbItem) {
    console.log("breadcrumb 요소 찾음, 컴포넌트 초기화");
    runIntroComponent();
  } else {
    // include.js가 요소를 추가할 때까지 대기
    console.log("breadcrumb 요소 대기 중... polling 시작");
    waitForIntroComponent();
  }
}

// 요소가 DOM에 추가될 때까지 대기
function waitForIntroComponent() {
  const breadcrumbItem = document.querySelector('.breadcrumb .breadcrumb-item');
  if (breadcrumbItem) {
    console.log("breadcrumb 요소 발견, 컴포넌트 실행");
    runIntroComponent();
  } else {
    console.log("breadcrumb 요소 로딩 대기 중...");
    setTimeout(waitForIntroComponent, 100);
  }
}

// 전역에서 접근 가능하도록 window 객체에 함수 추가
window.initIntroComponent = initIntroComponent;



