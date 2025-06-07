/**
 * HTML 컴포넌트 동적 삽입 스크립트
 * 
 * data-include-path 속성을 가진 요소의 내용을 해당 경로의 HTML 파일로 대체하고,
 * 컴포넌트 로드 완료 시 이벤트를 발생시킵니다.
 * 
 * 사용법: <div data-include-path="components/header.html"></div>
 */

// 로드할 총 컴포넌트 수와 현재 로드된 컴포넌트 수를 추적
let totalComponents = 0;
let loadedComponents = 0;

// 컴포넌트 로드 함수
function loadComponent(el, includePath) {
    console.log(`[Include] 요소 로드 시작: ${includePath}`);

    // 기존 데이터 속성
    const dataTitle = el.dataset.title;
    const dataDesc = el.dataset.desc;
    const dataTabType = el.dataset.tabType;

    // 카드 관련 데이터 속성 (단수형, 표준)
    const dataSelector = el.dataset.includeSelector;
    const dataCardBg = el.dataset.cardBg;
    const dataCardTitle = el.dataset.cardTitle;
    const dataCardDesc = el.dataset.cardDesc;

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(`[Include] 파일 로드 완료: ${includePath}`);

            // 탭 컴포넌트 특별 처리
            if (includePath.includes('component/tab.html')) {
                console.log('[Include] 탭 컴포넌트 특별 처리 시작');
                
                // 기존 tab-container가 있는지 확인
                const existingContainer = document.getElementById('tab-container');
                if (existingContainer) {
                    console.log('[Include] 기존 tab-container 발견, 중복 방지를 위해 제거');
                    existingContainer.remove();
                }
                
                // 새로운 탭 컨테이너 삽입
                el.outerHTML = this.responseText;
                
                // 컴포넌트 로드 이벤트 발생
                const event = new CustomEvent('componentLoaded', {
                    detail: {
                        component: 'tab',
                        path: includePath,
                        element: document.getElementById('tab-container')
                    }
                });
                document.dispatchEvent(event);

                loadedComponents++;
                checkAllComponentsLoaded();
                return;
            }

            // 카드 컴포넌트만 불러오는 경우
            if (
                dataSelector &&
                includePath.includes('cards.html')
            ) {
                const temp = document.createElement('div');
                temp.innerHTML = this.responseText;
                const selected = temp.querySelector(dataSelector);
                if (selected) {
                    // 클론해서 삽입
                    el.outerHTML = selected.outerHTML;

                    // 방금 삽입된 요소 찾기
                    const insertedElement = document.querySelector(dataSelector);

                    // 카드 커스텀 속성 반영
                    if (dataCardBg) insertedElement.style.backgroundImage = `url('${dataCardBg}')`;
                    if (dataCardTitle) {
                        const titleEl = insertedElement.querySelector('.product-name');
                        if (titleEl) titleEl.textContent = dataCardTitle;
                    }
                    if (dataCardDesc) {
                        const descEl = insertedElement.querySelector('.des');
                        if (descEl) descEl.textContent = dataCardDesc;
                    }

                    // componentLoaded 이벤트 발생
                    const componentName = includePath.split('/').pop().replace('.html', '');
                    const event = new CustomEvent('componentLoaded', {
                        detail: {
                            component: componentName,
                            path: includePath,
                            element: insertedElement
                        }
                    });
                    document.dispatchEvent(event);

                    loadedComponents++;
                    checkAllComponentsLoaded();
                    return;
                }
            }

            // 기존 방식(카드가 아니거나 selector 없음)
            el.outerHTML = this.responseText;

            // 이하 기존 코드 동일
            const componentName = includePath.split('/').pop().replace('.html', '');

            let insertedElement;
            if (includePath.includes('section/')) {
                insertedElement = document.querySelector(`.${componentName}`);
            } else if (includePath.includes('component/')) {
                insertedElement = document.querySelector(`.${componentName}`) ||
                    document.querySelector(`section.${componentName}`);
            }

            // 데이터 속성 전달 (intro.html 등)
            if (includePath.includes('section/intro.html')) {
                console.log('[Include] intro.html 로드 완료, 데이터 속성 전달:', dataTitle, dataDesc);
                const txtGroup = document.querySelector('.txt-group');
                if (txtGroup) {
                    if (dataTitle) {
                        txtGroup.dataset.title = dataTitle;
                        console.log('[Include] data-title 설정 완료:', dataTitle);
                    }
                    if (dataDesc) {
                        txtGroup.dataset.desc = dataDesc;
                        console.log('[Include] data-desc 설정 완료:', dataDesc);
                    }
                }
            }

            // 탭 컴포넌트에 탭 타입 전달
            if (includePath.includes('component/tab.html')) {
                const tabElement = document.querySelector('.tab');
                if (tabElement && dataTabType) {
                    tabElement.dataset.tabType = dataTabType;
                    console.log('[Include] data-tab-type 설정 완료:', dataTabType);
                }
            }

            // componentLoaded 이벤트 발생
            const event = new CustomEvent('componentLoaded', {
                detail: {
                    component: componentName,
                    path: includePath,
                    element: insertedElement
                }
            });
            document.dispatchEvent(event);

            loadedComponents++;
            checkAllComponentsLoaded();
        }
    };

    xhttp.open('GET', includePath, true);
    xhttp.send();
}

// 모든 컴포넌트 로드 완료 확인
function checkAllComponentsLoaded() {
    console.log(`[Include] 컴포넌트 로드 상태: ${loadedComponents}/${totalComponents}`);
    if (loadedComponents >= totalComponents) {
        console.log('[Include] 모든 컴포넌트 로드 완료');
        // 모든 컴포넌트 로드 완료 이벤트
        document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
    }
}

// 페이지가 완전히 로드된 후 실행되는 이벤트 리스너
window.addEventListener('load', function () {
    console.log("[Include] 페이지 로드 완료, include 처리 시작");

    // 문서의 모든 data-include-path 속성을 가진 요소 선택
    const includeElements = document.querySelectorAll('[data-include-path]');

    // 총 컴포넌트 수 설정
    totalComponents = includeElements.length;
    loadedComponents = 0;

    console.log(`[Include] 로드할 컴포넌트 수: ${totalComponents}`);

    // 로드할 컴포넌트가 없는 경우
    if (totalComponents === 0) {
        document.dispatchEvent(new CustomEvent('allComponentsLoaded'));
        return;
    }

    // 모든 컴포넌트 로드 시작
    includeElements.forEach(function (el) {
        const includePath = el.dataset.includePath;
        if (includePath) {
            loadComponent(el, includePath);
        }
    });
});



// 이 스크립트는 웹 페이지에서 동적으로 외부 HTML 파일을 포함시키는 기능을 수행합니다. 주요 특징은 다음과 같습니다:

// 페이지 로드 후 모든 HTML 요소를 검색합니다.
// data-include-path 속성이 있는 요소를 찾아 해당 경로의 파일 내용으로 대체합니다.
// XMLHttpRequest를 사용하여 비동기적으로 파일을 불러옵니다.
// 파일 로드가 성공하면 해당 요소를 불러온 파일 내용으로 즉시 교체합니다.

// 예를 들어, HTML에서 다음과 같이 사용할 수 있습니다:

// <div data-include-path="header.html"></div>
// 이 코드는 header.html 파일의 내용으로 <div> 요소를 대체합니다.