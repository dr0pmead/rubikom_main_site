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
      if (window.location.pathname !== '/' && (window.location.pathname === '/about.html' || window.location.pathname === '/products.html' || window.location.pathname === '/distribution.html' || window.location.pathname === '/news.html')) {
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

    document.querySelectorAll('a[data-value]').forEach(function(link) {
      link.addEventListener('click', function(event) {
          event.preventDefault(); // Предотвратить стандартное поведение ссылки
          var categoryValue = this.getAttribute('data-value');
          localStorage.setItem('selectedCategory', categoryValue);
          window.location.href = 'products.html';
      });
  });

    if (window.location.pathname === '/products.html') {
    var selectedValues = [];

    var filterButtons = document.querySelectorAll('.smallFilter .filter');
    var activeFilters = [];



    filterButtons.forEach(function(filterButton) {
        filterButton.addEventListener('click', function(event) {
            if (event.target.classList.contains('reset-filter')) {
                return;
            }
          
            var filterValue = this.getAttribute('data-value');
            this.classList.toggle('active');
            toggleFilter(filterValue, this.classList.contains('active'));
            applyFilters();
        });
    });

    function toggleFilter(filterValue, isActive) {
        var index = activeFilters.indexOf(filterValue);
        if (isActive) {
            if (index === -1) {
                activeFilters.push(filterValue);
            }
        } else {
            if (index !== -1) {
                activeFilters.splice(index, 1);
            }
        }
        console.log("Активные фильтры после обновления:", activeFilters);
        addOrRemoveResetButton(filterValue, isActive);
    }

    function applyFilters() {
        console.log("Применение фильтров:", activeFilters);
        var productCards = document.querySelectorAll('.container-products .container-products-card');
        productCards.forEach(function(card) {
            var cardValue = card.getAttribute('data-value');
            var isMatch = activeFilters.length === 0 || activeFilters.some(function(filter) {
                return cardValue && cardValue.split(',').includes(filter);
            });
            card.style.display = isMatch ? '' : 'none';
        });
    }

    var selectedCategory = localStorage.getItem('selectedCategory');
    if (selectedCategory) {
        // Добавляем значение фильтра в активные фильтры
        activeFilters.push(selectedCategory);
        applyFilters();

        // Ищем и активируем соответствующий чекбокс
        var categoryFilters = document.querySelectorAll('.category_filter .filter');
        categoryFilters.forEach(function(filter) {
            if (filter.getAttribute('data-value') === selectedCategory) {
                // Активируем чекбокс или другой элемент фильтра
                filter.checked = checked; // для чекбоксов
                // или filter.classList.add('active'); // для других типов элементов
            }
        });

        // Очищаем значение из localStorage
        localStorage.removeItem('selectedCategory');
    }

    function addOrRemoveResetButton(filterValue, isActive) {
        var button = Array.from(filterButtons).find(btn => btn.getAttribute('data-filter') === filterValue);
        if (!button) return;

        var existingResetButton = button.querySelector('.reset-filter');
        if (isActive) {
            if (!existingResetButton) {
                var resetButton = document.createElement('span');
                resetButton.classList.add('reset-filter');
                resetButton.innerHTML = '&#10005;';
                resetButton.onclick = function(event) {
                    event.stopPropagation();
                    toggleFilter(filterValue, false);
                    applyFilters();
                };
                button.appendChild(resetButton);
            }
        } else if (existingResetButton) {
            existingResetButton.remove();
        }
    }

    let modalFilterMobile = document.querySelector('#openModalMobile');
    let desktopFilter = document.querySelector('.desktopFilter');
    let activeFilter;

    if (modalFilterMobile.classList.contains('lg:hidden')) {
        activeFilter = desktopFilter;
    } else {
        activeFilter = modalFilterMobile;
    }
    console.log(activeFilter)

    activeFilter.querySelectorAll('.filter').forEach(function(filterCheckbox) {
      filterCheckbox.addEventListener('change', function() {
          var value = this.getAttribute('data-value');
          if (this.checked) {
              selectedValues.push(value);
          } else {
              selectedValues = selectedValues.filter(function(item) {
                  return item !== value;
              });
          }
      });
  });

    // Обработчик для чекбоксов
    activeFilter.querySelector('#apply-filters').addEventListener('click', function() {
      var allFilters = combineFilters(activeFilters, selectedValues);
      applyCombinedFilters(allFilters);
      console.log('Примененные фильтры:', allFilters);
  });

  function combineFilters(activeFilters, selectedValues) {
      // Возвращаем объединение двух массивов без дубликатов
      return [...new Set([...activeFilters, ...selectedValues])];
  }
  

  function applyCombinedFilters(filters) {
    var productCards = document.querySelectorAll('.container-products .container-products-card');
    productCards.forEach(function(card) {
        var cardValue = card.getAttribute('data-value');
        var isMatch = filters.length === 0 || filters.some(function(filter) {
            return cardValue && cardValue.split(',').includes(filter);
        });
        card.style.display = isMatch ? '' : 'none';
    });
}

     // Обработчик для кнопки "Сбросить фильтр"
     activeFilter.querySelector('#reset-filters').addEventListener('click', function() {
      selectedValues = [];
      activeFilters = []; // Также сбрасываем активные фильтры
      activeFilter.querySelectorAll('.filter').forEach(function(filterCheckbox) {
          filterCheckbox.checked = false;
      });
  
      applyCombinedFilters([]); // Применяем сброс фильтров сразу
  
      console.log('Фильтры сброшены');
  });
}
});

document.addEventListener('DOMContentLoaded', function() {
  var currentUrl = window.location.href;
  var footerNavMenuPoints = document.querySelectorAll('.footerNavMenu-point');
  var menuPointPage = document.querySelectorAll('.menuPointPage');

  menuPointPage.forEach(function(menuPoint) {
    var href = menuPoint.getAttribute('href');

    if (currentUrl.includes(href)) {
        menuPoint.classList.add('active');
    }
});

  footerNavMenuPoints.forEach(function(menuPoint) {
      var href = menuPoint.getAttribute('href');

      if (currentUrl.includes(href)) {
          var parent = menuPoint.parentElement;
          parent.classList.add('active');
      }
  });
});