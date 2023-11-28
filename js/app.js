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
    var selectedValues = [];

    var filterButtons = document.querySelectorAll('.smallFilter .filter');
    var activeFilters = [];

    filterButtons.forEach(function(filterButton) {
        filterButton.addEventListener('click', function() {
            var filterValue = this.getAttribute('data-value');
            this.classList.toggle('active');
            updateActiveFilters(filterValue, this.classList.contains('active'));
            applyFilters();
            addOrRemoveResetButton(this);
        });
    });

    function updateActiveFilters(filterValue, isActive) {
        if (isActive) {
            if (!activeFilters.includes(filterValue)) {
                activeFilters.push(filterValue);
            }
        } else {
            activeFilters = activeFilters.filter(function(value) {
                return value !== filterValue;
            });
        }
    }

    function applyFilters() {
        var productCards = document.querySelectorAll('.container-products .container-products-card');
        productCards.forEach(function(card) {
            var cardValue = card.getAttribute('data-value');
            var isMatch = activeFilters.length === 0 || activeFilters.some(function(filter) {
                return cardValue && cardValue.split(',').includes(filter);
            });
            card.style.display = isMatch ? '' : 'none';
        });
    }

    function addOrRemoveResetButton(button) {
        var existingResetButton = button.querySelector('.reset-filter');
        if (button.classList.contains('active')) {
            if (!existingResetButton) {
                var resetButton = document.createElement('span');
                resetButton.classList.add('reset-filter');
                resetButton.innerHTML = '&#10005;'; // Символ крестика
                resetButton.onclick = function() {
                    button.click(); // Имитируем клик по кнопке фильтра для ее сброса
                };
                button.appendChild(resetButton);
            }
        } else if (existingResetButton) {
            existingResetButton.remove();
        }
    }


    // Обработчик для чекбоксов
    document.querySelectorAll('.filter').forEach(function(filterCheckbox) {
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

    // Обработчик для кнопки "Применить фильтры"
    document.getElementById('apply-filters').addEventListener('click', function() {
        var productCards = document.querySelectorAll('.container-products .container-products-card');
    
        productCards.forEach(function(card) {
            if (selectedValues.length === 0) {
                // Если selectedValues пуст, отобразить все элементы
                card.style.display = '';
            } else {
                var valueAttribute = card.getAttribute('data-value');
                if (valueAttribute) {
                    var values = valueAttribute.split(',');
                    var isMatch = selectedValues.some(function(selectedValue) {
                        return values.includes(selectedValue);
                    });
    
                    card.style.display = isMatch ? '' : 'none';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    
        console.log('Примененные фильтры:', selectedValues);
    });

    // Обработчик для кнопки "Сбросить фильтр"
    document.getElementById('reset-filters').addEventListener('click', function() {
        selectedValues = [];
        document.querySelectorAll('.filter').forEach(function(filterCheckbox) {
            filterCheckbox.checked = false;
        });
        // Опционально: сбросить фильтры и перезагрузить содержимое
        console.log('Фильтры сброшены');
        // location.reload(); // Раскомментируйте для перезагрузки страницы
    });
});