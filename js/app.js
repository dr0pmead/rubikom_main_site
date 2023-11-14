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
        console.log(1)
        animateCounter('#counterFirst', 0, 20, 1500); // Измените значения здесь, если нужно
        animateCounter('#counterSecond', 0, 150, 1500);
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

    const header = selector('header'); // Предполагаем, что ваш header имеет тег <header>

    const toggleHeaderBackground = () => {
      const scrollThreshold = 10; // Пороговое значение скролла для добавления фона
      
      if (window.scrollY > scrollThreshold) {
        header.classList.add('bg-white');
        header.classList.add('h-[5rem]');
        header.classList.remove('h-[7rem]');
        header.classList.remove('text-white');
      } else {
        header.classList.add('h-[7rem]');
        header.classList.remove('bg-white');
        header.classList.remove('h-[5rem]');
        header.classList.add('text-white');
      }
    };

    // Добавляем обработчик события на скролл
    on(window, 'scroll', toggleHeaderBackground);


  })();