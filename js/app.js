(function () {
    'use strict';
  
    const selector = (el, all = false) => {
      el = el.trim();
      if (all) {
        el = [...document.querySelectorAll(el)];
      } else {
        el = document.querySelector(el);
      }
  
      if (!el) {
        return;
      }
      return el;
    };
  
    const on = (el, event, func) => {
      if (typeof el === 'string') el = selector(el);
  
      if (!el) {
        return;
      }
      return el.addEventListener(event, func);
    };

    const ready = (callback) => {
        if (document.readyState !== 'loading') {
          callback();
        } else {
          document.addEventListener('DOMContentLoaded', callback);
        }
      };
        
      const animateCounter = (el, start, end, duration) => {
        const element = selector(el);
        // Проверка, существует ли элемент
        if (!element) return;
    
        let current = start;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    };
    
    ready(() => {
        // Проверка наличия элемента перед вызовом функции
        if (selector('#counterFirst')) {
            animateCounter('#counterFirst', 0, 20, 1500);
            animateCounter('#counterSecond', 0, 150, 1500);
        }
    });
    
    // Предзагрузка страница
    let preloader = selector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          preloader.style.opacity = 0;
          preloader.classList.remove('overflow-y-scroll');
          selector('body').classList.remove('overflow-hidden');
        }, 500);
  
        setTimeout(() => {
          preloader.remove();
        }, 1400);
      });
    }

    

    const header = selector('.desktopMenu'); // Предполагаем, что ваш header имеет тег <header>
    
    const toggleHeaderBackground = () => {
      const scrollThreshold = 10; // Пороговое значение скролла для добавления фона
      if (!header) return;
      if (window.scrollY > scrollThreshold) {
        header.classList.add('bg-[#191D28]/50');
        header.classList.add('backdrop-blur');
        header.classList.add('shadow-lg');
        header.classList.add('h-[5rem]');
        header.classList.remove('h-[7rem]');
      } else {
        header.classList.add('h-[7rem]');
        header.classList.remove('bg-[#191D28]/50');
        header.classList.remove('backdrop-blur');
        header.classList.remove('shadow-lg');
        header.classList.remove('h-[5rem]');
      }
    };

    // Добавляем обработчик события на скролл
    on(window, 'scroll', toggleHeaderBackground);


    const desktopMenuPage = selector('.desktopMenuPage'); // Выбор элемента
   
    const toggleDesktopMenuPageBackground = () => {
      const scrollThreshold = 10; // Пороговое значение скролла
    
      // Проверка, находимся ли мы на странице /about.html
      if (window.location.pathname === '/about.html') {
        if (window.scrollY > scrollThreshold) {
          desktopMenuPage.classList.add('bg-[#fff]', 'backdrop-blur', 'shadow-lg', 'h-[7.5rem]');
          desktopMenuPage.classList.remove('h-[9rem]');

        } else {
          desktopMenuPage.classList.add('h-[9rem]');
          desktopMenuPage.classList.remove('bg-[#fff]', 'backdrop-blur', 'shadow-lg', 'h-[7.5rem]');

        }
      }
    };

    // Добавление обработчика событий прокрутки
    window.addEventListener('scroll', toggleDesktopMenuPageBackground);

    const navMenuPages = selector('.navMenuPage', true);

    const updateActiveClass = target => {
      navMenuPages.forEach(page => {
        page.classList.remove('active');
      });
      target.classList.add('active');
    };
    
    let clickedNav = false; // Состояние, отслеживающее, был ли совершен клик по навигационной кнопке

    navMenuPages.forEach(page => {
      page.addEventListener('click', (event) => {
        event.preventDefault();
        clickedNav = true; // Установка состояния при клике
        updateActiveClass(page);
        const section = document.querySelector(page.getAttribute('href'));
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          // Сброс состояния через некоторое время после завершения анимации прокрутки
          setTimeout(() => { clickedNav = false; }, 1000);
        }
      });
    });
    
    const checkSectionVisibility = () => {
      let maxVisibleSection = null;
      let maxVisibility = 0;

      if (clickedNav) {
        // Если был клик, не обновляем класс active при прокрутке
        return;
      }
    
      navMenuPages.forEach(page => {
        const section = document.querySelector(page.getAttribute('href'));
        if (section) {
          const bounding = section.getBoundingClientRect();
    
          // Вычисляем процент видимости секции
          const visibleHeight = Math.min(bounding.bottom, window.innerHeight) - Math.max(bounding.top, 0);
          const totalHeight = bounding.bottom - bounding.top;
          const visibility = Math.max(0, visibleHeight) / totalHeight;
    
          // Обновляем максимально видимую секцию
          if (visibility > maxVisibility && visibility > 0.2) { // 20% видимости
            maxVisibleSection = page;
            maxVisibility = visibility;
          }
        }
      });
    
      // Обновляем класс active, если найдена максимально видимая секция
      if (maxVisibleSection) {
        updateActiveClass(maxVisibleSection);
      } else {
        navMenuPages.forEach(page => {
          page.classList.remove('active');
        });
      }
    };
    
    window.addEventListener('scroll', checkSectionVisibility);

  })();
