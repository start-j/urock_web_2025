/**
 * Certificate Swiper 전용 동적 로딩 및 초기화
 */

// Certificate Swiper CDN 동적 로딩 함수
async function loadCertificateSwiperLibrary() {
  console.log('[CertificateSwiper] Swiper 라이브러리 로딩 시작');
  
  // 이미 Swiper가 로드되어 있는지 확인
  if (window.Swiper) {
    console.log('[CertificateSwiper] 기존 Swiper 라이브러리 사용');
    return window.Swiper;
  }

  try {
    // 기존 스크립트 태그가 있는지 확인
    if (!document.querySelector('script[src*="swiper-bundle.min.js"]')) {
      console.log('[CertificateSwiper] CDN 스크립트 동적 로딩 시작');
      
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      // 로딩 완료 이벤트
      script.onload = () => {
        console.log('[CertificateSwiper] CDN 스크립트 로드 완료');
      };
      
      // 오류 이벤트
      script.onerror = () => {
        console.error('[CertificateSwiper] CDN 스크립트 로드 실패');
      };
      
      // 헤드에 스크립트 추가
      document.head.appendChild(script);

      // 스크립트 로딩 완료까지 대기
      await new Promise((resolve, reject) => {
        script.onload = () => {
          console.log('[CertificateSwiper] 스크립트 로딩 이벤트 완료');
          resolve();
        };
        script.onerror = () => {
          console.error('[CertificateSwiper] 스크립트 로딩 실패');
          reject(new Error('Swiper 스크립트 로딩 실패'));
        };
        
        // 이미 로드되어 있을 경우를 위한 타이머
        setTimeout(() => {
          if (window.Swiper) {
            console.log('[CertificateSwiper] 기존 라이브러리 감지됨');
            resolve();
          }
        }, 200);
      });
    }

    // Swiper 라이브러리 로딩 확인 (최대 10초 대기)
    console.log('[CertificateSwiper] Swiper 라이브러리 로딩 확인 중...');
    for (let i = 0; i < 100; i++) {
      if (window.Swiper) {
        console.log('[CertificateSwiper] Swiper 라이브러리 로드 확인 완료');
        return window.Swiper;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    throw new Error('[CertificateSwiper] Swiper 로딩 타임아웃 (10초 초과)');

  } catch (error) {
    console.error('[CertificateSwiper] 라이브러리 로딩 실패:', error);
    return null;
  }
}

// Certificate Swiper 초기화 함수
async function initCertificateSwiper() {
  console.log('[CertificateSwiper] 초기화 시작');

  try {
    // Swiper 라이브러리 로딩
    const SwiperClass = await loadCertificateSwiperLibrary();
    if (!SwiperClass) {
      console.error('[CertificateSwiper] Swiper 라이브러리 로딩 실패');
      return false;
    }

    // DOM 요소 확인
    const swiperElement = document.querySelector('.certificate-swiper');
    if (!swiperElement) {
      console.log('[CertificateSwiper] .certificate-swiper 요소를 찾을 수 없음');
      return false;
    }

    // 슬라이드 요소 확인
    const slides = swiperElement.querySelectorAll('.swiper-slide');
    if (slides.length === 0) {
      console.log('[CertificateSwiper] 슬라이드 요소를 찾을 수 없음');
      return false;
    }

    console.log(`[CertificateSwiper] 슬라이드 ${slides.length}개 발견, Swiper 초기화 진행`);

    // 기존 인스턴스가 있으면 제거
    if (swiperElement.swiper) {
      swiperElement.swiper.destroy(true, true);
      console.log('[CertificateSwiper] 기존 인스턴스 제거');
    }

    // Certificate Swiper 초기화
    const certificateSwiper = new SwiperClass('.certificate-swiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      initialSlide: 2,
      speed: 600,
      spaceBetween: 30,
      pagination: {
        el: '.certificate-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.certificate-swiper .swiper-button-next',
        prevEl: '.certificate-swiper .swiper-button-prev',
      },
      keyboard: {
        enabled: true,
      },
      mousewheel: {
        thresholdDelta: 70,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });

    console.log('[CertificateSwiper] 초기화 완료');

    // 마우스 이벤트 설정
    swiperElement.addEventListener('mouseenter', () => {
      if (certificateSwiper.autoplay) {
        certificateSwiper.autoplay.stop();
      }
    });

    swiperElement.addEventListener('mouseleave', () => {
      if (certificateSwiper.autoplay) {
        certificateSwiper.autoplay.start();
      }
    });

    // 전역 접근을 위해 저장
    window.certificateSwiperInstance = certificateSwiper;
    
    return true;

  } catch (error) {
    console.error('[CertificateSwiper] 초기화 실패:', error);
    return false;
  }
}

// 안전한 초기화 함수 (재시도 로직 포함)
async function safeCertificateSwiperInit(retries = 3) {
  console.log(`[CertificateSwiper] 안전한 초기화 시도 (남은 횟수: ${retries})`);
  
  if (retries <= 0) {
    console.error('[CertificateSwiper] 최대 재시도 횟수 초과');
    return;
  }

  try {
    const success = await initCertificateSwiper();
    if (success) {
      console.log('[CertificateSwiper] 초기화 성공');
    } else {
      console.log(`[CertificateSwiper] 초기화 실패, ${retries - 1}회 남음`);
      setTimeout(() => {
        safeCertificateSwiperInit(retries - 1);
      }, 1000);
    }
  } catch (error) {
    console.error('[CertificateSwiper] 초기화 중 오류:', error);
    setTimeout(() => {
      safeCertificateSwiperInit(retries - 1);
    }, 1000);
  }
}

// 이벤트 리스너 설정
if (typeof document !== 'undefined') {
  // DOM 로드 완료 시
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[CertificateSwiper] DOMContentLoaded 이벤트');
    setTimeout(() => {
      safeCertificateSwiperInit();
    }, 500);
  });

  // 페이지 완전 로드 완료 시
  window.addEventListener('load', () => {
    console.log('[CertificateSwiper] Window load 이벤트');
    setTimeout(() => {
      if (document.querySelector('.certificate-swiper') && !window.certificateSwiperInstance) {
        safeCertificateSwiperInit();
      }
    }, 500);
  });

  // 탭 컨텐츠 로드 시
  document.addEventListener('tabContentLoaded', (event) => {
    const { contentPath } = event.detail || {};
    console.log('[CertificateSwiper] 탭 컨텐츠 로드:', contentPath);
    
    if (contentPath && contentPath.includes('solution-01-dfas-pro')) {
      console.log('[CertificateSwiper] DFAS Pro 페이지 감지');
      setTimeout(() => {
        safeCertificateSwiperInit();
      }, 300);
    }
  });

  // 모든 컴포넌트 로드 완료 시
  document.addEventListener('allComponentsLoaded', () => {
    console.log('[CertificateSwiper] 모든 컴포넌트 로드 완료');
    setTimeout(() => {
      if (document.querySelector('.certificate-swiper') && !window.certificateSwiperInstance) {
        safeCertificateSwiperInit();
      }
    }, 500);
  });
}

// 전역 함수로 노출
if (typeof window !== 'undefined') {
  window.initCertificateSwiper = initCertificateSwiper;
  window.safeCertificateSwiperInit = safeCertificateSwiperInit;
  window.loadCertificateSwiperLibrary = loadCertificateSwiperLibrary;
  
  // 강제 초기화 함수 (디버깅용)
  window.forceCertificateSwiper = () => {
    console.log('[CertificateSwiper] 강제 초기화 시작');
    console.log('[CertificateSwiper] window.Swiper:', typeof window.Swiper);
    console.log('[CertificateSwiper] certificate-swiper 요소:', document.querySelector('.certificate-swiper'));
    console.log('[CertificateSwiper] 슬라이드 개수:', document.querySelectorAll('.certificate-swiper .swiper-slide').length);
    
    safeCertificateSwiperInit();
  };
}

console.log('[CertificateSwiper] 모듈 로드 완료');
