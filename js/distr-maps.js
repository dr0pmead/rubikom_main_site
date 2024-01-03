ymaps.ready(init);

function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        center: [51.169392, 71.449074],
        zoom: 5,
        controls: [],
        mode: 'vector'
    }, {
        // Установка темного стиля
        preset: 'islands#dark'
    });

    var style = [
        {
            // Определяем стиль для набора геообъектов.
            elementType: 'geometry',
            stylers: [{color: '#242f3e'}]
        },
        {
            // Определяем стиль для меток.
            elementType: 'labels.text.fill',
            stylers: [{color: '#746855'}]
        },
        // Дополнительные стили можно добавлять сюда
    ];

    // Применение стиля для карты
    myMap.options.set('styles', style);

    // Добавление маркеров для городов
    var cities = [
        {
            coords: [56.009096, 92.872515], 
            name: 'Красноярск', 
            info: '<div style="font-size: 14px; color: #333;">' +
                  '<strong>ООО ТД «АВАНГАРД»</strong><br>' +
                  '<strong>Адрес:</strong> <button data-lat="56.073916" data-lng="92.961070" class="zoom-button">ул. Ястынская, 47Б/9 пом. 47-48</button><br>' +
                  '<strong>Тел:</strong> <a href="tel:+73912855730">+7(391)285-57-30</a><br>' +
                  '<strong>E-mail:</strong> <a href="mailto:avangard-ss2012@mail.ru">avangard-ss2012@mail.ru</a>' +
                  '</div>'
        },
        { coords: [54.868628, 69.140077], name: 'Петропавловск', info: 'Информация о дистрибьюторе в Петропавловске' },
        { coords: [53.212881, 63.628301], name: 'Костанай', info: 'Информация о дистрибьюторе в Костанае' },
        {
            coords: [53.289183, 69.396523], 
            name: 'Кокшетау', 
            info: '<div style="font-size: 14px; color: #333;">' +
                  '<strong>«PROLUD»</strong><br>' +
                  '<strong>Адрес:</strong> <button data-lat="53.281314" data-lng="69.380150" class="zoom-button">ул. Баймуканова 84 а</button><br>' +
                  '<strong>Тел:</strong> <a href="tel:870574300202">870574300202</a><br>' +
                  '<strong>E-mail:</strong> <a href="mailto:ip_prolud@mail.ru">ip_prolud@mail.ru</a>' +
                  '</div>'
        },
        { coords: [52.292981, 76.964623], name: 'Павлодар', info: 'Информация о дистрибьюторе в Павлодаре' },
        { coords: [52.035616, 76.954398], name: 'Аксу', info: 'Информация о дистрибьюторе в Аксу' },
        {
            coords: [51.725140, 75.315908], // Координаты Экибастуза
            name: 'Экибастуз', 
            info: '<div style="font-size: 14px; color: #333;">' +
                  '<strong>ТОО «СБЫТСЕРВИС»</strong><br>' +
                  '<strong>Официальный дилер ТОО «РУБИКОМ»</strong><br>' +
                  '</div>'
        },
        {
            coords: [51.169392, 71.449074], 
            name: 'Астана', 
            info: '<div style="font-size: 14px; color: #333;">' +
                  '<strong>ТОО «ESIL FOOD»</strong><br>' +
                  '<strong>Адрес:</strong> <button data-lat="51.201130" data-lng="71.480654" class="zoom-button"> р-н Сарыарка, шоссе Алаш, здание 27 </button><br>' +
                  '<strong>Тел:</strong> <a href="tel:+77172531595">+7 (7172) 531-595</a>, <a href="tel:+77172531531">531-531</a><br>' +
                  '</div>'
        },
        { 
            coords: [50.411196, 80.227500], 
            name: 'Семей', 
            info: '<div style="font-size: 14px; color: #333;">' +
                  '<strong>ИП Кусаинов</strong><br>' +
                  '<strong>Адрес:</strong> <button data-lat="50.443696" data-lng="80.273714" class="zoom-button">ул. Мичурина 79а</button><br>' +
                  '<strong>Тел:</strong> <a href="tel:87015939999">8 701 593 99 99</a><br>' +
                  '<strong>E-mail:</strong> <a href="mailto:kusainov.k_2019@mail">kusainov.k_2019@mail</a>' +
                  '</div>'
        },
        { 
            coords: [49.802765, 73.087749], 
            name: 'Караганда', 
            info: '<div style="font-size: 14px; color: #333;">' +
                  '<strong>ТОО «DOM COMPANY»</strong><br>' +
                  '<strong>Адрес:</strong> <button data-lat="49.804196" data-lng="73.111995" class="zoom-button">ул. Складская 9/1</button><br>' +
                  '<strong>Тел:</strong> +7(7212) 47-72-69, 51-21-02<br>' +
                  '<strong>E-mail:</strong> <a href="mailto:Domcompany5@mail.ru">Domcompany5@mail.ru</a>' +
                  '</div>'
        },
        {
            coords: [49.957497, 82.605860], 
            name: 'Усть-Каменогорск', 
            info: '<div style="font-size: 14px; color: #333;">' +
                  '<strong>ИП «АЛЕАН»</strong><br>' +
                  '<strong>Адрес:</strong> <button data-lat="49.893748" data-lng="82.637326" class="zoom-button">ул. Самарское шоссе 2</button><br>' +
                  '<strong>Тел:</strong> <a href="tel:+77232575604">+7(7232)57-56-04</a>, <a href="tel:+77232575651">57-56-51</a><br>' +
                  '<strong>E-mail:</strong> <a href="mailto:alean@mail.ru">alean@mail.ru</a>' +
                  '</div>'
        },
        { coords: [47.116388, 51.880000], name: 'Атырау', info: 'Информация о дистрибьюторе в Атырау' },
        { coords: [43.646067, 51.160522], name: 'Актау', info: 'Информация о дистрибьюторе в Актау' },
        {
            coords: [43.238949, 76.889709],
            name: 'Алматы',
            info: '<div style="font-size: 14px; color: #333;">' +
                  '<strong>Адрес:</strong> <button data-lat="43.258387" data-lng="76.893605" class="zoom-button">Алматинский район, пр. Райымбека, сооружение 212/3</button><br>' +
                  '<strong>Тел:</strong> <a href="tel:77786416862">77786416862</a>' +
                  '</div>'
        }
    ];

    cities.forEach(function(city) {
        var placemark = new ymaps.Placemark(city.coords, {
            balloonContent: city.info
        });
        myMap.geoObjects.add(placemark);
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('zoom-button')) {
            var lat = parseFloat(e.target.getAttribute('data-lat'));
            var lng = parseFloat(e.target.getAttribute('data-lng'));
            myMap.setCenter([lat, lng], 17); // 17 - это уровень зума для здания
        }
    });

    window.moveToLocation = function(lat, lng) {
        myMap.setCenter([lat, lng], 10); // Перемещение к новым координатам и увеличение масштаба
    };

    cities.forEach(function(city) {
        var placemark = new ymaps.Placemark(city.coords, {
            balloonContent: city.info,
            iconCaption: city.name
        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6'
        });

        myMap.geoObjects.add(placemark);
    });
}