/**
 * 솔루션 및 지원 페이지 통합 JS
 * 모든 solution 페이지와 support 페이지의 공통 기능 및 개별 기능 관리
 */

// 솔루션 페이지 설정
const SOLUTION_PAGES = {
  'solution-01-dfas-pro': {
    id: 'dfas-pro',
    mainTab: 'dfas',
    text: 'DFAS Pro',
    href: '/html/page/solution-01-dfas-pro.html'
  },
  'solution-02-dfas-ent': {
    id: 'dfas-enterprise',
    mainTab: 'dfas',
    text: 'DFAS Enterprise',
    href: '/html/page/solution-02-dfas-ent.html'
  },
  'solution-03-mcq-p': {
    id: 'mcq-p',
    mainTab: 'mcq',
    text: 'M-SecuManager P',
    href: '/html/page/solution-03-mcq-p.html'
  },
  'solution-04-mcq-s': {
    id: 'mcq-s',
    mainTab: 'mcq',
    text: 'M-SecuManager S',
    href: '/html/page/solution-04-mcq-s.html'
  },
  'solution-05-mcq-g': {
    id: 'mcq-g',
    mainTab: 'mcq',
    text: 'M-SecuManager G',
    href: '/html/page/solution-05-mcq-g.html'
  },
  'solution-06-gm': {
    id: 'gm',
    mainTab: 'gm',
    text: 'Gate Manager',
    href: '/html/page/solution-06-gm.html'
  },
  'solution-07-gm-pro': {
    id: 'gm-pro',
    mainTab: 'gm',
    text: 'Gate Manager Pro',
    href: '/html/page/solution-07-gm-pro.html'
  }
};

// 지원 페이지 설정
const SUPPORT_PAGES = {
  'support-01-inquiry': {
    id: 'inquiry',
    text: '문의하기',
    href: '/html/page/support-01-inquiry.html'
  },
  'support-02-news': {
    id: 'news',
    text: '유락소식',
    href: '/html/page/support-02-news.html'
  }
};

// 솔루션 탭 설정 생성
function createSolutionTabConfig() {
  const currentPath = window.location.pathname;
  let activeMainTab = 'dfas';
  let activeSubTab = null;

  // 현재 페이지에 따른 활성 탭 결정
  Object.entries(SOLUTION_PAGES).forEach(([pageKey, pageInfo]) => {
    if (currentPath.includes(pageKey) || currentPath.includes(pageInfo.id)) {
      activeMainTab = pageInfo.mainTab;
      activeSubTab = pageInfo.id;
    }
  });

  // activeSubTab이 설정되지 않은 경우 각 메인탭의 기본값 설정
  if (!activeSubTab) {
    switch (activeMainTab) {
      case 'dfas':
        activeSubTab = 'dfas-pro';
        break;
      case 'mcq':
        activeSubTab = 'mcq-p';
        break;
      case 'gm':
        activeSubTab = 'gm';
        break;
      default:
        activeSubTab = 'dfas-pro'; // 전체 기본값
    }
    console.log(`[Solution] 기본 서브탭 설정: ${activeMainTab} -> ${activeSubTab}`);
  }

  // 탭 설정 구성
  const mainTabs = [
    { id: 'dfas', text: 'DFAS', isActive: activeMainTab === 'dfas' },
    { id: 'mcq', text: 'MCQ', isActive: activeMainTab === 'mcq' },
    { id: 'gm', text: 'Gate Manager', isActive: activeMainTab === 'gm' }
  ];

  const subTabs = {
    dfas: [
      { id: 'dfas-pro', text: 'DFAS Pro', isActive: activeSubTab === 'dfas-pro' },
      { id: 'dfas-enterprise', text: 'DFAS Enterprise', isActive: activeSubTab === 'dfas-enterprise' }
    ],
    mcq: [
      { id: 'mcq-p', text: 'M-SecuManager P', isActive: activeSubTab === 'mcq-p' || (activeMainTab === 'mcq' && !activeSubTab) },
      { id: 'mcq-s', text: 'M-SecuManager S', isActive: activeSubTab === 'mcq-s' },
      { id: 'mcq-g', text: 'M-SecuManager G', isActive: activeSubTab === 'mcq-g' }
    ],
    gm: [
      { id: 'gm', text: 'Gate Manager', isActive: activeSubTab === 'gm' },
      { id: 'gm-pro', text: 'Gate Manager Pro', isActive: activeSubTab === 'gm-pro' }
    ]
  };

  return { mainTabs, subTabs };
}

// 지원 페이지 탭 설정 생성
function createSupportTabConfig() {
  const currentPath = window.location.pathname;

  let activeMainTab = 'inquiry'; // 기본값
  if (currentPath.includes('support-02-news')) {
    activeMainTab = 'news';
  }

  const mainTabs = [
    {
      id: 'inquiry',
      text: '문의하기',
      isActive: activeMainTab === 'inquiry'
    },
    {
      id: 'news',
      text: '유락소식',
      isActive: activeMainTab === 'news'
    }
  ];

  const subTabs = {
    inquiry: [],
    news: []
  };

  return { mainTabs, subTabs };
}


// 공통 버튼 이벤트 설정
function setupCommonButtons() {
  // 솔루션 문의하기 버튼
  const inquiryButtons = document.querySelectorAll('.btn-solution, .btn .button');
  inquiryButtons.forEach(button => {
    if (!button.dataset.eventAttached) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = '/html/page/support-01-inquiry.html';
      });
      button.dataset.eventAttached = 'true';
    }
  });

  // 소개 자료 보기 버튼
  const introButtons = document.querySelectorAll('.btn-introduction');
  introButtons.forEach(button => {
    if (!button.dataset.eventAttached) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('소개 자료 보기 버튼 클릭됨');
        // 소개 자료 다운로드 또는 표시 로직 추가 가능
      });
      button.dataset.eventAttached = 'true';
    }
  });
}

// 현재 페이지 타입 감지 (개선된 버전)
function getCurrentPageType() {
  const currentPath = window.location.pathname;
  console.log('[Solution] 현재 경로:', currentPath);

  const currentPageName = currentPath.split('/').pop().replace('.html', '');
  console.log('[Solution] 현재 파일명:', currentPageName);

  // 솔루션 페이지 확인
  const solutionPageType = Object.keys(SOLUTION_PAGES).find(pageKey => {
    return currentPageName === pageKey || currentPageName === SOLUTION_PAGES[pageKey].id;
  });

  if (solutionPageType) {
    console.log(`[Solution] 솔루션 페이지 타입 감지됨: ${solutionPageType}`);
    return { type: 'solution', page: solutionPageType };
  }

  // 지원 페이지 확인
  const supportPageType = Object.keys(SUPPORT_PAGES).find(pageKey => {
    return currentPageName === pageKey;
  });

  if (supportPageType) {
    console.log(`[Solution] 지원 페이지 타입 감지됨: ${supportPageType}`);
    return { type: 'support', page: supportPageType };
  }

  // 서비스 페이지 확인
  if (currentPageName === 'service-01-analysis') {
    console.log('[Solution] 서비스 페이지 타입 감지됨: service-01-analysis');
    return { type: 'service', page: 'service-01-analysis' };
  }

  console.log('[Solution] 알 수 없는 페이지 타입');
  return null;
}

// 문의하기 페이지 초기화
function initSupportInquiry() {
  console.log('[Support] 문의하기 페이지 초기화');

  // 페이지네이션 초기화
  initInquiryPagination();

  // 문의 등록 폼 초기화
  initInquiryForm();

  console.log('[Support] 문의하기 페이지 초기화 완료');
}

// 뉴스 페이지 초기화
function initSupportNews() {
  console.log('[Support] 뉴스 페이지 초기화');

  // 검색 기능 초기화
  initSearchFunction();

  // 필터 기능 초기화
  initFilterFunction();

  // 페이지네이션 초기화
  initNewsPagination();

  console.log('[Support] 뉴스 페이지 초기화 완료');
}

// 문의하기 페이지네이션
function initInquiryPagination() {
  const pagination = document.querySelector('.pagination');

  // 페이지네이션 요소가 존재하는지 확인
  if (!pagination) {
    console.log('페이지네이션 요소를 찾을 수 없습니다.');
    return;
  }

  const links = pagination.querySelectorAll('.pagination__link');
  const prevBtn = pagination.querySelector('.pagination__prev');
  const nextBtn = pagination.querySelector('.pagination__next');

  let currentPage = 1;
  const totalPages = 20;

  // 초기 페이지 활성화 설정
  function initializeActivePage() {
    // 첫 번째 페이지 링크를 기본적으로 활성화
    const firstPageLink = document.querySelector('.pagination__link');
    if (firstPageLink) {
      firstPageLink.classList.add('active');
    }
  }

  // 페이지 링크 클릭 이벤트
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // 현재 활성 페이지 제거
      const currentActiveLink = document.querySelector('.pagination__link.active');
      if (currentActiveLink) {
        currentActiveLink.classList.remove('active');
      }

      // 클릭된 페이지 활성화
      e.target.classList.add('active');
      currentPage = parseInt(e.target.textContent);

      // 페이지 변경 로직 (예: 데이터 로딩)
      loadPageData(currentPage);
    });
  });

  // 이전 페이지 버튼
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
      }
    });
  }

  // 다음 페이지 버튼
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
      }
    });
  }

  // 페이지네이션 상태 업데이트
  function updatePagination() {
    // 현재 활성 페이지 링크 제거
    const currentActiveLink = document.querySelector('.pagination__link.active');
    if (currentActiveLink) {
      currentActiveLink.classList.remove('active');
    }

    // 새로운 현재 페이지 활성화
    const newCurrentLink = document.querySelector(`.pagination__link:nth-child(${currentPage})`);
    if (newCurrentLink) {
      newCurrentLink.classList.add('active');
    }

    // 페이지 데이터 로딩
    loadPageData(currentPage);
  }

  // 페이지 데이터 로딩 함수 (예시)
  function loadPageData(page) {
    console.log(`페이지 ${page} 데이터 로딩`);
    // 여기에 실제 데이터 로딩 로직 구현
  }

  // 초기 페이지 설정
  initializeActivePage();
}

// 문의 등록 폼 초기화
function initInquiryForm() {
  // jQuery가 로드되지 않은 경우 경고 메시지 출력
  if (typeof $ === 'undefined') {
    console.warn('jQuery가 로드되지 않았습니다. 일부 기능이 제한될 수 있습니다.');
    return;
  }

  var prev_first = '선택하세요';
  var prev_second = '선택하세요';
  var prev_third = '선택하세요';
  var isChanged = false;

  $(".tab-inquiry").on('click', function () {
    // Potential tab-related functionality can be added here
  });

  $("select[name='inquiry-type']").on(
    'mousedown', function () {
      prev_first = $(this).val();
    }
  ).change(function () {
    var selectedValue = $(this).val();

    $(".selt002").prop('disabled', false);
    var secondSelect = $("select[name='second']");
    var thirdSelect = $("select[name='third']");

    prev_second = secondSelect.val();
    prev_third = thirdSelect.val();

    secondSelect.children().remove();
    secondSelect.append('<option value="선택하세요">선택하세요</option>');
    thirdSelect.children().remove();
    thirdSelect.append('<option value="선택하세요">선택하세요</option>');

    // 변화 감지
    if (prev_first != selectedValue) {
      isChanged = true;
      if ((prev_first == '기술지원') || (selectedValue == '기술지원' && prev_first != '선택하세요')) {
        isChanged = confirm('문의유형을 변경하면 초기화될 수 있습니다.\n변경하시겠습니까?');
        if (isChanged) {
          $('#details').summernote('code', '');
        }
        else {
          $(this).val(prev_first);
          selectedValue = $(this).val();
        }
      }
    }
    else {
      isChanged = false;
    }

    if (selectedValue == '선택하세요') {
      $('.sol-tr').show();
      $(".selt002, .selt003").show().prop('disabled', true);
    }

    if (selectedValue == '솔루션 문의') {
      $('.sol-tr').show();
      $(".selt002").show().prop('disabled', false);
      $(".selt003").show().prop('disabled', true);
      secondSelect.append('<option value="휴대폰 안심 지우개">휴대폰 안심 지우개</option>');
      secondSelect.append('<option value="디지털포렌식">디지털포렌식</option>');
      secondSelect.append('<option value="보안 통제 시스템">보안 통제 시스템</option>');
      secondSelect.append('<option value="업무 지원 시스템">업무 지원 시스템</option>');
    }

    if (selectedValue == '기술지원') {
      $('.sol-tr').show();
      $(".selt002").show().prop('disabled', false);
      $(".selt003").show().prop('disabled', true);
      secondSelect.append('<option value="휴대폰 안심 지우개">휴대폰 안심 지우개</option>');
      secondSelect.append('<option value="디지털포렌식">디지털포렌식</option>');
      secondSelect.append('<option value="보안 통제 시스템">보안 통제 시스템</option>');
      secondSelect.append('<option value="업무 지원 시스템">업무 지원 시스템</option>');

      if (prev_first != '기술지원') {
        $('#details').summernote('code',
          '<p><b>[제품정보]</b></p><p><b>제품버전</b> :</p><p><b>사용 환경</b> : (OS, Memory, File System, 보안 프로그램 설치유무 등)</p><br/><br/><p><b>자세한 증상</b></p><p>(관련된 기능, 발생 상황 설명, 설정한 옵션, 보안프로그램 설치 유무)</p><br/><br/><br/><p><b>스크린샷</b></p><p>(이미지 삽입)</p>'
        );
      }
    }

    if (selectedValue == '서비스 문의') {
      $('.sol-tr').show();
      $(".selt002").show().prop('disabled', false);
      $(".selt003").show().prop('disabled', true);
      secondSelect.append('<option value="포렌식 컨설팅">포렌식 컨설팅</option>');
      secondSelect.append('<option value="포렌식 교육">포렌식 교육</option>');
      secondSelect.append('<option value="데이터 삭제 센터">데이터 삭제 센터</option>');
    }

    if (selectedValue == '기타 문의') {
      $('.sol-tr').hide();
      $(".selt002, .selt003, .selt004").hide();
      secondSelect.children().remove();
      secondSelect.append('<option value=""></option>');
      thirdSelect.children().remove();
      thirdSelect.append('<option value=""></option>');
    }

    if (!isChanged) {
      secondSelect.val(prev_second);
      secondSelect.trigger('change');
    }
    else {
      secondSelect.val('선택하세요');
    }
  });

  $("select[name='second']").change(function () {
    $(".selt003").prop('disabled', false);
    var thirdSelect = $("select[name='third']");
    var selectedValue = $(this).val();

    thirdSelect.children().remove();
    thirdSelect.append('<option value="선택하세요">선택하세요</option>');

    if (selectedValue == '선택하세요') {
      $(".selt003").show().prop('disabled', true);
    }

    if (selectedValue == '휴대폰 안심 지우개') {
      thirdSelect.append('<option value="M-SecuManager S">M-SecuManager S</option>');
      thirdSelect.append('<option value="M-SecuManager G">M-SecuManager G</option>');
    }

    if (selectedValue == '디지털포렌식') {
      thirdSelect.append('<option value="F-SecuManager">F-SecuManager</option>');
      thirdSelect.append('<option value="DFAS Pro">DFAS Pro</option>');
      thirdSelect.append('<option value="DFAS Enterprise">DFAS Enterprise</option>');
    }

    if (selectedValue == '보안 통제 시스템') {
      thirdSelect.append('<option value="Gate Manager">Gate Manager</option>');
    }

    if (selectedValue == '업무 지원 시스템') {
      thirdSelect.append('<option value="D-Trans">D-Trans</option>');
    }

    if (selectedValue == '포렌식 컨설팅') {
      $(".selt003").show().prop('disabled', false);
      thirdSelect.append('<option value="포렌식 분석 서비스">포렌식 분석 서비스</option>');
      thirdSelect.append('<option value="디지털포렌식 랩 구축">디지털포렌식 랩 구축</option>');
      thirdSelect.append('<option value="국제 표준화 인증">국제 표준화 인증</option>');
    }

    if (selectedValue == '포렌식 교육' || selectedValue == '데이터 삭제 센터') {
      $(".selt003").hide().prop('disabled', true);
      thirdSelect.children().remove();
      thirdSelect.append('<option value=""></option>');
    }

    if (!isChanged) thirdSelect.val(prev_third);
  });

  // 이메일 도메인 선택
  function setEmailDomain(arg) {
    if (arg == "direct") {
      $('#email2').val('');
      $('#email2').show();
    } else {
      $('#email2').val('');
      $('#email2').hide();
    }
  }

  // 문의 등록
  function submitInquiry() {
    // 유효성 검사 로직 (기존 코드와 유사)
    if ($('#email1').val() == "" || $('#email1').val().length < 3) {
      alert("회신받으실 메일주소를 정확히 입력해주세요.");
      $('#email1').focus();
      return;
    }

    // 추가적인 유효성 검사 로직들...

    if (confirm("작성하신 내용을 등록하시겠습니까?")) {
      // AJAX 제출 로직
      $.ajax({
        type: "POST",
        url: "/_ajax/_ajax.regQueProc.php",
        cache: false,
        dataType: "json",
        data: {
          "mode": "regQueCont",
          "inquiry-type": $('#inquiry-type').val(),
          "second": $('.selt002').val(),
          "third": $('.selt003').val(),
          "company": $('#company').val(),
          "name": $('#name').val(),
          "phone": $('#phone').val(),
          "email1": $('#email1').val(),
          "email2": $('#email2').val(),
          "email3": $('#email3').val(),
          "details": encodeURIComponent($('#details').val())
        }
      })
        .done(function (ajaxData) {
          if (ajaxData == "success") {
            alert("정상적으로 등록되었습니다.\n최대한 빠른 답변을 드리도록 하겠습니다.");
            window.location.replace('support_ok.php');
          } else {
            alert("정상적으로 처리되지 않았습니다.\n다시 한번 등록해보시기 바랍니다.\n계속되는 오류 발생시 운영팀에게 문의하시기 바랍니다.");
          }
        })
        .fail(function () {
          alert("정상적으로 처리되지 않았습니다.\n다시 한번 등록해보시기 바랍니다.\n계속되는 오류 발생시 운영팀에게 문의하시기 바랍니다.");
        });
    }
  }

  // 취소
  function resetInquiry() {
    window.location.replace("/kr");
  }

  // 폼 제출 이벤트 핸들러
  $('form').on('submit', function (e) {
    e.preventDefault();
    submitInquiry();
  });
}

// 뉴스 페이지 검색 기능
function initSearchFunction() {
  const searchForm = document.querySelector('.search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const searchInput = document.querySelector('#search-input');
      const searchTerm = searchInput.value.trim();

      if (searchTerm) {
        console.log('[News] 검색어:', searchTerm);
        // 검색 로직 구현
      }
    });
  }
}

// 뉴스 페이지 필터 기능
function initFilterFunction() {
  const tagContainer = document.querySelector('.tag-container');
  if (tagContainer) {
    const tagLinks = tagContainer.querySelectorAll('a');
    tagLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        // 모든 태그에서 active 클래스 제거
        tagLinks.forEach(tag => tag.classList.remove('active'));

        // 클릭된 태그에 active 클래스 추가
        this.classList.add('active');

        const category = this.textContent.trim();
        console.log('[News] 선택된 카테고리:', category);
        // 필터링 로직 구현
      });
    });
  }
}

// 뉴스 페이지 페이지네이션
function initNewsPagination() {
  const paginationLinks = document.querySelectorAll('.pagination__link');
  paginationLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const pageNumber = this.textContent.trim();
      console.log('[News] 페이지 이동:', pageNumber);
      // 페이지네이션 로직 구현
    });
  });
}

// 페이지별 특별 기능 초기화 (안전한 실행)
function initializePageFeatures(pageInfo) {
  if (!pageInfo) {
    console.warn('[Solution] 페이지 정보가 없습니다. 기본 기능만 설정합니다.');

    // 기본 기능들은 항상 설정
    try {
      setupCommonButtons();
    } catch (error) {
      console.error('[Solution] 기본 기능 설정 중 오류:', error);
    }
    return;
  }

  const { type, page } = pageInfo;
  console.log(`[Solution] 페이지 초기화: ${type} - ${page}`);

  // 공통 기능 설정 (안전한 실행)
  try {
    setupCommonButtons();
  } catch (error) {
    console.error('[Solution] 공통 기능 설정 중 오류:', error);
  }

  // 타입별 특별한 기능 초기화
  try {
    if (type === 'solution') {
      // 솔루션 페이지별 초기화
      const solutionInfo = SOLUTION_PAGES[page];
      if (solutionInfo) {
        console.log(`[Solution] ${solutionInfo.text} 페이지 특별 기능 초기화`);
        // 각 솔루션별 특별한 기능이 있다면 여기에 추가
      }
    } else if (type === 'support') {
      // 지원 페이지별 초기화
      if (page === 'support-01-inquiry') {
        initSupportInquiry();
      } else if (page === 'support-02-news') {
        initSupportNews();
      }
    }
  } catch (error) {
    console.error(`[Solution] ${type}-${page} 특별 기능 초기화 중 오류:`, error);
  }
}

// 메인 초기화 함수
function initSolutionPage() {
  console.log('[Solution] 솔루션 및 지원 페이지 스크립트 로드됨');

  // 현재 페이지 타입에 맞는 초기화
  const pageInfo = getCurrentPageType();

  if (pageInfo && pageInfo.type === 'solution') {
    // 솔루션 탭 설정 생성 및 전역 변수 설정
    window.solutionTabConfig = createSolutionTabConfig();
    window.pageTabConfig = window.solutionTabConfig;

    // 레거시 호환성을 위한 활성 탭 정보 저장
    const currentPath = window.location.pathname;
    let activeMainTab = 'dfas';
    let activeSubTab = null;

    Object.entries(SOLUTION_PAGES).forEach(([pageKey, pageData]) => {
      if (currentPath.includes(pageKey) || currentPath.includes(pageData.id)) {
        activeMainTab = pageData.mainTab;
        activeSubTab = pageData.id;
      }
    });

    window.activeSolutionTab = {
      mainTab: activeMainTab,
      subTab: activeSubTab
    };

    console.log(`[Solution] 현재 페이지: ${currentPath}, 활성화 탭: ${activeMainTab} / ${activeSubTab}`);
  } else if (pageInfo && pageInfo.type === 'support') {
    // 지원 페이지 탭 설정 생성 및 전역 변수 설정
    window.pageTabConfig = createSupportTabConfig();
    console.log(`[Support] 현재 페이지: ${window.location.pathname}`);
  }

  // 페이지별 특별 기능 초기화
  initializePageFeatures(pageInfo);
}

// 컴포넌트 모두 로드 후 실행
// allComponentsLoaded 이벤트는 componentManager에서 처리하므로 제거


// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initSolutionPage);

// 전역에서 접근 가능하도록 함수들을 window 객체에 추가
window.initSolutionPage = initSolutionPage;
window.initSupportInquiry = initSupportInquiry;
window.initSupportNews = initSupportNews; 