document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
      setTimeout(() => {
        mobileMenu.classList.toggle('show-menu');
      }, 20); // Timeout to allow hidden toggle to complete
    });

    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('show-menu');
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 600); // Timeout to allow circle animation to complete
      }
    });
  });