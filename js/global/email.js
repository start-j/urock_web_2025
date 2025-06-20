// 문의하기 체크박스 활성화/비활성화 함수 (동적으로 폼이 삽입된 후 호출 필요)
function initSupportCheckboxButton() {
  const checkbox = document.querySelector('.checkbox-wrapper input[type="checkbox"]');
  const label = document.getElementById('checkbox-label');
  const submitButton = document.getElementById('submit');
  if (!checkbox || !label || !submitButton) return;

  // 초기 상태
  submitButton.disabled = !checkbox.checked;

  // change 이벤트에서만 버튼 활성화/비활성화 처리 (체크박스, label 클릭 모두 반영)
  checkbox.addEventListener('change', function () {
    submitButton.disabled = !checkbox.checked;
  });

  // label 클릭 시 버튼 상태 갱신 (브라우저 기본 동작 후 상태 반영)
  label.addEventListener('click', function () {
    setTimeout(() => {
      submitButton.disabled = !checkbox.checked;
    }, 0);
  });
}
window.initSupportCheckboxButton = initSupportCheckboxButton;

// 문의 유형에 따른 옵션 데이터
const inquiryOptions = {
  solution: [
    { value: 'dfas-pro', text: 'DFAS Pro' },
    { value: 'dfas-enterprise', text: 'DFAS Enterprise' },
    { value: 'msecumanager-p', text: 'M-SecuManager P' },
    { value: 'msecumanager-s', text: 'M-SecuManager S' },
    { value: 'msecumanager-g', text: 'M-SecuManager G' },
    { value: 'gate-manager', text: 'Gate Manager' },
    { value: 'gate-manager-pro', text: 'Gate Manager Pro' }
  ],
  technical: [
    { value: 'dfas-pro', text: 'DFAS Pro' },
    { value: 'dfas-enterprise', text: 'DFAS Enterprise' },
    { value: 'msecumanager-p', text: 'M-SecuManager P' },
    { value: 'msecumanager-s', text: 'M-SecuManager S' },
    { value: 'msecumanager-g', text: 'M-SecuManager G' },
    { value: 'gate-manager', text: 'Gate Manager' },
    { value: 'gate-manager-pro', text: 'Gate Manager Pro' }
  ],
  service: [
    { value: 'forensic-analysis', text: '포렌식 분석 서비스' },
    { value: 'international-certification', text: '국제 표준화 인증' },
    { value: 'forensic-education', text: '포렌식 교육' }
  ],
  other: [
    { value: 'other', text: '기타' }
  ]
};

// 문의 유형 선택에 따른 동적 변경 함수
function initInquiryTypeSelection() {
  const type1Select = document.getElementById('inquiry-type-1');
  const type2Select = document.getElementById('inquiry-type-2');

  if (!type1Select || !type2Select) return;

  // 유형 2 select 초기화 함수
  function resetType2Select() {
    type2Select.innerHTML = '<option value="" disabled selected>문의 유형 선택</option>';
  }

  // select 요소의 텍스트 색상 변경 함수
  function updateSelectColor(selectElement) {
    if (selectElement.value) {
      selectElement.style.color = '#FFF';
    } else {
      selectElement.style.color = '';
    }
  }

  // 유형 1 변경 시 이벤트 처리
  type1Select.addEventListener('change', function () {
    const selectedValue = this.value;

    // 유형 1 텍스트 색상 변경
    updateSelectColor(this);

    // 유형 2 초기화
    resetType2Select();

    if (selectedValue === 'other') {
      // 기타 문의 선택 시
      type2Select.disabled = false;
      type2Select.style.opacity = '';
      type2Select.style.cursor = '';

      // 기타 옵션 추가
      inquiryOptions[selectedValue].forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        type2Select.appendChild(optionElement);
      });
    } else if (inquiryOptions[selectedValue]) {
      // 솔루션 문의, 기술지원, 서비스 문의 선택 시
      type2Select.disabled = false;
      type2Select.style.opacity = '';
      type2Select.style.cursor = '';

      // 해당하는 옵션들 추가
      inquiryOptions[selectedValue].forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        type2Select.appendChild(optionElement);
      });
    }
  });

  // 유형 2 변경 시 이벤트 처리
  type2Select.addEventListener('change', function () {
    // 유형 2 텍스트 색상 변경
    updateSelectColor(this);
  });

  // 초기 상태 설정
  type2Select.disabled = true;
}

// EmailJS 폼 초기화 함수 (동적으로 폼이 삽입된 후 호출 필요)
export function initEmailJSForm() {
  if (typeof emailjs === 'undefined') {
    console.error('emailjs 라이브러리가 로드되지 않았습니다.');
    return;
  }
  emailjs.init("1UO_ymkYuv_ECqtLQ");

  const form = document.querySelector('.contents form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      emailjs.sendForm("service_x5ixqcx", "template_1ukblmg", form)
        .then(function () {
          alert("메일이 성공적으로 전송되었습니다!");
          form.reset();
          // 폼 초기화 후 유형 2 select 상태도 초기화
          const type2Select = document.getElementById('inquiry-type-2');
          const type1Select = document.getElementById('inquiry-type-1');
          if (type2Select) {
            type2Select.disabled = true;
            type2Select.style.opacity = '';
            type2Select.style.cursor = '';
            type2Select.style.color = '';
          }
          if (type1Select) {
            type1Select.style.color = '';
          }
        }, function (error) {
          alert("전송 실패: " + JSON.stringify(error));
        });
    });
  }
}

// allComponentsLoaded 이벤트 발생 시 자동으로 함수들 호출
if (typeof window !== 'undefined') {
  document.addEventListener('allComponentsLoaded', () => {
    initSupportCheckboxButton();
    initInquiryTypeSelection();
    initEmailJSForm();
  });

  // DOM이 로드된 후에도 한번 더 실행
  document.addEventListener('DOMContentLoaded', () => {
    initSupportCheckboxButton();
    initInquiryTypeSelection();
    initEmailJSForm();
  });

  // 탭 컨텐츠 로드 시마다 초기화 함수들 실행
  document.addEventListener('tabContentLoaded', () => {
    initSupportCheckboxButton();
    initInquiryTypeSelection();
  });
}
