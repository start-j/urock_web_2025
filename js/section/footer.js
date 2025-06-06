// copyright 년도 자동 갱신
function updateFooterCopyrightYear() {
  const yearSpan = document.querySelector('footer .copyright .year');
  if (!yearSpan) return;
  const year = new Date().getFullYear();
  yearSpan.textContent = year;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateFooterCopyrightYear);
} else {
  updateFooterCopyrightYear();
}
window.reInitFooterComponent = updateFooterCopyrightYear;



  
function initFooter(container) {
  const year = container.querySelector('.year');
  if (year) year.textContent = new Date().getFullYear();
}


