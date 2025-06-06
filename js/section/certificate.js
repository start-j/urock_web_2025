/**
 * 인증서 섹션 스크립트
 */

// 인증서 섹션 초기화
function initCertificateSection() {
  console.log('[Section] 인증서 섹션 초기화');

  // 인증서 섹션 요소 찾기
  const certificateSections = document.querySelectorAll('.certificate');

  certificateSections.forEach(certificate => {
    // 인증서 아이템
    const items = certificate.querySelectorAll('.certificate-item');

    // 이미지 갤러리 기능
    items.forEach(item => {
      item.addEventListener('click', () => {
        // 모달 생성
        const modal = document.createElement('div');
        modal.className = 'certificate-modal';

        // 이미지 클론
        const img = item.querySelector('img');
        const imgClone = img.cloneNode(true);
        imgClone.className = 'certificate-modal-img';

        // 인증서 정보
        const info = item.querySelector('.certificate-info');
        const infoClone = info ? info.cloneNode(true) : null;

        // 닫기 버튼
        const closeBtn = document.createElement('div');
        closeBtn.className = 'certificate-modal-close';
        closeBtn.innerHTML = '&times;';

        // 모달 구성
        modal.appendChild(closeBtn);
        modal.appendChild(imgClone);
        if (infoClone) {
          modal.appendChild(infoClone);
        }

        // 문서에 모달 추가
        document.body.appendChild(modal);

        // 스크롤 비활성화
        document.body.style.overflow = 'hidden';

        // 닫기 이벤트
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
          document.body.style.overflow = '';
        });

        // 모달 외부 클릭 시 닫기
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
          }
        });
      });
    });

    // 필터 기능 (있는 경우)
    const filterButtons = certificate.querySelectorAll('.certificate-filter button');

    if (filterButtons.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // 모든 버튼 비활성화
          filterButtons.forEach(btn => {
            btn.classList.remove('active');
          });

          // 클릭한 버튼 활성화
          button.classList.add('active');

          // 필터 적용
          const filter = button.getAttribute('data-filter');

          items.forEach(item => {
            if (filter === 'all') {
              item.style.display = '';
            } else {
              const itemCategory = item.getAttribute('data-category');
              item.style.display = itemCategory === filter ? '' : 'none';
            }
          });
        });
      });
    }
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initCertificateSection);

// 외부에서 접근 가능하도록 노출
window.initCertificateSection = initCertificateSection; 