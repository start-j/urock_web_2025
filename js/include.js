/**
 * HTML 컴포넌트 삽입을 위한 개선된 include.js
 * - GCP와 Vite 양쪽 모두 대응
 * - 오류 콘솔 및 사용자 표시
 * - 중복된 DOMContentLoaded 제거
 */
document.addEventListener('DOMContentLoaded', () => {
    const includeElements = document.querySelectorAll('[data-include-path]');

    const loadComponents = async () => {
        const fetchPromises = Array.from(includeElements).map(async (el) => {
            let path = el.getAttribute('data-include-path');

            // ✅ GCP 캐시 회피용 쿼리스트링 추가 (선택사항)
            const version = "20250620";
            if (!path.includes('?')) path += `?v=${version}`;

            console.log("📂 include fetch path:", path);

            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const html = await response.text();

                // 스크립트 태그 처리 (type="text/plain" → 실행 방지)
                el.innerHTML = html.replace(/<script/g, '<script type="text/plain"');
            } catch (err) {
                console.error(`❌ Include 실패: ${path}`, err);
                el.innerHTML = `<div style="color:red; text-align:center;">Include 실패: ${path}</div>`;
            }
        });

        await Promise.all(fetchPromises);

        // 📦 삽입된 스크립트 실행
        includeElements.forEach(el => {
            const scripts = el.querySelectorAll('script[type="text/plain"]');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                for (const attr of oldScript.attributes) {
                    if (attr.name !== 'type') {
                        newScript.setAttribute(attr.name, attr.value);
                    }
                }
                newScript.textContent = oldScript.textContent;
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
        });

        // ✅ 모든 컴포넌트 로드 완료 이벤트
        const allLoadedEvent = new CustomEvent('allComponentsLoaded');
        window.dispatchEvent(allLoadedEvent);
        console.log('✅ 모든 include 컴포넌트가 로드되었습니다.');
    };

    if (includeElements.length > 0) {
        loadComponents();
    } else {
        window.dispatchEvent(new CustomEvent('allComponentsLoaded'));
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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-include-path]').forEach(async (el) => {
        const path = el.getAttribute('data-include-path');
        console.log("📂 include fetch path:", path);
        try {
            const res = await fetch(path);
            if (!res.ok) {
                // 404 Not Found와 같은 HTTP 에러를 명시적으로 throw합니다.
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const html = await res.text();
            el.innerHTML = html;
        } catch (err) {
            console.error(`❌ Include 실패: ${path}`, err);
            // 에러 발생 시 사용자에게도 시각적으로 표시해줍니다.
            el.innerHTML = `<div style="color:red; text-align:center; padding: 1rem;">Failed to load: ${path}</div>`;
        }
    });
});
