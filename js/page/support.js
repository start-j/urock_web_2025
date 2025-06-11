// 문의하기 체크박스 활성화/비활성화 함수 (동적으로 폼이 삽입된 후 호출 필요)
export function initSupportCheckboxButton() {
  const wrapper = document.querySelector('.checkbox-wrapper');
  if (!wrapper) return;
  const checkbox = wrapper.querySelector('input[type="checkbox"]');
  const submitButton = document.querySelector('.submit-button');
  if (!checkbox || !submitButton) return;

  // 초기 상태: 체크 안되어 있으면 버튼 비활성화
  submitButton.disabled = !checkbox.checked;
  console.log('버튼 활성화 상태:', !submitButton.disabled); // true: 활성화, false: 비활성화

  function updateButtonState() {
    submitButton.disabled = !checkbox.checked;
    console.log('버튼 활성화 상태:', !submitButton.disabled); // true: 활성화, false: 비활성화
  }

  checkbox.addEventListener('change', updateButtonState);
}

// EmailJS 폼 초기화 함수 (동적으로 폼이 삽입된 후 호출 필요)
export function initEmailJSForm() {
  if (typeof emailjs === 'undefined') {
    console.error('emailjs 라이브러리가 로드되지 않았습니다.');
    return;
  }
  emailjs.init("임시키"); // 실제 Public Key로 변경

  const form = document.querySelector('.contents form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      emailjs.sendForm("service_xxx", "template_xxx", form)
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
}
