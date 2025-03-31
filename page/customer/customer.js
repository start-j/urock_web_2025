//페이지네이션
document.addEventListener('DOMContentLoaded', () => {
    const pagination = document.querySelector('.pagination');
    const links = pagination.querySelectorAll('.pagination__link');
    const prevBtn = pagination.querySelector('.pagination__prev');
    const nextBtn = pagination.querySelector('.pagination__next');

    let currentPage = 1;
    const totalPages = 20;

    // 초기 페이지 활성화 설정
    function initializeActivePage() {
        // 첫 번째 페이지 링크를 기본적으로 활성화
        const firstPageLink = document.querySelector('.pagination__link');
        if (firstPageLink) {
            firstPageLink.classList.add('active');
        }
    }

    // 페이지 링크 클릭 이벤트
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 현재 활성 페이지 제거
            const currentActiveLink = document.querySelector('.pagination__link.active');
            if (currentActiveLink) {
                currentActiveLink.classList.remove('active');
            }
            
            // 클릭된 페이지 활성화
            e.target.classList.add('active');
            currentPage = parseInt(e.target.textContent);
            
            // 페이지 변경 로직 (예: 데이터 로딩)
            loadPageData(currentPage);
        });
    });

    // 이전 페이지 버튼
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    // 다음 페이지 버튼
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // 페이지네이션 상태 업데이트
    function updatePagination() {
        // 현재 활성 페이지 링크 제거
        const currentActiveLink = document.querySelector('.pagination__link.active');
        if (currentActiveLink) {
            currentActiveLink.classList.remove('active');
        }
        
        // 새로운 현재 페이지 활성화
        const newCurrentLink = document.querySelector(`.pagination__link:nth-child(${currentPage})`);
        if (newCurrentLink) {
            newCurrentLink.classList.add('active');
        }
        
        // 페이지 데이터 로딩
        loadPageData(currentPage);
    }

    // 페이지 데이터 로딩 함수 (예시)
    function loadPageData(page) {
        console.log(`페이지 ${page} 데이터 로딩`);
        // 여기에 실제 데이터 로딩 로직 구현
    }

    // 초기 페이지 설정
    initializeActivePage();
});


// 문의 등록 폼
$(function() {
    var prev_first = '선택하세요';
    var prev_second = '선택하세요';
    var prev_third = '선택하세요';
    var isChanged = false;

    $(".tab-inquiry").on('click', function() {
        // Potential tab-related functionality can be added here
    });

    $("select[name='inquiry-type']").on(
        'mousedown', function() {
            prev_first = $(this).val();
        }
    ).change(function() {
        var selectedValue = $(this).val();
        
        $(".selt002").prop('disabled', false);
        var secondSelect = $("select[name='second']");
        var thirdSelect = $("select[name='third']");

        prev_second = secondSelect.val();
        prev_third = thirdSelect.val();

        secondSelect.children().remove();
        secondSelect.append('<option value="선택하세요">선택하세요</option>');
        thirdSelect.children().remove();
        thirdSelect.append('<option value="선택하세요">선택하세요</option>');

        // 변화 감지
        if(prev_first != selectedValue){
            isChanged = true;
            if((prev_first == '기술지원') || (selectedValue == '기술지원' && prev_first != '선택하세요')){
                isChanged = confirm('문의유형을 변경하면 초기화될 수 있습니다.\n변경하시겠습니까?');
                if(isChanged){
                    $('#details').summernote('code', '');
                }
                else{ 
                    $(this).val(prev_first);
                    selectedValue = $(this).val();
                }	
            }
        }
        else{
            isChanged = false;
        }

        if(selectedValue == '선택하세요'){
            $('.sol-tr').show();
            $(".selt002, .selt003").show().prop('disabled', true);
        }

        if(selectedValue == '솔루션 문의'){
            $('.sol-tr').show();
            $(".selt002").show().prop('disabled', false);
            $(".selt003").show().prop('disabled', true);
            secondSelect.append('<option value="휴대폰 안심 지우개">휴대폰 안심 지우개</option>');
            secondSelect.append('<option value="디지털 포렌식">디지털 포렌식</option>');
            secondSelect.append('<option value="보안 통제 시스템">보안 통제 시스템</option>');
            secondSelect.append('<option value="업무 지원 시스템">업무 지원 시스템</option>');
        }

        if(selectedValue == '기술지원'){
            $('.sol-tr').show();
            $(".selt002").show().prop('disabled', false);
            $(".selt003").show().prop('disabled', true);
            secondSelect.append('<option value="휴대폰 안심 지우개">휴대폰 안심 지우개</option>');
            secondSelect.append('<option value="디지털 포렌식">디지털 포렌식</option>');
            secondSelect.append('<option value="보안 통제 시스템">보안 통제 시스템</option>');
            secondSelect.append('<option value="업무 지원 시스템">업무 지원 시스템</option>');
            
            if(prev_first != '기술지원') {
                $('#details').summernote('code', 
                    '<p><b>[제품정보]</b></p><p><b>제품버전</b> :</p><p><b>사용 환경</b> : (OS, Memory, File System, 보안 프로그램 설치유무 등)</p><br/><br/><p><b>자세한 증상</b></p><p>(관련된 기능, 발생 상황 설명, 설정한 옵션, 보안프로그램 설치 유무)</p><br/><br/><br/><p><b>스크린샷</b></p><p>(이미지 삽입)</p>'
                );
            }
        }

        if(selectedValue == '서비스 문의'){
            $('.sol-tr').show();
            $(".selt002").show().prop('disabled', false);
            $(".selt003").show().prop('disabled', true);
            secondSelect.append('<option value="포렌식 컨설팅">포렌식 컨설팅</option>');
            secondSelect.append('<option value="포렌식 교육">포렌식 교육</option>');
            secondSelect.append('<option value="데이터 삭제 센터">데이터 삭제 센터</option>');
        }

        if(selectedValue == '기타 문의'){
            $('.sol-tr').hide();
            $(".selt002, .selt003, .selt004").hide();
            secondSelect.children().remove();
            secondSelect.append('<option value=""></option>');
            thirdSelect.children().remove();
            thirdSelect.append('<option value=""></option>');
        }

        if(!isChanged){
            secondSelect.val(prev_second);	
            secondSelect.trigger('change');
        }
        else{
            secondSelect.val('선택하세요');	
        }
    });

    $("select[name='second']").change(function() {
        $(".selt003").prop('disabled', false);
        var thirdSelect = $("select[name='third']");
        var selectedValue = $(this).val();

        thirdSelect.children().remove();
        thirdSelect.append('<option value="선택하세요">선택하세요</option>');

        if(selectedValue == '선택하세요'){
            $(".selt003").show().prop('disabled', true);
        }

        if(selectedValue == '휴대폰 안심 지우개'){
            thirdSelect.append('<option value="M-SecuManager S">M-SecuManager S</option>');
            thirdSelect.append('<option value="M-SecuManager G">M-SecuManager G</option>');
        }

        if(selectedValue == '디지털 포렌식'){
            thirdSelect.append('<option value="F-SecuManager">F-SecuManager</option>');
            thirdSelect.append('<option value="DFAS Pro">DFAS Pro</option>');
            thirdSelect.append('<option value="DFAS Enterprise">DFAS Enterprise</option>');
        }

        if(selectedValue == '보안 통제 시스템'){
            thirdSelect.append('<option value="Gate Manager">Gate Manager</option>');
        }

        if(selectedValue == '업무 지원 시스템'){
            thirdSelect.append('<option value="D-Trans">D-Trans</option>');
        }

        if(selectedValue == '포렌식 컨설팅'){
            $(".selt003").show().prop('disabled', false);
            thirdSelect.append('<option value="포렌식 분석 서비스">포렌식 분석 서비스</option>');
            thirdSelect.append('<option value="디지털포렌식 랩 구축">디지털포렌식 랩 구축</option>');
            thirdSelect.append('<option value="국제 표준화 인증">국제 표준화 인증</option>');
        }

        if(selectedValue == '포렌식 교육' || selectedValue == '데이터 삭제 센터'){
            $(".selt003").hide().prop('disabled', true);
            thirdSelect.children().remove();
            thirdSelect.append('<option value=""></option>');
        }

        if(!isChanged) thirdSelect.val(prev_third);
    });

    // 이메일 도메인 선택
    function setEmailDomain(arg) {
        if(arg == "direct"){
            $('#email2').val('');
            $('#email2').show();
        } else {
            $('#email2').val('');
            $('#email2').hide();
        }
    }

    // 문의 등록
    function submitInquiry() {
        // 유효성 검사 로직 (기존 코드와 유사)
        if($('#email1').val() == "" || $('#email1').val().length < 3) {
            alert("회신받으실 메일주소를 정확히 입력해주세요.");
            $('#email1').focus();
            return;
        }

        // 추가적인 유효성 검사 로직들...

        if(confirm("작성하신 내용을 등록하시겠습니까?")) {
            // AJAX 제출 로직
            $.ajax({
                type: "POST", 
                url: "/_ajax/_ajax.regQueProc.php", 
                cache: false, 
                dataType: "json", 
                data: {
                    "mode": "regQueCont", 
                    "inquiry-type": $('#inquiry-type').val(),
                    "second": $('.selt002').val(),
                    "third": $('.selt003').val(),
                    "company": $('#company').val(),
                    "name": $('#name').val(),
                    "phone": $('#phone').val(),
                    "email1": $('#email1').val(),
                    "email2": $('#email2').val(),
                    "email3": $('#email3').val(),
                    "details": encodeURIComponent($('#details').val())
                }
            })
            .done(function(ajaxData) {
                if(ajaxData == "success") {
                    alert("정상적으로 등록되었습니다.\n최대한 빠른 답변을 드리도록 하겠습니다.");
                    window.location.replace('support_ok.php');
                } else {
                    alert("정상적으로 처리되지 않았습니다.\n다시 한번 등록해보시기 바랍니다.\n계속되는 오류 발생시 운영팀에게 문의하시기 바랍니다.");
                }
            })
            .fail(function() {
                alert("정상적으로 처리되지 않았습니다.\n다시 한번 등록해보시기 바랍니다.\n계속되는 오류 발생시 운영팀에게 문의하시기 바랍니다.");
            });
        }
    }

    // 취소
    function resetInquiry(){
        window.location.replace("/kr");
    }

    // 폼 제출 이벤트 핸들러
    $('form').on('submit', function(e) {
        e.preventDefault();
        submitInquiry();
    });
});