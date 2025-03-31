// include.js
// 페이지가 완전히 로드된 후 실행되는 이벤트 리스너
window.addEventListener('load', function() {
    // 문서의 모든 HTML 요소를 선택
    var allElements = document.getElementsByTagName('*');
    
    // 모든 요소에 대해 순회하며 데이터 포함 경로 확인
    Array.prototype.forEach.call(allElements, function(el) {
        // 요소의 data-include-path 속성에서 포함할 파일의 경로 추출
        var includePath = el.dataset.includePath;
        
        // data-include-path 속성이 존재하는 경우
        if (includePath) {
            // XMLHttpRequest 객체 생성 - 비동기적으로 파일 불러오기
            var xhttp = new XMLHttpRequest();
            
            // 요청 상태 변경 시 실행되는 콜백 함수
            xhttp.onreadystatechange = function () {
                // 요청이 완료되고 성공적인 응답(200 상태 코드)을 받았을 때
                if (this.readyState == 4 && this.status == 200) {
                    // 현재 요소를 불러온 파일의 내용으로 대체
                    el.outerHTML = this.responseText;
                }
            };
            
            // HTTP GET 요청 설정 (비동기 모드)
            xhttp.open('GET', includePath, true);
            
            // 요청 전송
            xhttp.send();
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