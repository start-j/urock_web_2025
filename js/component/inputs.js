// 입력 필드 초기화 함수
function initializeInputFields() {
  // 상태별 클래스명
  const states = ['default', 'hover', 'focus', 'typing', 'filled', 'disable'];

  // input 그룹별 처리
  const inputGroups = [
    { selector: '.input-text', input: 'input[type="text"]', base: 'input-text' },
    { selector: '.input-search', input: 'input[type="search"]', base: 'input-search' },
    { selector: '.input-memo', input: 'textarea', base: 'input-memo' },
    { selector: '.input-dropdown', input: 'select', base: 'input-dropdown' },
  ];

  inputGroups.forEach(group => {
    document.querySelectorAll(group.selector).forEach($wrap => {
      const $el = $wrap.querySelector(group.input);
      if (!$el) return;

      // 클린(X) 버튼 생성 및 개선 (input, search, memo만)
      let clearBtn = null;
      if (group.base !== 'input-dropdown') {
        clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'input-clear clear-button';
        clearBtn.tabIndex = 0;
        clearBtn.setAttribute('aria-label', '입력값 삭제');
        clearBtn.setAttribute('title', '내용 지우기');
        $wrap.appendChild(clearBtn);

        // 마우스 이벤트 처리
        clearBtn.addEventListener('mousedown', function(e) {
          e.preventDefault();
        });

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
          setState('focus');
          
          console.log('[Input] 입력 내용이 삭제됨:', $el.id || $el.name || 'unnamed input');
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

      // 상태 클래스 초기화 함수
      function setState(state) {
        states.forEach(s => $wrap.classList.remove(`${group.base}-${s}`));
        $wrap.classList.add(`${group.base}-${state}`);
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

// 외부에서 호출할 수 있도록 전역 함수로 등록
window.initializeInputFields = initializeInputFields;

console.log('[Input] Input Field Manager 초기화 완료');