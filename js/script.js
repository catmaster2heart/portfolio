
function bindDataToElements(data) {
    Object.keys(data).forEach(key => {
        // Поиск элемента по ID
        const element = document.getElementById(key);
        // Поиск элемента по классу
        const elementsByClass = document.getElementsByClassName(key);

        if (element) {
            updateElementContent(element, data[key]);
        }

        // Обновляем все элементы с указанным классом, избегая конфликта с ID
        if (elementsByClass.length > 0 && !element) {
            Array.from(elementsByClass).forEach(el => {
                updateElementContent(el, data[key]);
            });
        }
    });
}
const skillsContainer = document.getElementById("skills");

// Функция обновления содержимого элемента
function updateElementContent(element, value) {
    if (Array.isArray(value)) {
        element.innerHTML = ''; // Очищаем список
        value.forEach(item => {
            const li = document.createElement('span');
            li.textContent = item;
            element.appendChild(li);
        });
    } else {
        element.textContent = value;
    }
}

// Функция для загрузки JSON файла с переводами
function loadLanguage(lang) {
    const url = `../js/${lang}.json`; // Путь к файлу перевода

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки перевода: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Используем универсальную функцию для обработки данных
            bindDataToElements(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// Переключение языка
function switchLanguage(lang) {
    localStorage.setItem('language', lang); // Сохраняем выбранный язык
    loadLanguage(lang); // Загружаем новый язык
}

// Загрузка языка из localStorage или по умолчанию
function loadLanguageFromStorage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        loadLanguage(savedLang);
    } else {
        loadDefaultLanguage();
    }
}

// Установка языка по умолчанию
function loadDefaultLanguage() {
    const defaultLang = 'ru'; // Язык по умолчанию
    localStorage.setItem('language', defaultLang);
    loadLanguage(defaultLang);
}

// Загружаем язык при загрузке страницы
window.onload = loadLanguageFromStorage;


let slideIndex = 1;
        showSlides(slideIndex);

        function changeSlide(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        function showSlides(n) {
            let slides = document.getElementsByClassName("carousel-slide");
            let dots = document.getElementsByClassName("dot");
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";
            dots[slideIndex-1].className += " active";
        }