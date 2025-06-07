// 입력 필드 초기화 함수
function initializeInputFields() {
  // 상태별 클래스명
  const states = ['default', 'hover', 'focus', 'typing', 'filled', 'disable'];

  // 모든 입력 필드 직접 찾기
  const allInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="search"], textarea, select');
  console.log(`[Input] 전체 입력 필드 수:`, allInputs.length);

  allInputs.forEach($el => {
    const $wrap = $el.closest('.input');
    if (!$wrap) {
      console.log(`[Input] .input 래퍼를 찾을 수 없음 for:`, $el.type, $el.id);
      return;
    }

    // 입력 타입에 따른 기본 클래스 결정
    let base = 'input-text';
    if ($el.type === 'search') base = 'input-search';
    else if ($el.tagName.toLowerCase() === 'textarea') base = 'input-memo';
    else if ($el.tagName.toLowerCase() === 'select') base = 'input-dropdown';
    
    console.log(`[Input] 초기화 중: ${$el.type} type, id: ${$el.id || 'no-id'}, base: ${base}`);

    // 에러 메시지 요소 생성 (기존 것이 없을 때만)
    let errorMessage = $wrap.querySelector('.error-message');
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      $wrap.appendChild(errorMessage);
    }

    // 클린(X) 버튼 생성 및 개선 (input, search, memo만)
    let clearBtn = $wrap.querySelector('.input-clear, .clear-button');
    if (base !== 'input-dropdown' && !clearBtn) {
      clearBtn = document.createElement('button');
      clearBtn.type = 'button';
      clearBtn.className = 'input-clear clear-button';
      clearBtn.tabIndex = 0;
      clearBtn.setAttribute('aria-label', '입력값 삭제');
      clearBtn.setAttribute('title', '내용 지우기');
      $wrap.appendChild(clearBtn);

      // 클릭 이벤트 - 개선된 버전
      clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // 입력 내용 삭제
        $el.value = '';
        
        // 입력 이벤트 트리거 (다른 스크립트에서 감지할 수 있도록)
        const inputEvent = new Event('input', { bubbles: true });
        $el.dispatchEvent(inputEvent);
        const changeEvent = new Event('change', { bubbles: true });
        $el.dispatchEvent(changeEvent);

        // 포커스 유지
        $el.focus();
        
        // 상태 업데이트
        $wrap.classList.remove('input-has-value');
        clearBtn.style.display = 'none';
        hideError();
        setState('focus');
        
        console.log('[Input] 입력 내용이 삭제됨:', $el.id || $el.name || 'unnamed input');
      });

      // 마우스 이벤트 처리
      clearBtn.addEventListener('mousedown', function(e) {
        e.preventDefault();
      });

      // 호버 효과 개선
      clearBtn.addEventListener('mouseenter', function() {
        if ($wrap.classList.contains('input-has-value')) {
          clearBtn.style.display = 'block';
        }
      });

      clearBtn.addEventListener('mouseleave', function() {
        if (!$el.matches(':focus') && !$el.value.trim()) {
          clearBtn.style.display = 'none';
        }
      });
    }

    // 유효성 검사 함수들
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function validatePhone(phone) {
      // 한국 전화번호 형식 검증 (010-1234-5678, 01012345678 등)
      const phoneRegex = /^(010|011|016|017|018|019)-?[0-9]{3,4}-?[0-9]{4}$/;
      return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function showError(message) {
      if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        console.log('[Input] 에러 메시지 표시:', message, 'for element:', $el.id || $el.name);
      } else {
        console.error('[Input] 에러 메시지 요소를 찾을 수 없음');
      }
    }

    function hideError() {
      if (errorMessage) {
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';
      }
    }

    function validateInput() {
      const value = $el.value.trim();
      const inputType = $el.type;
      const isRequired = $el.hasAttribute('required');

      // 빈 값 체크
      if (isRequired && !value) {
        showError('필수 입력 항목입니다.');
        return false;
      }

      // 값이 있을 때만 형식 검증
      if (value) {
        switch (inputType) {
          case 'email':
            if (!validateEmail(value)) {
              showError('올바른 이메일 형식으로 입력해주세요.');
              return false;
            }
            break;
          case 'tel':
            if (!validatePhone(value)) {
              showError('올바른 전화번호 형식으로 입력해주세요.');
              return false;
            }
            break;
          case 'text':
            // 이름 필드 검증 (특수문자 제한)
            if ($el.id === 'name' && value.length < 2) {
              showError('이름은 2글자 이상 입력해주세요.');
              return false;
            }
            break;
        }
      }

      hideError();
      return true;
    }

    // 상태 클래스 초기화 함수 - group.base 오류 수정
    function setState(state) {
      states.forEach(s => $wrap.classList.remove(`${base}-${s}`));
      $wrap.classList.add(`${base}-${state}`);
    }

    // disable 상태
    function checkDisable() {
      if ($el.disabled) {
        setState('disable');
        if (clearBtn) clearBtn.style.display = 'none';
        $wrap.classList.remove('input-has-value');
        return true;
      }
      return false;
    }

    // filled 상태 - 개선된 X 버튼 표시 로직
    function checkFilled() {
      const hasValue = $el.value && $el.value.trim().length > 0;
      const isFocused = $el.matches(':focus');
      
      if (hasValue) {
        setState('filled');
        $wrap.classList.add('input-has-value');
        
        // X 버튼 표시 조건: 값이 있고 (포커스 상태이거나 호버 상태)
        if (clearBtn) {
          if (isFocused) {
            clearBtn.style.display = 'block';
          } else {
            clearBtn.style.display = 'none';
          }
        }
        return true;
      } else {
        $wrap.classList.remove('input-has-value');
        if (clearBtn) clearBtn.style.display = 'none';
      }
      return false;
    }

    // default 상태
    function setDefault() {
      setState('default');
      $wrap.classList.remove('input-has-value');
      if (clearBtn) clearBtn.style.display = 'none';
    }

    // hover
    $el.addEventListener('mouseenter', function () {
      if (checkDisable()) return;
      setState('hover');
    });
    $el.addEventListener('mouseleave', function () {
      if (checkDisable()) return;
      if ($el === document.activeElement) {
        setState('focus');
      } else if (checkFilled()) {
        setState('filled');
      } else {
        setDefault();
      }
    });

    // focus/blur - 개선된 X 버튼 처리
    $el.addEventListener('focus', function () {
      if (checkDisable()) return;
      setState('focus');
      
      // 포커스 시 값이 있으면 X 버튼 표시
      if ($el.value && $el.value.trim().length > 0) {
        $wrap.classList.add('input-has-value');
        if (clearBtn) clearBtn.style.display = 'block';
      }
      
      checkFilled();
    });
    
    $el.addEventListener('blur', function () {
      if (checkDisable()) return;
      
      // 값이 있을 때만 유효성 검사 실행
      if ($el.value.trim()) {
        validateInput();
      } else {
        hideError();
      }
      
      // 블러 시 X 버튼 숨기기 (단, 호버 상태가 아닐 때만)
      setTimeout(() => {
        if (clearBtn && !clearBtn.matches(':hover')) {
          if (checkFilled()) {
            setState('filled');
            clearBtn.style.display = 'none';
          } else {
            setDefault();
          }
        }
      }, 100);
    });

    // typing - 개선된 실시간 X 버튼 표시
    $el.addEventListener('input', function () {
      if (checkDisable()) return;
      
      const hasValue = $el.value && $el.value.trim().length > 0;
      const isFocused = $el.matches(':focus');
      
      // 타이핑 중에는 에러 메시지 숨기기
      hideError();
      
      if (hasValue) {
        setState('typing');
        $wrap.classList.add('input-has-value');
        
        // 입력 중이고 포커스 상태일 때만 X 버튼 표시
        if (clearBtn && isFocused) {
          clearBtn.style.display = 'block';
        }
      } else {
        setState('focus');
        $wrap.classList.remove('input-has-value');
        if (clearBtn) clearBtn.style.display = 'none';
      }
    });
    $el.addEventListener('change', function () {
      if (checkDisable()) return;
      if (checkFilled()) {
        setState('filled');
      } else {
        setDefault();
      }
    });

    // disable 속성 변화 감지 (MutationObserver)
    const observer = new MutationObserver(() => {
      if (checkDisable()) return;
      if ($el === document.activeElement) {
        setState('focus');
      } else if (checkFilled()) {
        setState('filled');
      } else {
        setDefault();
      }
    });
    observer.observe($el, { attributes: true, attributeFilter: ['disabled'] });

    // 초기 상태 적용
    if (checkDisable()) return;
    if ($el === document.activeElement) {
      setState('focus');
      checkFilled();
    } else if (checkFilled()) {
      setState('filled');
    } else {
      setDefault();
    }
  });
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', initializeInputFields);

// 탭 컨텐츠 로드 후 재초기화
document.addEventListener('tabContentLoaded', () => {
  console.log('[Input] 탭 컨텐츠 로드됨, 입력 필드 재초기화');
  initializeInputFields();
});

// 모든 컴포넌트 로드 후 재초기화
document.addEventListener('allComponentsLoaded', () => {
  console.log('[Input] 모든 컴포넌트 로드됨, 입력 필드 초기화');
  initializeInputFields();
});

// 폼 전체 유효성 검사 함수
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    const wrapper = input.closest('.input');
    if (wrapper) {
      // 각 입력 필드의 validateInput 함수 호출
      const errorMessage = wrapper.querySelector('.error-message');
      if (errorMessage && input.value.trim()) {
        // blur 이벤트 트리거하여 개별 유효성 검사 실행
        input.dispatchEvent(new FocusEvent('blur'));
        
        // 에러 메시지가 표시되어 있으면 유효하지 않음
        if (errorMessage.classList.contains('show')) {
          isValid = false;
        }
      }
    }
  });
  
  return isValid;
}

// 외부에서 호출할 수 있도록 전역 함수로 등록
window.initializeInputFields = initializeInputFields;
window.validateForm = validateForm;

console.log('[Input] Input Field Manager 초기화 완료');