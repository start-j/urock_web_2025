/**
 * HTML 컴포넌트 동적 삽입 스크립트 (Fetch API 기반)
 *
 * data-include-path 속성을 가진 요소의 내용을 해당 경로의 HTML 파일로 대체하고,
 * 컴포넌트 로드 완료 시 이벤트를 발생시킵니다.
 *
 * 사용법: <div data-include-path="/path/to/component.html"></div>
 */

window.addEventListener('load', function () {
    const includeElements = document.querySelectorAll('[data-include-path]');
    let totalComponents = includeElements.length;
    let loadedComponents = 0;

    if (totalComponents === 0) {
        triggerAllComponentsLoaded();
        return;
    }

    includeElements.forEach(el => {
        const path = el.dataset.includePath;
        if (path) {
            loadComponent(el, path);
        }
    });

    function triggerAllComponentsLoaded() {
        console.log('[Include] 모든 컴포넌트 로드 완료');
        document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
    }

    function checkAllComponentsLoaded() {
        loadedComponents++;
        console.log(`[Include] 컴포넌트 로드 상태: ${loadedComponents}/${totalComponents}`);
        if (loadedComponents >= totalComponents) {
            triggerAllComponentsLoaded();
        }
    }

    async function loadComponent(el, path) {
        console.log(`[Include] 요소 로드 시작: ${path}`);
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            console.log(`[Include] 파일 로드 완료: ${path}`);

            // 기존 outerHTML 교체 방식 유지
            el.outerHTML = html;

            const componentName = path.split('/').pop().replace('.html', '');
            const event = new CustomEvent('componentLoaded', {
                detail: {
                    component: componentName,
                    path: path,
                    element: document.querySelector(`.${componentName}`) // 원본과 유사하게 단순화
                }
            });
            document.dispatchEvent(event);

            checkAllComponentsLoaded();

        } catch (error) {
            console.error(`[Include] 파일 로드 실패: ${path}`, error);
            el.innerHTML = `<!-- Failed to load ${path} -->`;
            checkAllComponentsLoaded(); // 실패해도 카운트는 증가시켜서 무한 대기 방지
        }
    }
});
