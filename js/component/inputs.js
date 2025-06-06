document.addEventListener('DOMContentLoaded', function () {
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

      // 클린(X) 버튼 생성 (input, search, memo만)
      let clearBtn = null;
      if (group.base !== 'input-dropdown') {
        clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'input-clear';
        clearBtn.tabIndex = 0;
        clearBtn.setAttribute('aria-label', '입력값 삭제');
        $wrap.appendChild(clearBtn);
        clearBtn.addEventListener('mousedown', function(e) {
          e.preventDefault();
        });
        clearBtn.addEventListener('click', function(e) {
          e.preventDefault();
          $el.value = '';
          $el.focus();
          $wrap.classList.remove('input-has-value');
          setState('focus');
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

      // filled 상태
      function checkFilled() {
        if ($el.value && $el.value.length > 0) {
          setState('filled');
          $wrap.classList.add('input-has-value');
          if (clearBtn) clearBtn.style.display = 'block';
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

      // focus/blur
      $el.addEventListener('focus', function () {
        if (checkDisable()) return;
        setState('focus');
        checkFilled();
      });
      $el.addEventListener('blur', function () {
        if (checkDisable()) return;
        if (checkFilled()) {
          setState('filled');
        } else {
          setDefault();
        }
      });

      // typing
      $el.addEventListener('input', function () {
        if (checkDisable()) return;
        if ($el.value && $el.value.length > 0) {
          setState('typing');
          $wrap.classList.add('input-has-value');
          if (clearBtn) clearBtn.style.display = 'block';
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
}); 