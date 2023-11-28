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
          desktopMenuPage.classList.add('bg-[#fff]', 'backdrop-blur', 'shadow-lg', 'h-[5rem]');
          desktopMenuPage.classList.remove('h-[8rem]');

        } else {
          desktopMenuPage.classList.add('h-[8rem]');
          desktopMenuPage.classList.remove('bg-[#fff]', 'backdrop-blur', 'shadow-lg', 'h-[5rem]');

        }
      }
    };

    // Добавление обработчика событий прокрутки
    window.addEventListener('scroll', toggleDesktopMenuPageBackground);
  })();

  document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем Isotope
    var iso = new Isotope('.container-products', {
        itemSelector: '.container-products-card',
        layoutMode: 'fitRows'
    });

    // Обработчик нажатия на кнопку "Применить фильтр"
    document.getElementById('apply-filter').addEventListener('click', function() {
        var filterValue = getFilterValue();
        console.log()
        iso.arrange({ filter: filterValue });
    });

    // Получение значения фильтра
    function getFilterValue() {
        var filters = document.querySelectorAll('.filter');
        var filterValue = '';
        filters.forEach(function(filter) {
            if (filter.checked) {
                filterValue += filter.value;
            }
        });
        console.log(filterValue);
        return filterValue;
    }
    
});