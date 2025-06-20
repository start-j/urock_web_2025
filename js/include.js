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

// 이 스크립트는 웹 페이지에서 동적으로 외부 HTML 파일을 포함시키는 기능을 수행합니다. 주요 특징은 다음과 같습니다:

// 페이지 로드 후 모든 HTML 요소를 검색합니다.
// data-include-path 속성이 있는 요소를 찾아 해당 경로의 파일 내용으로 대체합니다.
// XMLHttpRequest를 사용하여 비동기적으로 파일을 불러옵니다.
// 파일 로드가 성공하면 해당 요소를 불러온 파일 내용으로 즉시 교체합니다.

// 예를 들어, HTML에서 다음과 같이 사용할 수 있습니다:

// <div data-include-path="header.html"></div>
// 이 코드는 header.html 파일의 내용으로 <div> 요소를 대체합니다.



//catch() 구문 추가
document.querySelectorAll('[data-include-path]').forEach(async (el) => {
    const path = el.getAttribute('data-include-path');
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const html = await res.text();
        el.innerHTML = html;
    } catch (err) {
        console.error(`❌ include 실패: ${path}`, err);
        el.innerHTML = `<div style="color:red;">Include 실패: ${path}</div>`;
    }
});
