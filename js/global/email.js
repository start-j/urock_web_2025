// 문의하기 체크박스 활성화/비활성화 함수 (동적으로 폼이 삽입된 후 호출 필요)
function initSupportCheckboxButton() {
  const checkbox = document.querySelector('.checkbox-wrapper input[type="checkbox"]');
  const label = document.getElementById('checkbox-label');
  const submitButton = document.getElementById('submit');
  if (!checkbox || !label || !submitButton) return;

  // 초기 상태
  submitButton.disabled = !checkbox.checked;

  // change 이벤트에서만 버튼 활성화/비활성화 처리 (체크박스, label 클릭 모두 반영)
  checkbox.addEventListener('change', function() {
    submitButton.disabled = !checkbox.checked;
  });

  // label 클릭 시 버튼 상태 갱신 (브라우저 기본 동작 후 상태 반영)
  label.addEventListener('click', function() {
    setTimeout(() => {
      submitButton.disabled = !checkbox.checked;
    }, 0);
  });
}
window.initSupportCheckboxButton = initSupportCheckboxButton;

// EmailJS 폼 초기화 함수 (동적으로 폼이 삽입된 후 호출 필요)
export function initEmailJSForm() {
  if (typeof emailjs === 'undefined') {
    console.error('emailjs 라이브러리가 로드되지 않았습니다.');
    return;
  }
  emailjs.init("1UO_ymkYuv_ECqtLQ"); // 실제 Public Key로 변경

  const form = document.querySelector('.contents form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      emailjs.sendForm("service_x5ixqcx", "template_1ukblmg", form)
        .then(function () {
          alert("메일이 성공적으로 전송되었습니다!");
          form.reset();
        }, function (error) {
          alert("전송 실패: " + JSON.stringify(error));
        });
    });
  }
}

// allComponentsLoaded 이벤트 발생 시 자동으로 두 함수 호출
if (typeof window !== 'undefined') {
  document.addEventListener('allComponentsLoaded', () => {
    initSupportCheckboxButton();
    initEmailJSForm();
  });

  // DOM이 로드된 후에도 한번 더 실행
  document.addEventListener('DOMContentLoaded', () => {
    initSupportCheckboxButton();
    initEmailJSForm();
  });

  // 탭 컨텐츠 로드 시마다 체크박스-버튼 활성화 함수 실행
  document.addEventListener('tabContentLoaded', () => {
    initSupportCheckboxButton();
  });
}
